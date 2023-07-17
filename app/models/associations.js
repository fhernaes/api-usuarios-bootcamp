const  User = require("./user.model");
const  Bootcamp  = require("./bootcamp.model");

User.belongsToMany(Bootcamp, {
  through: 'User_bootcamp',
  as: 'bootcamps',
  foreignKey: 'user_id',
});

Bootcamp.belongsToMany(User, {
  through: 'User_bootcamp',
  as: 'users',
  foreignKey: 'bootcamp_id',
});
