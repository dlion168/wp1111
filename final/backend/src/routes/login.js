// Router-level middleware
import { Router } from "express";
import User from "../models/User";
import db from '../db';

db.connect();

const router = Router();

router.post('/login', (req, res) => {
    let accountId = req.body.accountId;
    let pwd = req.body.pwd;

    User.findOne({ accountId }, function (err, user) {
        if (user === null) {
            return res.status(400).send({
                message: "User not found."
            });
        }
        else {
            if (user.validPassword(pwd)) {
                return res.status(201).send({
                    message: "User Logged In",
                })
            }
            else {
                return res.status(400).send({
                    message: "Wrong Password"
                });
            }
        }
    });
});

router.post('/signup', (req, res) => {
    let accountId = req.body.accountId;
    let pwd = req.body.pwd;

    // Creating empty user object 
    let newUser = new User({ accountId });
    newUser.setPassword(pwd);

    // Save newUser object to database 
    newUser.save((err, User) => {
        if (err) {
            return res.status(400).send({
                message: "Failed to add user."
            });
        }
        else {
            return res.status(201).send({
                message: "User added successfully."
            });
        }
    });
});

export default router;