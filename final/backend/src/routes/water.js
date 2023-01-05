// Router-level middleware
import { Router } from "express";
import Water from "../models/Water";
import db from '../db';
import { dateToStr, strToDate, dateToAbbreviationStr } from '../util';

db.connect();

const deleteDB = async () => {
    try {
        await Water.deleteMany({});
        return "Database cleared";
    } catch (e) {
        return e;
    }
};

const deleteWater = async (date, time) => {
    try {
        const water = await Water.deleteOne({ date, time });
        return { message: `Deleting`, water };
    } catch (e) {
        return e;
    }
};

const saveWater = async (date, time, capacity) => {
    const dbDate = strToDate(date);
    const oldWater = await Water.findOne({ date: dbDate, time });
    try {
        if (oldWater) {
            oldWater.capacity = capacity;
            oldWater.save();
            return { message: `Updating`, water: oldWater };
        } else {
            const newWater = new Water({ date: dbDate, time, capacity });
            newWater.save();
            return { message: `Adding `, water: newWater };
        }
    } catch (e) { throw new Error("Save scoreCard error: " + e); }
};

const findWater = async (startDate, endDate) => {
    const waterData = await Water.aggregate([
        {
            $match: {
                "date": {
                    $gte: strToDate(startDate),
                    $lte: strToDate(endDate)
                }
            }
        },
        {
            $group: {
                _id: "$date",
                itemList: { $push: { time: "$time", capacity: "$capacity" } }
            }
        },
        {
            $sort: { _id: 1 }
        },
        {
            $addFields:
            {
                totalCapacity: { $sum: "$itemList.capacity" }
            }
        }
    ]);

    let data = [];
    let message = "";
    try {
        if (waterData.length > 0) {
            waterData.map((row) => {
                let item = row;
                item['date'] = dateToStr(row._id);
                data.push(item);
            });
        }
    } catch (e) { message = "Save scoreCard error: " + e; }
    return { data, message };
};

const getWaterSummary = async (startDate, endDate) => {
    const waterData = await Water.aggregate([
        {
            $match: {
                "date": {
                    $gte: strToDate(startDate),
                    $lte: strToDate(endDate)
                }
            }
        },
        {
            $group: {
                _id: "$date",
                itemList: { $push: { capacity: "$capacity" } },
            }
        },
        {
            $addFields:
            {
                totalCapacity: { $sum: "$itemList.capacity" }
            }
        },
        {
            $sort: { _id: 1 }
        },
    ]);

    let date = [];
    let capacity = [];
    let message = "";
    try {
        let curDate = strToDate(startDate);
        let curIdx = 0;

        for (let idx = 0; idx < 7; idx++) {
            if (waterData.length > curIdx && waterData[curIdx]._id.getDate() === curDate.getDate()) {
                date.push(dateToAbbreviationStr(curDate));
                capacity.push(waterData[curIdx].totalCapacity);
                curIdx++;
            }
            else {
                date.push(dateToAbbreviationStr(curDate));
                capacity.push(0);
            }
            curDate.setDate(curDate.getDate() + 1);
        }
    } catch (e) { message = "Get water data error: " + e; }
    return { data: { date, capacity }, message };
};

const router = Router();
router.delete("/", async (req, res) => {
    let date = req.query.date;
    let time = req.query.time;
    let result = await deleteWater(date, time);
    res.status(200).send(result);
});

router.post("/", async (req, res) => {
    let date = req.body.date;
    let time = req.body.time;
    let capacity = req.body.capacity;
    let result = await saveWater(date, time, capacity);
    res.status(200).send(result);
});

router.get("/", async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    let result = await findWater(startDate, endDate);
    res.status(200).send(result);
});

router.get("/summary", async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    let result = await getWaterSummary(startDate, endDate);
    res.status(200).send(result);
});

export default router;