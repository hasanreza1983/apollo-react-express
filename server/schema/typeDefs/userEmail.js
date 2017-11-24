module.exports=`
    type userEmail {
        id: Int!,
        user_id: Int!,
        email: String!,
        updated_at: String,
        created_at: String       
    }
    input inputUserEmail { 
        email: String!
}
`;