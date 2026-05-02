const Router = require("router");
const {protect} = require("../Middlewares/authMiddlewares");
const { Register, Login, GetUsersCredentials, ModifyUsersCredentials } = require("../Controller/user");

const router = Router();

//register
router.post("/register", Register);

//login
router.post("/login", Login);

//get user credentials
router.get("/user", protect, GetUsersCredentials);

// modify user credentials
router.post("/user", protect, ModifyUsersCredentials);

module.exports = router;