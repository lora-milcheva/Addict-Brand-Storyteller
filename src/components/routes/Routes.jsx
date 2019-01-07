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
			<Route exact path='/home' component={Home}/>

			<Route exact path='/login' component={Login}/>

			<Route exact path='/projects' component={ProjectsList}/>
			<Route exact path='/projects/:id' component={Project}/>


			<PrivateRoute exact path='/admin/projects-list' component={adminProjectsList}/>
			<PrivateRoute exact path='/admin/project-create' component={createProject}/>
			<PrivateRoute exact path='/admin/project-edit/:id' component={createProject}/>

			<PrivateRoute exact path='/admin/category-list' component={categoriesList}/>
			<PrivateRoute exact path='/admin/category-create' component={createEditCategory}/>
			<PrivateRoute exact path='/admin/category-edit/:id' component={createEditCategory}/>

			<PrivateRoute exact path='/admin/clients-list' component={clientsList}/>
			<PrivateRoute exact path='/admin/client-create' component={createEditClient}/>
			<PrivateRoute exact path='/admin/client-edit/:id' component={createEditClient}/>

			<Route path='*' component={NotFound}/>
		</Switch>
	);
};

export default Routes;