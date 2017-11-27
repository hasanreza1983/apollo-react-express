import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import PageNotFound from './common/PageNotFound';

import HeaderNavContainer from './HeaderNavContainer';
import AddUser from './AddUser';
import UserList from './UserList';
import About from './About';


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
                        <Route path="/addUser/:id?" component={AddUser} />                        
                        <Route exact path="/about" component={About} />           
                         <Route component={PageNotFound} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;