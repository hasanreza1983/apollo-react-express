import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PageNotFound from './common/PageNotFound';

import AddUser from './AddUser';
import UserList from './UserList';
import About from './About';
import HeaderNavContainer from './HeaderNavContainer';

import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

const App = () => {
    return (
        <div >
            <Router history={history}>
                <div>    
                 <HeaderNavContainer />          
                    <Switch>
                        <Route exact path="/" component={UserList} />                        
                        <Route exact path="/addUser" component={AddUser} />   
                        <Route exact path="/about" component={About} />                     
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;