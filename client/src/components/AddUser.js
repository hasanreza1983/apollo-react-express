import React, { Component } from 'react';
import { graphql,compose, withApollo} from 'react-apollo';
import gql from 'graphql-tag';
//import {withRouter} from 'react-router';
import PropTypes from 'prop-types';

class AddUser extends Component {
    constructor(props) {
     super(props);
     this.state = {     
        id: '',
        name: 'hasan reza',
        username: 'hasan_reza',
        password: '123456',
        dob: '1983/01/05',
        sex: 'male',
        userEmails: [],
        userPhones: []
      }
    }

  async componentDidMount() {

if (this.props.match.params.id) {

  var users =  await this.props.client.query({
    query: getUserQuery,        
    variables: {
        id: this.props.match.params.id
    }       
  });


var arrEmails = [];
users.data.getUser.userEmails.map(function(item) {
  arrEmails.push(item.email);   
});
var userEmails = arrEmails.join(', ');


var arrPhones = [];
users.data.getUser.userPhones.map(function(item) {
  arrPhones.push(item.phone);   
});
var userPhones = arrPhones.join(', ');

  this.setState(function(prevState, props){
      return {
        id: users.data.getUser.id,
        name: users.data.getUser.name,
        username: users.data.getUser.username,
        password: users.data.getUser.password,
        sex: users.data.getUser.sex,
        dob: users.data.getUser.dob,
        userEmails : userEmails,
        userPhones : userPhones
         }
   });
}
}

  _save = async () => {
   
   const { id, name, username, password, dob, sex } = this.state;
   var { userEmails, userPhones  } = this.state;

   console.log(userEmails);
   console.log(userPhones);

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
      <div>
        <h4 >Add user</h4>
        <div >
          <input name="id" value={this.state.id}  placeholder='Your ID' type='text'/> 
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
     userPhones{
      phone
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
    userPhones{
      phone
    }
  } 
}
`;

const getUserQuery = gql `
query getUser ($id :Int){
  getUser(id:$id) {
    id
    name
    username
    password
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

propTypes: {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      userEmails: PropTypes.array.isRequired
    })
}


export default compose( 
    graphql(addUserMutation, {
        name: 'addUserMutation'
    }),
    graphql(updateUserMutation, {
        name: 'updateUserMutation'
    })
)(withApollo(AddUser));