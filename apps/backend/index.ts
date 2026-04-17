
import express from "express"
import json from "jsonwebtoken"
const Secreat="nishuinlove"
import {UserModel} from "db/client"
import mongoose from "mongoose"
mongoose.connect(process.env.MONGO_URL!)
import bcrypt from "bcrypt"
import { z } from "zod"

import { userSignUpSchema } from "common/types"

const app = express()

app.post("/signup", async (req, res) => {
    try {
        const parseData = userSignUpSchema.safeParse(req.body);

        if(!parseData.success) {
            return res.status(400).json({
                message: "Invalid Input",
                errors: parseData.error.flatten(),
            })
        }
    
        const { email, password } = parseData.data

    const existingUser = await UserModel.findOne({
        email
    })

    if(existingUser) {
        return res.status(400).json({
            message: "User already Exists"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await UserModel.create({
    email:email,
    password: hashPassword 
    }) 

    res.status(201).json({
      message: "User created successfully",
      userId: user._id,
    });
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            errors: err instanceof Error ? err.message : "Unknown error"
        })
    }
})

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
})

app.put("/workflow", (req, res) => {

})

app.get("/workflow/:workflowId", (req, res) => {

})

app.post("/workflow/execution/:workflowId", (req, res) => {

})

app.post("/credentials", (req, res) => {

})

app.listen(process.env.PORT || 3000)