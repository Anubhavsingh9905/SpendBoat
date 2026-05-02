const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require("cors");
const {protect} = require("./Middlewares/authMiddlewares");
const User = require('./Models/user');
const Expense = require('./Models/expense');
const {groqParse, fallback} = require('./messageParser');
const userRouter = require("./Routes/user");
const expenseRouter = require("./Routes/expense");
const whatsappRouter = require("./Routes/whatsapp");

require('dotenv').config()


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/spendwise');
}

main().then(() => {
    console.log("DB connected");
}).catch((error) => {
    console.log(error);
})


// app.get("/", (req, res) => {
//     res.send("hello everyone");
// })

//-------------------------------------------------authentication--------------------------------------
app.use("/", userRouter);
// ----------------------------------------------- Expense ---------------------------------------------
app.use("/expense", expenseRouter);
// ------------------------------------------------ Whatsapp ------------------------------------------
app.use("/whatsapp", whatsappRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`app is listening on port: ${port}`)
});