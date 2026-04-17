
import express from "express"
import mongoose from "mongoose"
import json from "jsonwebtoken"
const Secreat="nishuinlove"
import {UserModel} from "db/client"
import { Mongoose } from "mongoose"

const app = express()

app.post("./signup", (req, res) => {
    const email = req.body.username;
    const password = req.body.password;

    UserModel.create({
    email:email,
        password: password
    }) 
})

app.post("./signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
})

app.put("./workflow", (req, res) => {

})

app.get("./workflow/:workflowId", (req, res) => {

})

app.post("./workflow/execution/:workflowId", (req, res) => {

})

app.post("./credentials", (req, res) => {

})

app.listen(process.env.PORT || 3000)