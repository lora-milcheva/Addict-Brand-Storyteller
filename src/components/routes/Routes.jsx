import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Private route
import PrivateRoute from './PrivateRoute';

// Components
import Login from '../auth/Login';
import Home from '../user/home/Home';
import ProjectsList from '../user/projects/projectsList/ProjectsList';
import Project from '../user/projects/project/Project';

// Admin Components
import createProject from '../admin/projects/createEdit/createEditProject';
import adminProjectsList from '../admin/projects/list/projectsList';

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

			<PrivateRoute exact path='/admin/project-create' component={createProject}/>
			<PrivateRoute exact path='/admin/project-edit/:id' component={createProject}/>
			<PrivateRoute exact path='/admin/projects-list' component={adminProjectsList}/>

			<Route path='*' component={NotFound}/>
		</Switch>
	);
};

export default Routes;