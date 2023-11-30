const {DataTypes} = require("sequelize");
const SQLconnection = require("../db/connection");

const User = SQLconnection.define("User",{
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        isEmail: true,
        validate: {
            is: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = User;