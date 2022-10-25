import express from 'express'
import {getNumber, genNumber} from '../core/genNumber'
const router = express.Router()
router.post('/start', (_, res) => {
    genNumber() // ⽤亂數產⽣⼀個猜數字的 number，存在 memory DB
    res.json({ msg: 'The game has started.' })
})
router.get('/guess', (req, res) => {
// 去 (memory) DB 拿答案的數字
// ⽤ req.query.number 拿到前端輸入的數字
// check if NOT a num or not in range [1,100]
// 如果有問題 =>
    let number = getNumber()
    if (isNaN(+req.query.number) || (!isNaN(+req.query.number) && (Number(req.query.number)>100 || Number(req.query.number)<1))){
        res.status(406).send({ msg: 'Not a legal number.' })
    }
    else{
        let guess = Number(req.query.number)
        if (guess < number){
            res.status(200).send({ msg: `Bigger than ${guess}` })
        }
        else if (guess > number){
            res.status(200).send({ msg: `Smaller than ${guess}` })
        }
        else{
            res.status(200).send({ msg: `Equal to ${guess}` })
        }
    }
})
// 
// 如果沒有問題，回傳 status
router.put('/restart', (_, res) => { 
    genNumber() // ⽤亂數產⽣⼀個猜數字的 number，存在 memory DB
    res.json({ msg: 'The game has restarted.' })
})
export default router