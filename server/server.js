const app = require('express')();
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { server } = require('./config/config.json');

const schema = require('./schema');
const port ='3001';

var corsOptions = { origin: process.env.REACT_APP_ENDPOINT_URL || 'http://localhost:3001' };
app.use(cors(corsOptions));

app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema,
}));

//if (process.env.ENV == 'development') {
    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
    }));
//}
app.listen(port, () => {
    console.log('info', `Running a GraphQL API server at http://localhost:3001/graphql`);
});