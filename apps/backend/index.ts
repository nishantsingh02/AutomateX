
import express from "express"
import jwt from "jsonwebtoken"
import {UserModel} from "db/client"
import mongoose from "mongoose"
mongoose.connect(process.env.MONGO_URL!)
import bcrypt from "bcrypt"
import { userSignUpSchema, userSignIpSchema } from "common/types"

const app = express()
app.use(express.json());

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

app.post("/signin", async (req, res) => {
    try {
        const parseData = userSignIpSchema.safeParse(req.body)
        
        if(!parseData.success) {
            return res.status(401).json({
                message: "Invalid Input",
                error: parseData.error.flatten()
            })
        }

        const { email, password } = parseData.data

        const user = await UserModel.findOne({
            email: email
        })

        if(!user) {
            return res.status(402).json({
                message: "user not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(401).json({
                message: "incorrect Credentials"
            })
        }

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECERTE as string,
            {
               expiresIn: "7d"
            }
        );

        return res.status(200).json({
            message: "Login successful",
            token
        })

    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            errors: err instanceof Error ? err.message : "Unknown error"
        })
    }
})

app.put("/workflow", (req, res) => {

})

app.get("/workflow/:workflowId", (req, res) => {

})

app.post("/workflow/execution/:workflowId", (req, res) => {

})

app.get("/nodes", (req, res) => {

})

app.listen(process.env.PORT || 3000)