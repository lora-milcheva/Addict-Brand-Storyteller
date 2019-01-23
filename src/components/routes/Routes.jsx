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

			{/*//User*/}
			<Route exact path='/:lng(en)?' component={Home}/>

			<Route path='/:lng(en)?/login' component={Login}/>

			<Route exact path='/:lng(en)?/projects' component={ProjectsList}/>

			<Route exact path='/:lng(en)?/projects/:category' component={ProjectsList}/>

			<Route exact path='/:lng(en)?/projects/:category/:id' component={Project}/>


			{/*//Admin*/}
			<Route
				path="/admin"
				render={({ match: { url } }) => (
					<>
					<Route exact path={`${url}/projects-list`} component={adminProjectsList} />
					<Route path={`${url}/project-create`} component={createProject} />
					<Route path={`${url}/project-edit/:id`} component={createProject} />

					<Route exact path={`${url}/category-list`} component={categoriesList} />
					<Route path={`${url}/category-create`} component={createEditCategory} />
					<Route path={`${url}/category-edit/:id`} component={createEditCategory} />

					<Route exact path={`${url}/clients-list`} component={clientsList} />
					<Route path={`${url}/client-create`} component={createEditClient} />
					<Route path={`${url}/client-edit/:id`} component={createEditClient} />
					</>
				)}
			/>

			<Route path='*' component={NotFound}/>
		</Switch>
	);
};

export default Routes;