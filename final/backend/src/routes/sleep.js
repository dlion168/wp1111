// Router-level middleware
import { Router } from "express";
import Sleep from "../models/Sleep";
import db from '../db';
import { dateToStr, strToDate, dateToAbbreviationStr } from '../util';

db.connect();

const deleteDB = async () => {
    try {
        await Sleep.deleteMany({});
        return "Database cleared";
    } catch (e) {
        return e;
    }
};

const deleteSleep = async (date, time) => {
    try {
        const water = await Sleep.deleteOne({ date, time });
        return { message: `Deleting`, water };
    } catch (e) {
        return e;
    }
};

const saveSleep = async (date, hours) => {
    const dbDate = strToDate(date);
    const oldSleep = await Sleep.findOne({ date: dbDate });
    try {
        if (oldSleep) {
            oldSleep.hours = hours;
            oldSleep.save();
            return { message: `Updating`, sleep: oldSleep };
        } else {
            const newSleep = new Sleep({ date: dbDate, hours });
            newSleep.save();
            return { message: `Adding `, sleep: newSleep };
        }
    } catch (e) { throw new Error("Save Sleep error: " + e); }
};

const findSleep = async (startDate, endDate) => {
    const sleepData = await Sleep.find({
        date: {
            $gte: strToDate(startDate),
            $lte: strToDate(endDate)
        }
    }).sort({ date: 1 });

    let data = [];
    let message = "";
    try {
        if (sleepData.length > 0) {
            sleepData.map((row) => {
                let item = {
                    date: dateToStr(row.date),
                    hours: row.hours
                }
                data.push(item);
            });
        }
    } catch (e) { message = "Find Sleep Data error: " + e; }
    return { data, message };
};

const getSleepSummary = async (startDate, endDate) => {
    const sleepData = await Sleep.find({
        date: {
            $gte: strToDate(startDate),
            $lte: strToDate(endDate)
        }
    }).sort({ date: 1 });

    let date = [];
    let hours = [];
    let message = "";
    try {
        let curDate = strToDate(startDate);
        let curIdx = 0;

        for (let idx = 0; idx < 7; idx++) {
            if (sleepData.length > curIdx && sleepData[curIdx].date.getDate() === curDate.getDate()) {
                date.push(dateToAbbreviationStr(curDate));
                hours.push(sleepData[curIdx].hours);
                curIdx++;
            }
            else {
                date.push(dateToAbbreviationStr(curDate));
                hours.push(0);
            }
            curDate.setDate(curDate.getDate() + 1);
        }
    } catch (e) { message = "Get water data error: " + e; }
    return { data: { date, hours }, message };
};

const router = Router();
router.delete("/", async (req, res) => {
    let date = req.query.date;
    let time = req.query.time;
    let result = await deleteSleep(date, time);
    res.status(200).send(result);
});

router.post("/", async (req, res) => {
    let date = req.body.date;
    let hours = req.body.hours;
    let result = await saveSleep(date, hours);
    res.status(200).send(result);
});

router.get("/", async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    let result = await findSleep(startDate, endDate);
    res.status(200).send(result);
});

router.get("/summary", async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    let result = await getSleepSummary(startDate, endDate);
    res.status(200).send(result);
});

export default router;