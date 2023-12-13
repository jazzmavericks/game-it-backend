const Games = require("../models/games");
const User = require("../models/user");

//ADD GAME TO USER
async function addGameToUser(req, res) {
    try {
        const addUser = req.body.email;
        const addGame = req.body.gameID;

        await Games.create({
            gameID: addGame,
            userID: addUser
        })

        res.status(200).json({
            message: 'game added to user successfully',
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Unable to add game to user',
            errorMessage: error.message,
        });
    }
}

//UPDATE STATUS TO PLAYING
async function statusPlaying(req, res) {
    try {
        const findUser = req.body.email;
        const findGame = req.body.gameID;

        const game = await Games.findOne({
            where: { userID: findUser, gameID: findGame }
        });
        console.log(game);
        if (!game) {
            return res.status(404).json({ message: 'game not found' });
        }

        if (game.playing) {
            await game.update(
                { playing : false },
                { where: { email: findUser, gameID: findGame } }
            );
        } else {
            await game.update(
                { playing : true },
                { where: { email: findUser, gameID: findGame } }
            );
        }

        res.status(200).json({
            message: 'Status updated successfully',
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Unable to change status',
            errorMessage: error.message,
        });
    }
}

//UPDATE STATUS TO OWNED
async function statusOwned(req, res) {
    try {
        const findUser = req.body.email;
        const findGame = req.body.gameID;

        const game = await Games.findOne({
            where: { userID: findUser, gameID: findGame }
        });
        console.log(game);
        if (!game) {
            return res.status(404).json({ message: 'game not found' });
        }

        if (game.owned) {
            await game.update(
                { owned : false },
                { where: { email: findUser, gameID: findGame } }
            );
        } else {
            await game.update(
                { owned : true },
                { where: { email: findUser, gameID: findGame } }
            );
        }

        res.status(200).json({
            message: 'Status updated successfully',
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Unable to change status',
            errorMessage: error.message,
        });
    }
}

//UPDATE STATUS TO WANT
async function statusWant(req, res) {
    try {
        const findUser = req.body.email;
        const findGame = req.body.gameID;

        const game = await Games.findOne({
            where: { userID: findUser, gameID: findGame }
        });
        console.log(game);
        if (!game) {
            return res.status(404).json({ message: 'game not found' });
        }

        if (game.want) {
            await game.update(
                { want : false },
                { where: { email: findUser, gameID: findGame } }
            );
        } else {
            await game.update(
                { want : true },
                { where: { email: findUser, gameID: findGame } }
            );
        }

        res.status(200).json({
            message: 'Status updated successfully',
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Unable to change status',
            errorMessage: error.message,
        });
    }
}

//UPDATE STATUS TO COMPLETED
async function statusCompleted(req, res) {
    try {
        const findUser = req.body.email;
        const findGame = req.body.gameID;

        const game = await Games.findOne({
            where: { userID: findUser, gameID: findGame }
        });
        console.log(game);
        if (!game) {
            return res.status(404).json({ message: 'game not found' });
        }

        if (game.completed) {
            await game.update(
                { completed : false },
                { where: { email: findUser, gameID: findGame } }
            );
        } else {
            await game.update(
                { completed : true },
                { where: { email: findUser, gameID: findGame } }
            );
        }

        res.status(200).json({
            message: 'Status updated successfully',
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Unable to change status',
            errorMessage: error.message,
        });
    }
}

//GET GAME STATUS
async function gameStatus(req,res) {
    try {
        const games = await Games.findAll({
            where: { userID: req.body.email }
        });
        res.status(201).json({
            message: "Game Status:", 
            details: games
        })
    } catch (error) {
        res.status(500).json({
            message: "Unable to list game status", 
            errorMessage:error.message})
        console.log(error);
    }
};

//SHOW GAME STATUS - PLAYING
async function showPlaying(req,res) {
    try {
        const games = await Games.findAll({
            where: { userID: req.body.email, playing: true }
        });
        res.status(201).json({
            message: "Game Status: Playing", 
            details: games
        })
    } catch (error) {
        res.status(500).json({
            message: "Unable to list game status", 
            errorMessage:error.message})
        console.log(error);
    }
};

//SHOW GAME STATUS - OWNED
async function showOwned(req,res) {
    try {
        const games = await Games.findAll({
            where: { userID: req.body.email, owned: true }
        });
        res.status(201).json({
            message: "Game Status: Owned", 
            details: games
        })
    } catch (error) {
        res.status(500).json({
            message: "Unable to list game status", 
            errorMessage:error.message})
        console.log(error);
    }
};

//SHOW GAME STATUS - WANT
async function showWant(req,res) {
    try {
        const games = await Games.findAll({
            where: { userID: req.body.email, want: true }
        });
        res.status(201).json({
            message: "Game Status: Want", 
            details: games
        })
    } catch (error) {
        res.status(500).json({
            message: "Unable to list game status", 
            errorMessage:error.message})
        console.log(error);
    }
};

//SHOW GAME STATUS - COMPLETED
async function showCompleted(req,res) {
    try {
        const games = await Games.findAll({
            where: { userID: req.body.email, completed: true }
        });
        res.status(201).json({
            message: "Game Status: Completed", 
            details: games
        })
    } catch (error) {
        res.status(500).json({
            message: "Unable to list game status", 
            errorMessage:error.message})
        console.log(error);
    }
};

//DELETE GAME
async function deleteGame(req, res) {
    try {
        const { email, gameID } = req.body;

        // Validate that email and gameID are present in the request body
        if (!email || !gameID) {
            return res.status(400).json({ message: 'Email and non-empty gameID are required in the request body' });
        }

        const game = await Games.findOne({
            where: { userID: email, gameID: gameID }
        });

        console.log('Found game:', game);

        if (!game) {
            console.log('Game not found!');
            return res.status(404).json({ message: 'Game not found' });
        }

        await game.destroy();

        res.status(200).json({
            message: 'Game deleted successfully',
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Unable to remove game',
            errorMessage: error.message,
        });
    }
}


module.exports = { 
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
};