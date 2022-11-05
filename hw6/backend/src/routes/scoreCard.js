import { Router } from "express";
import ScoreCard from "../models/ScoreCard.js";
const router = Router();
router.delete('/cards', async (req, res)=>{
    try{
        await ScoreCard.deleteMany({}).exec()
        return res.send({message:"Database cleared"})
    }
    catch(error){
        console.log(error)
        return res.status(500).send({message:error})
    }
});
router.post('/card',async (req, res)=>{
    const filter = { name: req.body.name, subject: req.body.subject }
    await ScoreCard.findOneAndUpdate(filter, req.body,
        { new: true, upsert: true }).exec()
    .then(
        (ans, err)=>{
            if (err){
                return res.status(500).send({message: err, card: false});
            }
            if (!ans) {
                return res.send({message:`Adding (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card:req.body})
            }
            else{
                return res.send({message:`Updating (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card:ans})
            }
        })
    }
);
router.get('/cards',async (req, res)=>{
    try{
        await ScoreCard.find(
            JSON.parse(`{ "${req.query.type}" : { "$regex": "${req.query.queryString}", "$options": "i" } }`)).exec()
        .then((docs, err) => { 
            if (!docs) {
                return res.send({messages:'', message:`${req.query.type} (${req.query.queryString}) not found!`})
            }
            else {
                return res.send({messages:docs.map((m)=>`Found card with ${req.query.type} : (${m.name}, ${m.subject}, ${m.score})`),
                            message:err});}
        } 
    )}
    catch(error){
        console.log(error)
        return res.status(500).send({messages:'', message:error})
    }
});
export default router;