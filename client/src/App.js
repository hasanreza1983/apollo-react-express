import * as React from 'react'
 
import ApolloClient from 'apollo-client'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'
import { ApolloProvider } from 'react-apollo'
 

import UserList from './components/UserList';

const isNotProduction = process.env.NODE_ENV !== 'production';
const uri = isNotProduction ? 'http://localhost:3001/graphql' : process.env.REACT_APP_GRAPHQL_URI;

// Log
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('GRAPHQL_URI', uri);


// Apollo client
const client = new ApolloClient({
  link: new HttpLink({ uri: uri }),
  cache: new InMemoryCache().restore({})
})

console.log('client', client);

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <h3>User Contact Management</h3>
      <UserList />    
    </div>
  </ApolloProvider>
);

export default App;