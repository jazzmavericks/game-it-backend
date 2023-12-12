const {Router} = require ("express");
const gamesRouter = Router();
const { 
    addGameToUser, 
    statusPlaying, 
    statusOwned, 
    statusWant, 
    statusCompleted, 
    gameStatus, 
    showPlaying,
    showOwned,
    showWant,
    showCompleted,
    deleteGame
    } = require("../controllers/gamescontroller.js");

//ADD GAME TO USER
gamesRouter.post("/addGameToUser", addGameToUser);
//UPDATE STATUS TO PLAYING
gamesRouter.put("/statusPlaying", statusPlaying);
//UPDATE STATUS TO OWNED
gamesRouter.put("/statusOwned", statusOwned);
//UPDATE STATUS TO WANT
gamesRouter.put("/statusWant", statusWant);
//UPDATE STATUS TO COMPLETED
gamesRouter.put("/statusCompleted", statusCompleted);

//GET GAME STATUS - ALL
gamesRouter.get("/gameStatus", gameStatus);
//SHOW GAME STATUS - PLAYING
gamesRouter.get("/showPlaying", showPlaying);
//SHOW GAME STATUS - OWNED
gamesRouter.get("/showOwned", showOwned);
//SHOW GAME STATUS - WANT
gamesRouter.get("/showWant", showWant);
//SHOW GAME STATUS - COMPLETED
gamesRouter.get("/showCompleted", showCompleted);

//DELETE GAME
gamesRouter.delete("/deleteGame", deleteGame);

module.exports = gamesRouter;