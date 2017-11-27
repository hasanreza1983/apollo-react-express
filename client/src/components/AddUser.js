import React, { Component } from 'react';
import { graphql,compose, withApollo} from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';

const inputParsers = {
  date(input) {
    const [month, day, year] = input.split('/');
    return `${year}-${month}-${day}`;
  },
  uppercase(input) {
    return input.toUpperCase();
  },
  number(input) {
    return parseFloat(input);
  },
};

class AddUser extends React.Component {
     constructor(props) {
        super(props);        
    }

async componentDidMount() {
	

  const users =  await this.props.client.query({
    query: getUserQuery,        
    variables: {
        id: this.props.match.params.id
    }       
  });
	
  console.log(users.data.getUser);
  
  }
   
  handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    for (let name of data.keys()) {
      const input = form.elements[name];
      const parserName = input.dataset.parse;
      if (parserName) {
        const parser = inputParsers[parserName];
        const parsedValue = parser(data.get(name));
        data.set(name, parsedValue);
      }
    }

    var id  = (data.get("id")) ? data.get("id") :  null ; 
    var name = data.get("name");
    var username = data.get("username");
    var password = data.get("password");
    var dob = data.get("dob");
    var sex = data.get("sex");
    var userEmails = data.get("userEmails");
    var userPhones = data.get("userPhones");
    var arrEmails = [];
    userEmails.split(',').map(function(item) {
      let temp = {};
      temp["email"] = item.trim();
      arrEmails.push(temp);
    });
    userEmails = arrEmails;
    var arrPhones = [];
    userPhones.split(',').map(function(item) {
      let temp = {};
      temp["phone"] = item.trim();
      arrPhones.push(temp);
    });
    userPhones = arrPhones;
    var response; 

    if (!id) {
      response = await this.props.addUserMutation({
        variables: {
          name,
          username,
          password,
          dob,
          sex,
          userEmails,
          userPhones
        }
      });
    }
    else {
       response = await this.props.updateUserMutation({
        variables: {
          name,
          username,
          password,
          dob,
          sex,
          userEmails,
          userPhones,
          id
        }
      })
    }

    console.log(response.data);
    this.props.history.push('/');
  }

  render() {
    return (
      <form onSubmit={(e)=> this.handleSubmit(e)} > 
        <input name="id" placeholder='Your ID' type='text'/> 
        <input name="name" placeholder='Your name' type='text'/> 
        <input name="username" placeholder='Your username' type='text'/> 
        <input name="password" placeholder='Choose a safe password' type='password'/> 
        <input name="sex" placeholder='Gender' type='text'/> 
        <input data-parse="date" name="dob" placeholder='Date of birth' type='text'/> 
        <input name="userEmails" placeholder='Emails' type='text'/> 
        <input name="userPhones" placeholder='Phones' type='text'/> 
        <button type="submit">Add User!</button>
      </form>
    );
  }
}

const addUserMutation = gql `
mutation CreateUser( $name: String!, $username: String!, $password: String!, $dob: String! , $sex: String! , $userEmails:[inputUserEmail]!, $userPhones:[inputUserPhone]!) {
  createUser(input:{
    username:$username
    password: $password
    dob:$dob
    sex:$sex,
    name: $name
    userEmails:$userEmails
    userPhones:$userPhones
  }) {
    id
    name
    username
    userEmails{
      email
    }
  } 
}
`;

const updateUserMutation = gql `
mutation ( $name: String!, $username: String!, $password: String!, $dob: String! , $sex: String! , $userEmails:[inputUserEmail]!, $userPhones:[inputUserPhone]!, $id: Int) {
  updateUser(input:{
    username:$username
    password: $password
    dob:$dob
    sex:$sex,
    name: $name
    userEmails:$userEmails
    userPhones:$userPhones
  },
    id: $id
  ) {
    id
    name
    username
    userEmails{
      email
    }
  } 
}
`;

const getUserQuery = gql `
query getUser ($id :Int){
  getUser(id:$id) {
    id
    username
    dob
    sex
    userEmails{
      email
    }
    userPhones{
      phone
    }
  }
}
`;

export default compose( 
    graphql(addUserMutation, {
        name: 'addUserMutation'
    }),
    graphql(updateUserMutation, {
        name: 'updateUserMutation'
    })
)(withApollo(AddUser));