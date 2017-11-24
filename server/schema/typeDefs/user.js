module.exports=`
    type user {
        id: Int!,
        username: String!,
        password: String!,
        name: String,
        sex: String,
        dob: String,
        updated_at: String,
        created_at: String,       
        userEmails: [userEmail],
        userPhones: [userPhone]
    }
    input inputUser {        
        username: String!,
        password: String!,
        name: String!,
        sex: String!,
        dob: String!,
        userEmails: [inputUserEmail]!,
        userPhones: [inputUserPhone]!      
 }
`;