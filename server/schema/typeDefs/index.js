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
        updateUser(input: inputUser, id:Int): result 
        deleteUser(id : Int ): result
    }
`;

const types = [
    user,
    userEmail,
    userPhone, 
    rootTypes,
];

module.exports = mergeTypes(types);