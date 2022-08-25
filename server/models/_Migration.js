const { DataTypes, Model } = require('sequelize') ;

const db  = require('../db');

class Migration extends Model {
}
const model = Migration.init({
  filename: { type: DataTypes.STRING(255), primaryKey: true },
  appliedAt: { type: DataTypes.DATE, allowNull: false }
}, {
  sequelize: db,
  tableName: '_migrations'
});


module.exports = {
    model
}