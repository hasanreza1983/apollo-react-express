module.exports = function(sequelize, DataTypes) {
    var userPhone = sequelize.define('userPhone', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        
        phone: {
            type: DataTypes.TEXT,
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
        tableName: 'user_phone'
    });

    userPhone.associate = function(models) {
        userPhone.belongsTo(models.user, { foreignKey: "user_id" });
    };

    return userPhone;
};