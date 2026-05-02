const User = require('../Models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    const token = jwt.sign(
        { id }, 
        process.env.JWT_SECRET, 
        {expiresIn: '7d'}
    )

    return token;
}

module.exports.Register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        console.log(name, email, phone);

        // if user exist then no register --> login
        const userExist = await User.findOne({ emailId: email });
        if (userExist) return res.status(400).json("User already exist");

        // protect password by hashing by salting and hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // save users credentials
        const user = await User.create({ name: name, emailId: email, phone: phone, password: hashedPassword });

        // generate token for further verification of user
        const token = generateToken(user._id);

        res.status(200).json({ user: user, token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json("something went wrong");
    }
};

module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(email);

        // if user not exist then no login --> register
        const user = await User.findOne({ emailId: email });
        if (!user) return res.status(400).json("User not exist");

        // matching password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = generateToken(user._id);
            console.log("token");
            console.log("sucessfully login");
            res.status(200).json({ user: user, token: token });
        } else {
            res.status(400).json("Wrong Credentials");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("something went wrong");
    }
};

module.exports.GetUsersCredentials = async(req, res) => {
    try {
        // console.log(req.user._id);
        const user = await User.findById(req.user._id);

        res.status(200).json({user: user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "User not found."});
    }
};

module.exports.ModifyUsersCredentials = async(req, res) => {
    try {
        const {name, email, number} = req.body
        const userId = req.user._id;

        // if user modified name
        if(name.length){
            await User.findByIdAndUpdate(userId, {name: name});
        }

        // if user modified email
        if(email.length){
            await User.findByIdAndUpdate(userId, {emailId: email});
        }

        // if user modified phone-number
        if(number.length){
            await User.findByIdAndUpdate(userId, {phone: number});
        }

        res.status(200).json({message: "user data modified successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Not valid user"});
    }
};