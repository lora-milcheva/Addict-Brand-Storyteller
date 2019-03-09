import React from 'react';
import { Switch, Route } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';

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

const RouteContainer = posed.div({
	enter: {opacity: 1, delay: 1000, beforeChildren: true},
	exit: {opacity: 0}
});

let Routes = () => {

	return (

		<Route render={({location}) => (



			<PoseGroup>
				<RouteContainer key={location.key || '200'}>
					<Switch location={location}>
						<Route exact path='/:lng(en)?' component={Home} key="home"/>

						<Route path='/:lng(en)?/login' component={Login} key="login"/>

						<Route exact path='/:lng(en)?/projects' component={ProjectsList} key="projects"/>

						<Route exact path='/:lng(en)?/projects/:category' component={ProjectsList} key="category"/>

						<Route exact path='/:lng(en)?/projects/:category/:id' component={Project} key="project"/>


						{/*//Admin*/}
						<Route
							path="/admin"
							render={({match: {url}}) => (
								<>
								<Route exact path={`${url}/projects-list`} component={adminProjectsList} key='adminProjects'/>
								<Route path={`${url}/project-create`} component={createProject} key='createProject'/>
								<Route path={`${url}/project-edit/:id`} component={createProject} key='editProject'/>

								<Route exact path={`${url}/category-list`} component={categoriesList} key='categories'/>
								<Route path={`${url}/category-create`} component={createEditCategory} key='createCategory'/>
								<Route path={`${url}/category-edit/:id`} component={createEditCategory} key='editCategory'/>

								<Route exact path={`${url}/clients-list`} component={clientsList} key='clients'/>
								<Route path={`${url}/client-create`} component={createEditClient} key='createClient'/>
								<Route path={`${url}/client-edit/:id`} component={createEditClient} key='editClient'/>
								</>
							)}
						/>

						<Route path='*' component={NotFound} key='error'/>
					</Switch>
				</RouteContainer>
			</PoseGroup>
		)}
		/>
	);
};

export default Routes;