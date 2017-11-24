import * as React from 'react'
import { render } from 'react-dom'
 
import ApolloClient from 'apollo-client'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'
import { ApolloProvider, graphql } from 'react-apollo'
import gql from 'graphql-tag'
 

import ChannelsListWithData from './components/ChannelsListWithData';

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
      <h3>Apollo-React</h3>
      <ChannelsListWithData />    
    </div>
  </ApolloProvider>
);

export default App;