module.exports = function(sequelize, DataTypes) {
    var userEmail = sequelize.define('userEmail', {
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
        email: {
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
        tableName: 'user_email'
    });

    userEmail.associate = function(models) {
        userEmail.belongsTo(models.user, { foreignKey: "user_id" ,  foreignKeyConstraint:false});
    };

    return userEmail;
};