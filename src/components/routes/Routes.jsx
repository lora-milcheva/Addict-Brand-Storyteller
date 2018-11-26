import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Private route
import PrivateRoute from './PrivateRoute';

// Components
import Login from '../auth/Login';
import Home from '../home/Home';
import ProjectsList from '../projects/projectsList/ProjectsList';
import Project from '../projects/project/Project';

// ERRORS and CONFIRMATIONS
import NotFound from '../errors/NotFound';


let Routes = () => {
	return (
		<Switch>

			<Route exact path='/' component={Home}/>
			<Route exact path='/home' component={Home}/>

			<Route exact path='/login' component={Login}/>

			<Route exact path='/projects' component={ProjectsList}/>
			<Route exact path='/projects/:id' component={Project}/>

			<Route path='*' component={NotFound}/>
		</Switch>
	);
};

export default Routes;