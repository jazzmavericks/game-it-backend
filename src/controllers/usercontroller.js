const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

//LOGIN - WORKING
async function login(req, res) {
    const expirationTime = 1000*60*60*24*7
    const privateKey = process.env.JWTPASSWORD
    const payload = {
        email : req.body.email
    };
    
    const options = {
        expiresIn : expirationTime
    };
    const token = await jwt.sign(payload, privateKey, options);
    console.log(token);
    try {
        res.status(201).json({
            message : "user logged in",
            user : req.body.email,
            token: token
        })
    } catch (error) {
        res.status(500).json({
            message : "unable to login user", 
            errorMessage: error
        })
        console.log(error);
    }
}

//REGISTER - WORKING
async function register(req,res) {
    try {
        const userResponse = await User.create(req.body);
        const expirationTime = 1000*60*60*24*7;
        const privateKey = process.env.JWTPASSWORD;
        const payload = {
            email:req.body.email
        }
        const options = {
            expiresIn: expirationTime
        }
        const token = await jwt.sign(payload, privateKey, options)
        console.log(token);
        res.status(201).json({
            message: "User successfully added", 
            details: userResponse, 
            token: token
        })
    } catch (error) {
        res.status(500).json({
            message: "Unable to register user", 
            errorMessage:error.message})
        console.log(error);
    }
};

// DISPLAY USERNAME - WORKING
async function displayUsername(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email parameter is missing" });
        }

        console.log("Searching for user with email:", email);

        const showuser = await User.findOne({
            where: { email },
        });

        if (!showuser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(showuser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Unable to display username", 
            errorMessage: error.message 
        });
    }
}

// CHANGE USERNAME - WORKING
async function changeUsername(req, res) {
    try {
        const updateUsername = await User.update(
            { email: req.body.newUsername },
            { where: { email: req.body.email } }
        );
        console.log(updateUsername)

        res.status(201).json({
            message: "username updated",
        });
    } catch (error) {
        res.status(501).json({ 
            message: "Unable to change username",
            errorMessage: error.message
        });
    }
}


// CHANGE PASSWORD - WORKING
async function changePassword(req, res) {
    try {
        const findUser = req.body.email;
        const user = await User.findOne({
            where: { email: findUser }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the provided password matches the user's current password
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Hash and update the new password
        const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);
        await User.update(
            { password: hashedNewPassword },
            { where: { email: findUser } }
        );

        res.status(200).json({
            message: 'Password updated successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Unable to change password',
            errorMessage: error.message,
        });
    }
}

// DELETE ACCOUNT - working
async function deleteAccount(req, res) {
    try {
        const del = await User.destroy({ 
            where: { email: req.body.email }
        });

        res.status(200).json({
            message: "user deleted",
            user: del
        });
    } catch (error) {
        res.status(501).json({ 
            message: error.message, 
            error: error
        })
    }
}


//LIST ALL USERS
async function listAllUsers(req,res) {
    try {
        const users = await User.findAll();
        res.status(201).json({
            message: "List of users:", 
            details: users
        })
    } catch (error) {
        res.status(500).json({
            message: "Unable to list users", 
            errorMessage:error.message})
        console.log(error);
    }
};

module.exports = { 
    login, 
    register, 
    listAllUsers, 
    displayUsername, 
    changeUsername, 
    changePassword, 
    deleteAccount 
};