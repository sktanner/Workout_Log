require("dotenv").config()
const express = require("express")
const app = express()
const dbConnection = require("./db")
const cors = require('cors')

const controllers = require("./controllers")

app.use(require('./middleware/headers'))
app.use(cors())

app.use(express.json())

app.use("/user", controllers.userController)

app.use(require("./middleware/validate-jwt"))
app.use("/log", controllers.workoutController)

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3000, () => {
            console.log(`[Server]: App is listening on 3000.`);
        })
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error =${err}`);
    })