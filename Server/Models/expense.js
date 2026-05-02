const moongose = require("mongoose");

const expenseSchema = new moongose.Schema({
    owner:{
        type:moongose.Schema.Types.ObjectId,
        ref:"User"
    },
    note:{
        type:String,
        default:"",
        trim: true,
        maxlength:100
    },
    category:{
        type:String,
        required: true,
        lowercase: true,
        trim: true,
    },
    amount:{
        type:Number,
        required:true,
        min:0
    },
    date:{
        type:Date,
        required:true,
        index:true
    }
}, {timestamps: true});

module.exports = moongose.model("Expenses", expenseSchema);