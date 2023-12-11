const {DataTypes} = require("sequelize");
const SQLconnection = require("../db/connection");

const Games = SQLconnection.define("Games",{
    gameID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    userID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    playing : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    owned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    want: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
})

module.exports = Games;