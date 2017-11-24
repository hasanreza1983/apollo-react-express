module.exports=`
    type userPhone {
        id: Int!,
        user_id: Int!,
        phone: String!,
        updated_at: String,
        created_at: String        
    }
    input inputUserPhone {       
        phone: String!       
}
`;