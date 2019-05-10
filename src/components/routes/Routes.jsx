import React from 'react';
import { Switch, Route } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';

// Private route
import PrivateRoute from './PrivateRoute';

// Components
import Login from '../auth/Login';
import Home from '../user/home/Home';
import ProjectsList from '../user/projects/ProjectsList';
import ProjectSimple from '../user/projects/ProjectSimple';
import ProjectStory from '../user/projects/ProjectStory';
import Contact from '../user/contact/Contact';

// Admin Components
import createProject from '../admin/projects/createEditProject/createEditProject';
import adminProjectsList from '../admin/projects/projectsList/projectsList';

import createEditCategory from '../admin/categories/createEditCategory';
import categoriesList from '../admin/categories/categoriesList';

import createEditClient from '../admin/clients/createEditClient';
import clientsList from '../admin/clients/clientsList';

import createEditSection from '../admin/projects/sections/createEditSection';
import sectionsList from '../admin/projects/sections/sectionsList';

// ERRORS and CONFIRMATIONS
import NotFound from '../errors/NotFound';

const RouteContainer = posed.div({
	enter: {
		opacity: 1,
		delay: 0,
		beforeChildren: true,
		transition: {
			opacity: {ease: 'easeIn', duration: 1000},
		},
	},
	exit: {
		opacity: 0,
		transition: {
			opacity: {ease: 'easeOut', duration: 1000},
		},
	},
});

let Routes = () => {

	return (

		<Switch>

			{/*//User*/}
			<Route exact path='/' component={Home}/>
			<Route exact path='/en' component={Home}/>

			<Route path='/login' component={Login}/>

			<Route exact path='/projects' component={ProjectsList}/>
			<Route exact path='/:lng/projects' component={ProjectsList}/>

			<Route exact path='/projects/:category' component={ProjectsList}/>
			<Route exact path='/:lng/projects/:category' component={ProjectsList}/>

			<Route exact path='/projects/:category/:id' component={ProjectStory}/>
			<Route exact path='/:lng/projects/:category/:id' component={ProjectStory}/>

			<Route exact path='/contact' component={Contact}/>
			<Route exact path='/:lng/contact' component={Contact}/>


			{/*//Admin*/}
			<PrivateRoute path='/admin/projects-list' component={adminProjectsList}/>
			<PrivateRoute path='/admin/project-create' component={createProject}/>
			<PrivateRoute path='/admin/project-edit/:id' component={createProject}/>

			<PrivateRoute path='/admin/category-list' component={categoriesList}/>
			<PrivateRoute path='/admin/category-create' component={createEditCategory}/>
			<PrivateRoute path='/admin/category-edit/:id' component={createEditCategory}/>

			<PrivateRoute path='/admin/clients-list' component={clientsList}/>
			<PrivateRoute path='/admin/client-create' component={createEditClient}/>
			<PrivateRoute path='/admin/client-edit/:id' component={createEditClient}/>

			<PrivateRoute path={'/admin/sections-list'} component={sectionsList}/>
			<PrivateRoute path={'/admin/section-create'} component={createEditSection}/>
			<PrivateRoute path={'/admin/section-edit/:id'} component={createEditSection}/>

			<Route path='*' component={NotFound}/>
		</Switch>

	);
};

export default Routes;

let backup = <Route render={({location}) => (

	<PoseGroup>
		<RouteContainer key={location.key || '200'}>
			<Switch location={location}>
				<Route exact path='/:lng(en)?' component={Home} key="home"/>

				<Route path='/:lng(en)?/login' component={Login} key="login"/>

				<Route exact path='/:lng(en)?/projects' component={ProjectsList} key="projects"/>

				<Route exact path='/:lng(en)?/projects/:category' component={ProjectsList}
				       key="projects/category"/>

				<Route exact path='/:lng(en)?/projects/:category/:id' component={ProjectSimple} key="project"/>


				{/*//Admin*/}
				<Route
					path="/admin"
					render={({match: {url}}) => (
						<>
							<Route exact path={`${url}/projects-list`} component={adminProjectsList}
							       key='adminProjects'/>
							<Route path={`${url}/project-create`} component={createProject} key='createProject'/>
							<Route path={`${url}/project-edit/:id`} component={createProject} key='editProject'/>

							<Route exact path={`${url}/category-list`} component={categoriesList} key='categories'/>
							<Route path={`${url}/category-create`} component={createEditCategory}
							       key='createCategory'/>
							<Route path={`${url}/category-edit/:id`} component={createEditCategory}
							       key='editCategory'/>

							<Route exact path={`${url}/clients-list`} component={clientsList} key='clients'/>
							<Route path={`${url}/client-create`} component={createEditClient} key='createClient'/>
							<Route path={`${url}/client-edit/:id`} component={createEditClient} key='editClient'/>

							<Route exact path={`${url}/sections-list`} component={sectionsList} key='sections'/>
							<Route path={`${url}/section-create`} component={createEditSection}
							       key='createSection'/>
							<Route path={`${url}/section-edit/:id`} component={createEditSection}
							       key='editSection'/>
						</>
					)}
				/>

				<Route path='*' component={NotFound} key='error'/>
			</Switch>
		</RouteContainer>
	</PoseGroup>

)}/>;