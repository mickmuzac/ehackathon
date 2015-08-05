'use strict';
module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define('Team', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Team.belongsTo(models.Event);
        Team.belongsTo(models.User, {as: 'owner'});
        Team.belongsToMany(models.User, {through: 'UserTeam'})
      }
    }
  });
  return Team;
};