import React from 'react';

// Partials
import ProjectCard from './partials/ProjectCard';

// Services
import projectsService from '../../../../services/projects/projectsService';
import clientsService from '../../../../services/clients/clientsService';
import categoriesService from '../../../../services/categories/categoriesService';
import authService from '../../../../services/auth/authService';

// Notifications
import Messages from '../../../common/Messages';

class ProjectList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			projects: [],

			clients: [],
			categories: [],

			selectedCategory: '',
			filteredProjects: [],

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
					this.loadAll();
				})
				.catch(err => this.messages.showMessage(err.responseJSON.description))

			return
		}

		this.loadAll();
	}

	loadAll = () => {

		projectsService
			.loadAllProjects()
			.then(res => {

				this.setState({
					projects: res,
					filteredProjects: res
				});

				this.saveFilteredProjects(this.state.projects);

				clientsService
					.loadAllClients()
					.then(res => {

						this.setState({clients: res});

						this.state.projects.forEach(p => {
							p.client = this.state.clients.filter(c => c._id === p.clientId)[0].name.BG
						});

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

	handleChange = (e) => {

		e.preventDefault();

		if (e.target.name === 'all') {
			this.setState({
				selectedCategory: '',
				filteredProjects: this.state.projects
			});

			this.saveFilteredProjects(this.state.projects);

			return;
		}

		this.setState({[e.target.name]: e.target.value}, () => this.filterProjects());

	};

	filterProjects = () => {
		let filteredProjects = [];

		for (let project of this.state.projects) {

			if (filteredProjects.some(el => el._id === project._id)) continue;

			if (project.categoryIds.includes(this.state.selectedCategory)) {
				filteredProjects.push(project);
			}
		}

		this.setState({filteredProjects: filteredProjects});

		this.saveFilteredProjects(filteredProjects);
	};

	saveFilteredProjects = (filteredProjects) => {

		let projectIds = [];

		filteredProjects.forEach(e => projectIds.push(e._id));
		sessionStorage.setItem('filteredProjects', JSON.stringify(projectIds));
	};

	render () {

		if (this.state.loading) {
			return (<div className="lds-dual-ring"/> );
		}

		let categories = this.state.categories.map(e => {
			let style = this.state.selectedCategory.includes(e._id) ? 'btn category-label selected' : 'btn category-label';
			return (
				<button key={e._id}
				        className={style}
				        name="selectedCategory"
				        value={e._id}
				        onClick={this.handleChange}>{e.name.BG}</button>
			);
		});

		categories.unshift(<button key='all'
		                           className={this.state.selectedCategory.length === 0
			                           ? 'btn category-label selected'
			                           : 'btn category-label'}
		                           name="all"
		                           onClick={this.handleChange}>all</button>);

		let projects = this.state.filteredProjects.map((e, i) => {
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