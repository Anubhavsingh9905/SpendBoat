const User = require('../Models/user');
const Expense = require('../Models/expense');
const {groqParse, fallback} = require('../messageParser');

// set the budget of user
module.exports.SetLimit = async(req, res) => {
    try{
        const {budget} = req.body; 
        // console.log(req.user, budget);

        // find and update the budget .... default budget = 0
        await User.findByIdAndUpdate(req.user._id, {budget: budget});

        res.status(200).json({message: "limit set successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "something went wrong"});
    }
};

// parse expense using groq and ml fall back
module.exports.ParseExpense =  async(req, res) => {
    const {message} = req.body;
    try{
        const parsed = await groqParse(message);
        console.log("message hit");
        if(parsed){
            res.status(200).json(parsed);
        }
        else res.status(500).json({message: "Parsing failed"});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Parsing failed"});
    }
}

// Add expenses after parsing
module.exports.AddExpenses = async(req, res) => {
    const {category, amount, date, note} = req.body;
    const owner = req.user._id;

    const dateUse = date == "unknown" ? new Date(): date
    console.log(dateUse);

    const expense = await Expense.create({
        owner: owner,
        note,
        category,
        amount,
        date: dateUse
    });

    res.status(200).json(expense);
};

// send current month expense to the client for dashboard
module.exports.GetCurrentMonthExpnese = async(req, res)=> {
    try{
        const {month, year} = req.query;
        const owner = req.user._id;
        
        // for fetching current months expenses
        const start = new Date(year, month, 1);
        const end = new Date(year, Number(month)+1, 1);
        // console.log(start, end);

        // sort the date in inc order
        const expenses = await Expense.find({
            owner: owner, 
            date:{
                $gte: start,
                $lt: end
            }
        })
        .sort({ date: -1 });
        
        res.status(200).json(expenses);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "unable to fetch."});
    }
}

// send current or prev or next month expense ssummary to the client for dashboard
module.exports.GetPrevNextMonthExpnese = async(req, res) => {
    try {
        const {month, year} = req.query;
        const owner = req.user._id;
        
        const start = new Date(year, month, 1);
        const end = new Date(year, Number(month)+1, 1);
        // console.log(start, end);
        const expenses = await Expense.find({
            owner: owner, 
            date:{
                $gte: start,
                $lt: end
            }
        });

        // ---total expense---
        const total = expenses.reduce((sum, expenses) => sum + expenses.amount, 0);

        // ---top category---
        const topCategory = {name: "", amount: 0};
        const map = {};

        expenses.forEach((exp) => {
            map[exp.category] = (map[exp.category] || 0) + exp.amount;
        });

        let max = 0;
        let category = "";

        for (let key in map) {
            if (map[key] > max) {
                max = map[key];
                category = key;
            }
        }

        topCategory.name = category,  topCategory.amount = max ;

        // ---Daily average---
        const daysInmonth = new Date(year, Number(month)+1, 0).getDate();
        const dailyAverage = (total/daysInmonth).toFixed(2);

        res.status(200).json({
            total,
            topCategory,
            dailyAverage
        })
    } catch (error) {
        console.log("monthly expense error: " ,error);
        res.status(500).json({message: "unable to fetch."});
    }
}