'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Presensi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Setiap Presensi milik satu User
      Presensi.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  Presensi.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      checkIn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      checkOut: {
        type: DataTypes.DATE,
        allowNull: true, // boleh null saat baru check-in
      },
      latitude: {
        // SAMA dengan di DB: decimal(10,8)
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
      },
      longitude: {
        // SAMA dengan di DB: decimal(11,8)
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: 'Presensi',
    }
  );

  return Presensi;
};
