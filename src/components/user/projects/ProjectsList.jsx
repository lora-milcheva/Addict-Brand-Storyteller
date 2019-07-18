import React from 'react';
import posed from 'react-pose';

import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Partials
import PageHeader from '../common/headers/PageHeader';
import ProjectCard from '../common/projects/ProjectCard';

// Services
import projectsService from '../../../services/projects/projectsService';
import clientsService from '../../../services/clients/clientsService';
import authService from '../../../services/auth/authService';

// Notifications
import Notifications from '../../common/Notifications';



class ProjectList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			projects: [],
			clients: [],

			loading: true
		};
	}

	componentDidMount () {

		// Log anonymous user if storage is empty
		if (sessionStorage.getItem('authtoken') === null) {
			authService
				.loginAnonymousUser()
				.then(res => {
					authService.saveSession(res);
					this.loadAllData();
				})
				.catch(err => this.notifications.showMessage(err.responseJSON.description));

			return;
		}

		this.loadAllData();
	}

	loadAllData = () => {
		clientsService
			.loadAllClients()
			.then(res => {
				this.setState({clients: res});
			})
			.then(() => {
				projectsService
					.loadAllProjects()
					.then(res => {
						res.sort((a, b) => Number(a.orderNumber) - Number(b.orderNumber))
								.forEach(p => {
									p.clientName = this.state.clients.filter(c => c._id === p.clientId)[0].name;
								});

							this.setState({projects: res, loading: false});
						}
					);
			})
			.catch(err => {
				this.notifications.showMessage(err.responseJSON.description);
			});
	};

	render () {

		let activeLanguage = this.context.language;

		let categoryName = this.props.match.params.category;

		let projects = this.state.projects.map((e, i) => {
			return (
				<ProjectCard key={e._id + i}
				             project={e}
				             category={categoryName}
				             activeLanguage={activeLanguage}/>
			);
		});

		return (

			<div id="projects-list" >

				<Notifications onRef={ref => (this.notifications = ref)} language={activeLanguage}/>

				<PageHeader language={activeLanguage} pageName='projects' />

				{this.state.loading &&
				<div className="lds-dual-ring"/>}

				{!this.state.loading &&
				<section className="projects-container container">
					{projects}
				</section>
				}

			</div>
		);
	}
}

ProjectList.contextType = LanguageContext;

export default ProjectList;