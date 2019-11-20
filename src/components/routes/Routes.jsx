import React from 'react';
import { Switch, Route } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';

// Private route
import PrivateRoute from './PrivateRoute';

// Components
import Login from '../auth/Login';
import Home from '../user/home/Home';
import ProjectsList from '../user/projects/list/ProjectsList';
import ProjectStory from '../user/projects/project/ProjectStory';
import ContactUs from '../user/contact/ContactUs';
import Services from '../user/services/Services';
import AboutUs from '../user/aboutUs/AboutUs';
import Careers from '../user/careers/Careers';

// Admin Components
import createProject from '../admin/projects/createEditProject/createEditProject';
import adminProjectsList from '../admin/projects/projectsList/projectsList';

import createEditCategory from '../admin/categories/createEditCategory';
import categoriesList from '../admin/categories/categoriesList';

import createEditClient from '../admin/clients/createEditClient';
import clientsList from '../admin/clients/clientsList';

import createEditSection from '../admin/sections/createEditSection';
import sectionsList from '../admin/sections/sectionsList';

// ERRORS and CONFIRMATIONS
import NotFound from '../errors/NotFound';

const RouteContainer = posed.div({
	enter: {
		opacity: 1,
		delay: 0,
		beforeChildren: true,
		transition: {
			opacity: {ease: 'easeIn', duration: 200, delay: 500},
		},
	},
	exit: {
		opacity: 0,
		transition: {
			opacity: {ease: 'easeOut', duration: 300},
		},
	},
});

let Routes = () => {

	return (

		<Route render={({location}) => (

			<PoseGroup>
				<RouteContainer key={location.key || '200'}>
					<Switch location={location}>


						{/*//User*/}
						<Route exact path='/' component={Home}/>
						<Route exact path='/en' component={Home}/>

						<Route path='/login' component={Login}/>

						<Route exact path='/projects' component={ProjectsList}/>
						<Route exact path='/:lng/projects' component={ProjectsList}/>

						<Route exact path='/projects/:id' component={ProjectStory}/>
						<Route exact path='/:lng/projects/:id' component={ProjectStory}/>

						<Route exact path='/services' component={Services}/>
						<Route exact path='/:lng/services' component={Services}/>

						<Route exact path='/about-us' component={AboutUs}/>
						<Route exact path='/:lng/about-us' component={AboutUs}/>

						<Route exact path='/careers' component={Careers}/>
						<Route exact path='/:lng/careers' component={Careers}/>

						<Route exact path='/contact' component={ContactUs}/>
						<Route exact path='/:lng/contact' component={ContactUs}/>


						{/*//Admin*/}
						<Route
							path="/admin"
							render={({match: {url}}) => (
								<>
									<PrivateRoute path='/admin/projects-list' component={adminProjectsList}/>
									<PrivateRoute path='/admin/project-create' component={createProject}/>
									<PrivateRoute path='/admin/project-edit/:id' component={createProject}/>
									<PrivateRoute path='/admin/project-preview/:id' component={ProjectStory}/>

									<PrivateRoute path='/admin/category-list' component={categoriesList}/>
									<PrivateRoute path='/admin/category-create' component={createEditCategory}/>
									<PrivateRoute path='/admin/category-edit/:id' component={createEditCategory}/>

									<PrivateRoute path='/admin/clients-list' component={clientsList}/>
									<PrivateRoute path='/admin/client-create' component={createEditClient}/>
									<PrivateRoute path='/admin/client-edit/:id' component={createEditClient}/>

									<PrivateRoute path={'/admin/sections-list'} component={sectionsList}/>
									<PrivateRoute path={'/admin/section-create'} component={createEditSection}/>
									<PrivateRoute path={'/admin/section-edit/:id'} component={createEditSection}/>
								</>
							)}
						/>

						<Route path='*' component={NotFound} key='error'/>
					</Switch>
				</RouteContainer>
			</PoseGroup>

		)}/>
	);
};

export default Routes;

let backup = (
	<Switch>

		{/*//User*/}
		<Route exact path='/' component={Home}/>
		<Route exact path='/en' component={Home}/>

		<Route path='/login' component={Login}/>

		<Route exact path='/projects' component={ProjectsList}/>
		<Route exact path='/:lng/projects' component={ProjectsList}/>

		<Route exact path='/projects/:id' component={ProjectStory}/>
		<Route exact path='/:lng/projects/:id' component={ProjectStory}/>

		<Route exact path='/services' component={Services}/>
		<Route exact path='/:lng/services' component={Services}/>

		<Route exact path='/about-us' component={AboutUs}/>
		<Route exact path='/:lng/about-us' component={AboutUs}/>

		<Route exact path='/careers' component={Careers}/>
		<Route exact path='/:lng/careers' component={Careers}/>

		<Route exact path='/contact' component={ContactUs}/>
		<Route exact path='/:lng/contact' component={ContactUs}/>


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