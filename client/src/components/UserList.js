import React from 'react';
import { gql, graphql } from 'react-apollo';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class UserList extends React.Component {
   
   constructor() {
        super();
        this.state = {selected: undefined};
    }

    render() {
        const users = this.props.data.getUserList;
        var columns = [{
                Header: 'ID',
                accessor: 'id'
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
                Cell: props => {   
                console.log(props.original.id);                 
                    return <button data-action="edit">Edit { props.original.id}</button>;
                }
            }
        ];

        return ( <ReactTable  data = { users } columns = { columns }  />
        );
    }
}

const usersListQuery = gql `
  query {
  getUserList {
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

export default graphql(usersListQuery)(UserList);