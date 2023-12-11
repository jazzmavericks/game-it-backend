const {Router} = require ("express");
const gamesRouter = Router();
const { addGameToUser, statusPlaying, statusOwned, statusWant, statusCompleted, gameStatus, deleteGame} = require("../controllers/gamescontroller.js");

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

//GET GAME STATUS
gamesRouter.get("/gameStatus", gameStatus);

//DELETE GAME
gamesRouter.delete("/deleteGame", deleteGame);

module.exports = gamesRouter;