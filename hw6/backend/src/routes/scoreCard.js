import { Router } from "express";
import ScoreCard from "../models/ScoreCard.js";
const router = Router();
router.delete('/cards', async (res)=>{
    try{
        await ScoreCard.deleteMany({}) 
        res.send({message:"Database cleared"})
    }
    catch(error){
        res.status(500).send({message:error})
    }
});
router.post('/card',async (req, res)=>{
    try{
        await ScoreCard.findOneAndUpdate({ name: req.name, subject: req.subject }, 
            { name: req.name, subject: req.subject, score: req.score}, 
            { new: true, upsert: true },
            (_, ans)=>{
                if (!ans) {
                    res.send({message:`Adding (${req.name}, ${req.subject}, ${req.score})`, card:{ name: req.name, subject: req.subject, score: req.score}})
                }
                else{
                    res.send({message:`Updating (${req.name}, ${req.subject}, ${req.score})`, card:ans})
                }
            });
        }
    catch (error){
        res.status(500).send({message: error,card: false});
        }
    }
);
router.get('/cards',async (req, res)=>{
    try{
        await ScoreCard.find(
            JSON.parse(`{ ${req.type} : { "$regex": ${req.queryString}, "$options": "i" } }`),
        (_,docs) => { 
            if (!docs) {res.send(`${req.type} (${req.querystring}) not found!`)}
            else {res.send({messages:docs.map((m)=>`Found card with ${req.type}: (${m.name}, ${m.subject}, ${m.score})`),
                            message:err});}
        } 
    )}
    catch(error){
        res.status(500).send({messages:'', message:error})
    }
});
export default router;