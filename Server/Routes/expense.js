const { SetLimit, AddExpenses, ParseExpense, GetCurrentMonthExpnese, GetPrevNextMonthExpnese } = require("../Controller/expense");
const {protect} = require("../Middlewares/authMiddlewares");
const Router = require("router");

const router = Router();

//set limit
router.post("/setLimit", protect, SetLimit);


router.post("/addexpenses", protect, AddExpenses)

router.post("/parseexpense", protect, ParseExpense)

router.get("/myexpenses", protect, GetCurrentMonthExpnese);

router.get("/monthlyExpense", protect, GetPrevNextMonthExpnese);

module.exports = router