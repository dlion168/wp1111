// Router-level middleware
import { Router } from "express";
import Symptom from "../models/Symptom";
import db from '../db';
import { dateToStr, strToDate } from '../util';

db.connect();

const deleteDB = async () => {
    try {
        await Symptom.deleteMany({});
        return "Database cleared";
    } catch (e) {
        return e;
    }
};

const deleteSymptom = async (date, time) => {
    try {
        const symptom = await Symptom.deleteOne({ date, time });
        return { message: `Deleting`, symptom: symptom };
    } catch (e) {
        return e;
    }
};

const saveSymptom = async (date, time, symptomName) => {
    const dbDate = strToDate(date);
    const oldSymptom = await Symptom.findOne({ date: dbDate, time });
    try {
        if (oldSymptom) {
            oldSymptom.symptomName = symptomName;
            oldSymptom.save();
            return { message: `Updating`, symptom: oldSymptom };
        } else {
            const newSymptom = new Symptom({ date: dbDate, time, symptomName });
            newSymptom.save();
            return { message: `Adding `, symptom: newSymptom };
        }
    } catch (e) { throw new Error("Save scoreCard error: " + e); }
};

const findSymptom = async (startDate, endDate) => {
    const symptomData = await Symptom.aggregate([
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
                itemList: { $push: { time: "$time", symptomName: "$symptomName" } },
            }
        },
        {
            $sort: { _id: 1 }
        },
    ]);

    let data = [];
    let message = "";
    try {
        if (symptomData.length > 0) {
            symptomData.map((row) => {
                let item = row;
                item['date'] = dateToStr(row._id);
                data.push(item);
            });
        }
    } catch (e) { message = "Save symptomData error: " + e; }
    return { data, message };
};

const getSymptomSummary = async (startDate, endDate) => {
    const symptomList = await Symptom.find({
        "date": {
            $gte: strToDate(startDate),
            $lte: strToDate(endDate)
        }
    });

    let summary = {};
    symptomList.map((obj) => {
        const syms = obj.symptomName.split(',');
        syms.forEach(element => {
            if (element != "") {
                if (summary[element])
                    summary[element] += 1;
                else
                    summary[element] = 1;
            }
        });
    });

    let message = "";
    return { summary, message };
};

const router = Router();
router.delete("/", async (req, res) => {
    let date = req.query.date;
    let time = req.query.time;
    console.log(date, time)
    let result = await deleteSymptom(date, time);
    res.status(200).send(result);
});

router.post("/", async (req, res) => {
    let date = req.body.date;
    let time = req.body.time;
    let symptomName = req.body.symptomName;

    let result = await saveSymptom(date, time, symptomName);
    res.status(200).send(result);
});

router.get("/", async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    console.log(startDate, endDate);
    let result = await findSymptom(startDate, endDate);
    res.status(200).send(result);
});

router.get("/summary", async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    console.log(startDate, endDate);
    let result = await getSymptomSummary(startDate, endDate);
    res.status(200).send(result);
});

export default router;