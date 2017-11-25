import React, { Component } from 'react'
import { graphql} from 'react-apollo'
import gql from 'graphql-tag'

class AddUser extends Component {
    constructor() {
        super();
		 this.state = {		  
		    name: 'hasan reza',
		    username: 'hasan_reza',
		    password: '123456',
		    dob: '1983/01/05',
		    sex: 'male',
		    userEmails: [],
		    userPhones: [] 
		  }
    }

  _save = async () => {

    const { name, username, password, dob, sex  } = this.state;

	let userEmails =  [{"email":"asergis@gmail.com"},{"email":"asergis@yahoo.com"}];
	let userPhones =  [{"phone": "542154785"},{"phone": "123654123"}];

    const result = await this.props.addUserMutation({       
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

    console.log(result.data);
    this.props.history.push(`/`);
  }

  render() {
    return (
      <div>
        <h4 >Add user</h4>
        <div >
          
          <input
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
            type='text'
            placeholder='Your name'
          />
          <input
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
            type='text'
            placeholder='Your username'
          />
          <input
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            type='password'
            placeholder='Choose a safe password'
          />

           <input
            value={this.state.dob}
            onChange={(e) => this.setState({ dob: e.target.value })}
            type='text'
            placeholder='Date of birth'
          />

           <input
            value={this.state.sex}
            onChange={(e) => this.setState({ sex: e.target.value })}
            type='text'
            placeholder='Gender'
          />


           <input
            value={this.state.userEmails}
            onChange={(e) => this.setState({ userEmails: e.target.value })}
            type='text'
            placeholder='Emails'
          />

           <input
            value={this.state.userPhones}
            onChange={(e) => this.setState({ userPhones: e.target.value })}
            type='text'
            placeholder='Phones'
          />

        </div>
       
		<input type="button"  onClick={(e) => this._save(e)} value="Add UIser" />

      </div>
    )
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

export default graphql(addUserMutation, { name: 'addUserMutation' })(AddUser)