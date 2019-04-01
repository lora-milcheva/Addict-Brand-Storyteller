import React from 'react';
import posed from 'react-pose';

import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Partials
import ProjectCard from '../common/ProjectCard';

// Services
import projectsService from '../../../services/projects/projectsService';
import clientsService from '../../../services/clients/clientsService';
import categoriesService from '../../../services/categories/categoriesService';
import authService from '../../../services/auth/authService';

// Notifications
import Notifications from '../../common/Notifications';

const Test = posed.div({
	enter: {
		opacity: 1,
		transition: {
			opacity: { ease: 'easeOut', duration: 1000 },
			default: { ease: 'linear', duration: 200 }
		},
	},
	exit: {
		opacity: 0,
		transition: {
			opacity: { ease: 'easeOut', duration: 1000 },
			default: { ease: 'linear', duration: 200 }
		}
	}
});

const ListContainer = posed.div({
	enter: {staggerChildren: 200},
	exit: {staggerChildren: 20, staggerDirection: -1}
});

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
				.catch(err => this.notifications.showMessage(err.responseJSON.description));

			return;
		}

		this.loadAllData();
	}

	componentWillReceiveProps (nextProps) {
		if (this.props.match.params.category !== nextProps.match.params.category) {
			this.props = nextProps;
			this.getCategoryId();
		}
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
						p.clientName = this.state.clients.filter(c => c._id === p.clientId)[0].name;
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

		let categoryName = this.props.match.params.category;

		if (categoryName !== undefined) {

			// Get categoryId from the name coming from route

			let catId = this.state.categories.filter(e => e.name.en === categoryName)[0]._id;

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

		let activeLanguage = this.context.language;

		let categoryName = this.props.match.params.category;

		let projects = this.state.projects.map((e, i) => {
			return (
				<ProjectCard key={e._id + i}
				             project={e}
				             category={categoryName}
				/>
			);
		});

		return (

			<Test key={'test'} id="projects-list" className="container">

				<Notifications onRef={ref => (this.notifications = ref)} language={activeLanguage}/>

				<ListContainer className="projects-container">
					{projects}
				</ListContainer>

			</Test>

		);
	}
}

ProjectList.contextType = LanguageContext;

export default ProjectList;