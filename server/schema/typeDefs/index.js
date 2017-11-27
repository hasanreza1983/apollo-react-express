const { mergeTypes } = require('merge-graphql-schemas');
const user = require('./user');
const userEmail = require('./userEmail');
const userPhone = require('./userPhone');

const rootTypes = `  
    type Query {
        getUser(id: Int): user
        getUserList: [user]
    }

    type result {
        success: Boolean
    }

    type Mutation {
        createUser(input: inputUser): user
        updateUser(input: inputUser, id:Int): user 
        deleteUser(id : Int ): user
    }
`;

const types = [
    user,
    userEmail,
    userPhone, 
    rootTypes,
];

module.exports = mergeTypes(types);