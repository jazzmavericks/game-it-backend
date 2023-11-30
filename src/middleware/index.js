const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken")

const saltRounds = 10;


async function hashPassword(req,res,next) {
    try {
        if (!req.body.password) {
            res.status(500).json({message:"Password missing"})
            return;
        }
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        next();
    } catch (error) {
        res.status(500).json({errormessage: error.message})
        console.log(error)
    }
}

async function comparePassword(req, res,next) {
    try {
        const user = await User.findOne({
            where: {email:req.body.email}
        })
        if (!user) {
            res.status(500).json({message: "Username or password incorrect"});
            return;
        }
        const response = await bcrypt.compare(req.body.password, user.password)

        if (!response) {
            res.status(500).json({message: "Username or password incorrect"});
            return;
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(500).json({errormessage: error.message})
        console.log(error)
    }
}

async function tokenCheck(req,res,next) {
    try {
        const secretKey = process.env.JWTPASSWORD;
        const token = req.header("Authorization").replace("Bearer ", "");
        const decodedToken = jwt.verify(token,secretKey);
        console.log(decodedToken);
        const userEmail = decodedToken.email;
        const findResponse = await User.findOne({
            where: {
                email: userEmail
            }
        })
        if(!findResponse) {
            throw new Error("User no longer in the database")
        } else {
            req.body.email = userEmail
            next();
        }
    } catch (error) {
        res.status(500).json({errormessage: error.message})
        console.log(error)
    }
}

module.exports = {hashPassword, comparePassword, tokenCheck};