const {Router} = require ("express");
const userRouter = Router();

const {hashPassword, comparePassword, tokenCheck} = require("../middleware/index.js");
const {register, login, listAllUsers, deleteAccount, changePassword, changeUsername, displayUsername} = require("../controllers/usercontroller.js");

//LOGIN AND REGISTER
userRouter.post("/register", hashPassword, register);
userRouter.post("/loginUser", comparePassword, login);

//DISPLAY USERNAME
userRouter.get('/displayUsername', displayUsername);

//CHANGE USERNAME
userRouter.put("/chUsername", changeUsername);

//CHANGE PASSWORD
userRouter.put("/chPassword", changePassword);

//DELETE ACCOUNT
userRouter.delete("/deleteAccount", deleteAccount);

//LIST USERS
userRouter.get("/listAllUsers", tokenCheck, listAllUsers);

module.exports = userRouter;