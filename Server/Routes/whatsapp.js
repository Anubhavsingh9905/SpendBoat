const express = require("express");
const Router = require("router");
const User = require("../Models/user");
const Expense = require('../Models/expense');
const { groqParse, fallback } = require('../messageParser');


const router = Router();

router.post("/webhook", async (req, res) => {
    const message = req.body.Body;
    const from = req.body.From;// whatsapp:+91XXXXXXX

    const phoneNumber = from.replace("whatsapp:", "").slice(3);
    console.log(phoneNumber, message);

    try {
        const user = await User.findOne({ phone: phoneNumber })
        if (!user) {
            return res.set('Content-Type', 'text/xml').send(`
            <Response>
                <Message>❌ This whatsapp number is not registerd. Register it using web app.</Message> 
            </Response>    
        `)
        }
        // console.log(user._id);

        // parse the message
        const parsed = await groqParse(message);
        if (!parsed || !parsed.amount || !parsed.category) {
            return res.set('Content-Type', 'text/xml').send(`
            <Response>
                <Message>❌ Donot understand the message. Try something like this: "spend 200 on milk"</Message> 
            </Response>
        `)
        }

        // Date fallback
        let parsedDate = parsed.date;
        if (!parsedDate || parsedDate === 'unknown' || isNaN(new Date(parsedDate))) {
            parsedDate = new Date(); // fallback to current time
        }
        
        // save parsed expense into database
        await Expense.create({
            owner: user._id,
            note: parsed.note,
            category: parsed.category,
            amount: parsed.amount,
            date: parsedDate
        });

        res.set('Content-Type', 'text/xml');
        return res.send(`
            <Response>
                <Message>✅ ₹${parsed.amount} for ${parsed.category} recorded!</Message>
            </Response>
        `);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("intrenal server error");
    }
});

module.exports = router