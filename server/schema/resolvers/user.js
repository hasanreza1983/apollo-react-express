const model = require('../../models');
module.exports = {
    Query: {
        getUser: async(obj, args, context, info) => {
            const user = await model.user.findOne({
                include: [
                    model.userEmail,
                    model.userPhone
                ],
                where: {
                    id: args.id
                }
            });
            console.log(user);
            return user;
        },

        getUserList: async(obj, args, context, info) => {
            const users = await model.user.findAll({
                include: [
                    model.userEmail,
                    model.userPhone
                ]
            });
            return users;
        }
    },

    Mutation: {
        createUser: async(obj, args, context, info) => {
            const addedUser = await model.user.create(
                args.input, {
                    include: [
                        model.userEmail,
                        model.userPhone
                    ]
                });
            return addedUser;
        },

        updateUser: async(obj, args, context, info) => {
            const users = await model.user.findById(args.id)
                .then(function() {
                    model.user.update(args.input, {
                        where: {
                            id: args.id
                        }
                    });
                })
                .then(function() {

                    args.input.userEmails.map(email => email.user_id = args.id);
                    model.userEmail.bulkCreate(args.input.userEmails, {
                        user_id: args.id
                    });
                })
                .then(function() {

                    args.input.userPhones.map(phone => phone.user_id = args.id);
                    model.userPhone.bulkCreate(args.input.userPhones, {
                        user_id: args.id
                    });
                });
            return users;
        },

        deleteUser: async(obj, args, context, info) => {
            const user = await model.user.destroy({
                where: {
                    id: args.id
                }
            });
            return user;
        }
    }
}