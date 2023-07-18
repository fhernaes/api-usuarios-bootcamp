const Sequelize = require("sequelize");
let database, username, password, host;

database = "db_jwtbootcamp";
username = "f"
password = "123456"
host = "localhost"

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 20000,
        idle: 5000,
    },
});

module.exports = sequelize;
