import React from 'react';

// Partials
import ProjectCard from '../common/ProjectCard';

// Services
import projectsService from '../../../services/projects/projectsService';
import clientsService from '../../../services/clients/clientsService';
import categoriesService from '../../../services/categories/categoriesService';
import authService from '../../../services/auth/authService';

// Notifications
import Notifications from '../../common/Notifications';

//Utils
import Utils from '../../../utils/utils'


class ProjectList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			projects: [],

			clients: [],
			categories: [],

			selectedCategoryId: '',

			loading: true,

			activeLanguage: ''
		};
	}

	componentDidMount () {

		console.log('from list')

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

		Utils.getLanguage(this);

		this.loadAllData();
	}

	componentWillReceiveProps (nextProps) {
		this.props = nextProps;
		Utils.getLanguage(this);
		this.getCategoryId();
	}


	loadAllData = () => {
		clientsService
			.loadAllClients()
			.then(res => {

				this.setState({clients: res});

				categoriesService
					.loadAllCategories()
					.then(res => {
						this.setState({categories: res},
							() => this.getCategoryId());
					})
					.catch(err => {
						this.notifications.showMessage(err.responseJSON.description);
					});

			})
			.catch(err => {
				this.notifications.showMessage(err.responseJSON.description);
			});

	};

	loadProjects = () => {

		let query;

		if (this.state.selectedCategoryId !== '') {
			let categoryId = this.state.selectedCategoryId;

			query = `?query={"categoryIds":"${categoryId}"}`;
		}

		projectsService
			.loadAllProjects(query)
			.then(res => {

					res.forEach(p => {
						p.clientName = this.state.clients.filter(c => c._id === p.clientId)[0].name[this.state.activeLanguage];
					});

					this.setState({projects: res, loading: false}, () => this.saveProjectsInSession());
				}
			)
			.catch(err => {
				this.notifications.showMessage(err.responseJSON.description);
			});
	};

	getCategoryId = () => {

		this.setState({loading: true});

		let pathName = this.props.match.params.category;

		if (pathName !== undefined) {

			let catId = this.state.categories.filter(e => e.name.EN === pathName)[0]._id;

			this.setState({selectedCategoryId: catId}, () => this.loadProjects());

		} else {

			this.setState({selectedCategoryId: ''}, () => this.loadProjects());
		}

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

		let categoryName = this.props.location.pathname.split('/').pop();

		let projects = this.state.projects.map((e, i) => {
			return (
				<ProjectCard key={e._id + i}
				             project={e}
				             category={categoryName}
				             activeLanguage={this.state.activeLanguage}
				/>
			);
		});

		return (
			<div id="projects-list" className="container">

				<Notifications onRef={ref => (this.notifications = ref)}/>

				<div className="projects-container">
					{projects}
				</div>

			</div>
		);
	}
}

export default ProjectList;