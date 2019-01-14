import React from 'react';
import { Link } from 'react-router-dom';

// Partials
import Carousel from './partials/Carousel';
import HomeProjectCard from '../common/HomeProjectCard';

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

			images: [],

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
				.catch(err => this.notifications.showMessage(err.responseJSON.description))

			return
		}

		this.loadStarProjects();
	}


	loadStarProjects = () => {

		let query = '?query={"isStar":true}';


		projectsService
			.loadAllProjects(query)
			.then(res => {

				this.setState({ projects: res, });

				clientsService
					.loadAllClients()
					.then(res => {

						this.setState({clients: res});

						this.state.projects.forEach(p => {
							p.clientName = this.state.clients.filter(c => c._id === p.clientId)[0].name.BG
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

		let projects = this.state.projects.map(e => {
			return (
				<HomeProjectCard key={e._id} project={e}/>
			)
		});

		return (
			<div id="home" className="container-fluid">
				<section className="hero">
					<Carousel images={this.state.images}/>
					<div className="brand">
						<figure className="image">
							<img src="images/logo/addict_logo_10.svg" className="svg-icon img-fit"/>
						</figure>

						<p className="text">
							Ние създаваме неща. Измисляме си. Мечтаем.<br/>
							Просто обичаме това, което правим.

						</p>
					</div>
				</section>

				<section className="projects-container">
					{projects}
				</section>

			</div>

		);
	}
}

export default Home;