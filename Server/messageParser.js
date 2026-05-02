const axios = require('axios');
const chrono = require('chrono-node');
require('dotenv').config();


const fallback = async (message) => {
    try {
        const res = await axios.post(
            process.env.MODEL_API,
            { message },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        console.log(res);

        //extract amount valur from message
        const regex = /\d+(?:\.\d+)?/g;
        const strAmount = message.match(regex);

        // convert the Str-amount value int number
        const amount = Number(strAmount[0]);

        // extracting date using chrono library, if exist
        const results = chrono.parse(message);
        let date = "unknown";
        if (results.length > 0) {
            date = results[0].start.date();
        }

        // remmove amount from the message to make it short
        const note = message.replace(regex, "").replace(results, "");

        const data = {
            category: res.data.category,
            note: note,
            amount: amount,
            date: date
        }

        return data;
    }
    catch (error) {
        console.log("ML fallbck error", error);
        return null;
    }
}

const groqParse = async (message) => {
    try {
        const prompt = `
            You are an intelligent financial assistant. Your task is to extract structured expense information from a user's natural language message.

            🔹 Rules:
            - "category" should be a **general category** such as: "Food", "Transport", "Health", "Shopping", "Groceries", "Rent", "Entertainment", "Bills", "Utilities", "Travel", or "Others". **Do not use brand/vendor names** like "Uber", "Zomato", or "Amazon" as categories.
            - If a date is not mentioned, set it to **"unknown"**.
            - Keep the "note" short and meaningful. Do **not** repeat the category or amount in it.

            📌 Output must be in this **strict JSON format**:
            {
            "amount": number,
            "category": "string",
            "date": "ISO 8601 format or 'unknown'",
            "note": "string"
            }

            📥 Message: 
            "${message}"

            Respond only with the JSON. Do not include any explanation or extra text.
        `;

        // console.log(process.env.GROQ_API_KEY);
        const res = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "openai/gpt-oss-120b",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.3,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const jsonString = res.data.choices[0].message.content.trim();
        const parsed = JSON.parse(jsonString);


        return parsed;

    } catch (err) {

        console.error("Groq parsing failed:", err.message);
        if (err.response) {
            console.error("Groq error response:", err.response.data);
        }

        //fall back on model
        return await fallback(message);
    }
};

module.exports = { groqParse, fallback };