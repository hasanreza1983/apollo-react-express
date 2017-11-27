import React from 'react';
import { gql, graphql, compose } from 'react-apollo';
import { Link} from 'react-router-dom';


// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class UserList extends React.Component {
   
   constructor() {
        super();
        this.state = {selected: undefined};
    }

    componentWillReceiveProps(nextProps){
      console.log(nextProps);
    }


    render() {

        const users = this.props.allUsers.getUserList;
        var columns = [{
                Header: 'ID',
                accessor: 'id'
            },
            {
                Header: 'Name',
                accessor: 'name'
            },
            {
                Header: 'User Name',
                accessor: 'username'
            },
            {
                Header: 'Date Of Birth',
                accessor: 'dob'
            },
            {
                Header: 'User Emails',
                accessor: 'userEmails',
                Cell: props => {
                    let arrMails = props.value;
                    let mailData = arrMails.map(email => (email.email));
                    return mailData.join(" | ");
                }
            },
             {
                Header: 'User Phones',
                accessor: 'userPhones',
                Cell: props => {
                    let arrPhones = props.value;
                    let phoneData = arrPhones.map(phone => (phone.phone));
                    return phoneData.join(" | ");
                }
            },
            {
                Header: 'Action',
                accessor: 'action',   
               Cell: props => (
                  <span>
                    <Link to={`addUser/${props.original.id}`}>Edit {props.original.id}</Link>
                    &nbsp;&nbsp;| &nbsp;&nbsp;<Link to={`addUser/${props.original.id}`}>Delete {props.original.id}</Link>
                  </span>
                )
            }
        ];

        return ( <ReactTable 
                filterable  
                defaultPageSize={5}   
                className="-striped -highlight" 
                data = { users } 
                columns = { columns } 
            />
        );
    }
}

const getUserListQuery = gql `
  query {
  getUserList {
    id
    name
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
  graphql(getUserListQuery, { name: 'allUsers' })  
)(UserList)