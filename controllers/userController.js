const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Register a user
//@route GET /api/users/register
//@access public 
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password ) {
        console.log(username);
        console.log(email);
        console.log(password);
        res.status(400);
        throw new Error("All fiels are mandatory");
    } 
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username, email, password: hashedPassword, points: 10
    });
    console.log(`User created : ${user}`);
    if (user) {
        res.status(201);
    } else {
        res.status(400);
        throw new Error("User data not valid")
    }
    res.redirect(`/`);
});

//@desc Login user
//@route POST /api/users/login
//@access public 
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password ) {
        res.status(400);
        throw new Error("All fiels are mandatory");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
                const accessToken = jwt.sign({
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user.id,
                    }
                }, process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "20m"}
                // Après avoir récupéré le token de l'API
                
                
            )
        res.status(200).json({accessToken});
    } else {
        res.status(401)
        throw new Error("email or password is not valid")
    }
});

//@desc Current user info
//@route GET /api/users/current
//@access private 
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser }