import React from 'react';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Partials
import Carousel from './partials/Carousel';
import CarouselNew from './partials/CarouselNew';
import Company from './partials/Company';
import Projects from './partials/Projects';

// Services
import authService from '../../../services/auth/authService';
import projectsService from '../../../services/projects/projectsService';
import clientsService from '../../../services/clients/clientsService';
import categoriesService from '../../../services/categories/categoriesService';

class Home extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			projects: [],

			clients: [],
			categories: [],

			loading: true
		};
	}

	componentDidMount () {

		// Clear filtered by category projects
		sessionStorage.removeItem('filteredProjects');

		// Log anonymous user if storage is empty
		if (sessionStorage.getItem('authtoken') === null) {
			authService
				.loginAnonymousUser()
				.then(res => {
					authService.saveSession(res);
					this.loadStarProjects();
				})
				.catch(err => this.notifications.showMessage(err.responseJSON.description));

			return;
		}

		this.loadStarProjects();
	}

	loadStarProjects = () => {

		let query = '?query={"isStar":true}';

		projectsService
			.loadAllProjects(query)
			.then(res => {

				this.setState({projects: res});

				clientsService
					.loadAllClients()
					.then(res => {

						this.setState({clients: res});

						this.state.projects.forEach(p => {
							p.clientName = this.state.clients.filter(c => c._id === p.clientId)[0].name;
						});

						categoriesService
							.loadAllCategories()
							.then(res => {
								this.setState({categories: res, loading: false});
							})
							.catch(err => {
								this.notifications.showMessage(err.responseJSON.description);
							});

					})
					.catch(err => {
						this.notifications.showMessage(err.responseJSON.description);
					});

			})
			.catch(err => {
				this.notifications.showMessage(err.responseJSON.description);
			});
	};

	render () {

		let activeLanguage = this.context.language;

		return (
			<div id="home">

				<Carousel/>

				{/*<CarouselNew language={activeLanguage}/>*/}

				<Company language={activeLanguage}/>

				<Projects projects={this.state.projects} language={activeLanguage}/>

			</div>

		);
	}
}

Home.contextType = LanguageContext;

export default Home;