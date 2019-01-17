import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Private route
import PrivateRoute from './PrivateRoute';

// Components
import Login from '../auth/Login';
import Home from '../user/home/Home';
import ProjectsList from '../user/projects/ProjectsList';
import Project from '../user/projects/Project';

// Admin Components
import createProject from '../admin/projects/createEditProject/createEditProject';
import adminProjectsList from '../admin/projects/projectsList/projectsList';

import createEditCategory from '../admin/categories/createEditCategory';
import categoriesList from '../admin/categories/categoriesList';

import createEditClient from '../admin/clients/createEditClient';
import clientsList from '../admin/clients/clientsList';

// ERRORS and CONFIRMATIONS
import NotFound from '../errors/NotFound';

let Routes = () => {

	return (
		<Switch>

			<Route exact path='/' component={Home}/>

			<Route path='/login' component={Login}/>

			<Route exact path={['/:lng/projects', '/projects']} component={ProjectsList}/>

			<Route exact path='/projects/:category' component={ProjectsList}/>
			<Route exact path='/:lng/projects/:category' component={ProjectsList}/>

			<Route path={['/:lng/project/:id', '/project/:id']} component={Project}/>
			<Route path={['/projects/:category/:id']} component={Project}/>
			<Route path={[ '/:lng/projects/:category/:id']} component={Project}/>


			<PrivateRoute path='/admin/projects-list' component={adminProjectsList}/>
			<PrivateRoute path='/admin/project-create' component={createProject}/>
			<PrivateRoute path='/admin/project-edit/:id' component={createProject}/>

			<PrivateRoute path='/admin/category-list' component={categoriesList}/>
			<PrivateRoute path='/admin/category-create' component={createEditCategory}/>
			<PrivateRoute path='/admin/category-edit/:id' component={createEditCategory}/>

			<PrivateRoute path='/admin/clients-list' component={clientsList}/>
			<PrivateRoute path='/admin/client-create' component={createEditClient}/>
			<PrivateRoute path='/admin/client-edit/:id' component={createEditClient}/>

			<Route path='*' component={NotFound}/>
		</Switch>
	);
};

export default Routes;