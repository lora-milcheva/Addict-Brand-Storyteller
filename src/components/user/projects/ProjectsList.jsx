import React from 'react';

// Partials
import ProjectCard from '../common/ProjectCard';

// Services
import projectsService from '../../../services/projects/projectsService';
import clientsService from '../../../services/clients/clientsService';
import categoriesService from '../../../services/categories/categoriesService';
import authService from '../../../services/auth/authService';

// Notifications
import Messages from '../../common/Messages';

class ProjectList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			projects: [],

			clients: [],
			categories: [],

			selectedCategoryId: '',

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
				.catch(err => this.messages.showMessage(err.responseJSON.description));

			return;
		}

		this.loadAllData();
	}

	loadAllData = () => {

		projectsService
			.loadAllProjects()
			.then(res => {

				this.setState({projects: res}, () => this.saveProjectsInSession());

				clientsService
					.loadAllClients()
					.then(res => {

						this.setState({clients: res}, () => this.getClientName());

						categoriesService
							.loadAllCategories()
							.then(res => {
								this.setState({categories: res, loading: false});
							})
							.catch(err => {
								this.messages.showMessage(err.responseJSON.description);
							});

					})
					.catch(err => {
						this.messages.showMessage(err.responseJSON.description);
					});

			})
			.catch(err => {
				this.messages.showMessage(err.responseJSON.description);
			});
	};

	loadProjectsByCategory = () => {

		let query;

		if (this.state.selectedCategoryId !== '') {
			let categoryId = this.state.selectedCategoryId;

			query = `?query={"categoryIds":"${categoryId}"}`;
		}

		projectsService
			.loadAllProjects(query)
			.then(res => {
					res.forEach(p => {
						p.clientName = this.state.clients.filter(c => c._id === p.clientId)[0].name.BG;
					});
					this.setState({projects: res}, () => this.saveProjectsInSession());
				}
			)
			.catch(err => {
				this.messages.showMessage(err.responseJSON.description);
			});
	};

	handleCategoryChange = (e) => {

		e.preventDefault();

		if (e.target.name === 'all') {
			this.setState({selectedCategoryId: ''}, () => this.loadProjectsByCategory());

			return;
		}

		this.setState({[e.target.name]: e.target.value}, () => this.loadProjectsByCategory());
	};

	getClientName = () => {
		this.state.projects.forEach(p => {
			p.clientName = this.state.clients.filter(c => c._id === p.clientId)[0].name.BG;
		});
	};

	saveProjectsInSession = () => {

		let projectIds = [];

		this.state.projects.forEach(e => projectIds.push(e._id));
		sessionStorage.setItem('filteredProjects', JSON.stringify(projectIds));
	};

	render () {

		if (this.state.loading) {
			return (<div className="lds-dual-ring"/> );
		}

		let categories = this.state.categories.map(e => {
			let style = this.state.selectedCategoryId.includes(e._id) ? 'btn category-label selected' : 'btn category-label';
			return (
				<button key={e._id}
				        className={style}
				        name="selectedCategoryId"
				        value={e._id}
				        onClick={this.handleCategoryChange}>{e.name.BG}</button>
			);
		});

		categories.unshift(<button key='all'
		                           className={this.state.selectedCategoryId === ''
			                           ? 'btn category-label selected'
			                           : 'btn category-label'}
		                           name="all"
		                           onClick={this.handleCategoryChange}>all</button>);

		let projects = this.state.projects.map((e, i) => {
			return (
				<ProjectCard key={e._id + i} project={e}/>
			);
		});

		return (
			<div id="projects-list" className="container">

				<Messages onRef={ref => (this.messages = ref)}/>

				<div className="page-header">
					<h1 className="page-title">Портфолио</h1>
				</div>

				<div className="buttons-container">
					{categories}
				</div>

				<div className="projects-container">
					{projects}
				</div>

			</div>
		);
	}
}

export default ProjectList;