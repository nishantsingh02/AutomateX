
import express from "express"

import json from "jsonwebtoken"
const jsonSecreat="nishuinlove"

const app = express()

app.post("./signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // check the username is not already excist in the db

    // hash the password

    // create an entity in the db 
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