module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        sex: {
            type: DataTypes.ENUM('male', 'female'),
            allowNull: false
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        tableName: 'user'
    });

    user.associate = function(models) {
        user.hasMany(models.userEmail, { foreignKey: "user_id" });
        user.hasMany(models.userPhone, { foreignKey: "user_id" });
    };

    return user;
};