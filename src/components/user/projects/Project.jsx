import React from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Partials
import GalleryPreview from './partials/GalleryPreview';
import ProjectCard from '../common/ProjectCard';

// Services
import projectsService from '../../../services/projects/projectsService';
import clientsService from '../../../services/clients/clientsService';
import authService from '../../../services/auth/authService';

// Notifications
import Notifications from '../../common/Notifications';

// Constants
import { USER_PAGES_TEXT } from '../../../constants/constants';

class Project extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			project: [],
			clientName: '',

			selectedImage: '',

			currentProjectIndex: 0,
			prevProjectId: undefined,
			nextProjectId: undefined,

			randomProjects: [],

			loading: true
		};
	}

	projectId = this.props.match.params.id;

	componentDidMount () {

		// Log anonymous user if storage is empty
		if (sessionStorage.getItem('authtoken') === null) {
			authService
				.loginAnonymousUser()
				.then(res => {
					authService.saveSession(res);
					this.setIndexes();
					this.loadRandomProjects();
				})
				.catch(err => this.notifications.showMessage(err.responseJSON.description));
		} else {
			this.setIndexes();
			this.loadRandomProjects();
		}
	}

	componentWillReceiveProps (nextProps) {

		if (this.props.match.params.id !== nextProps.match.params.id) {
			this.setState({loading: true});
			this.props = nextProps;

			this.projectId = nextProps.match.params.id;

			this.setIndexes();

			this.setState({randomProjects: []}, () => this.loadRandomProjects());
		}
	}

	componentWillUnmount () {
		sessionStorage.removeItem('filteredProjects');
	}

	setIndexes = () => {

		let filteredProjectIds = JSON.parse(sessionStorage.getItem('filteredProjects'));

		if (!filteredProjectIds) {
			this.loadProject();
			return;
		}

		let currentProjectIndex = filteredProjectIds.indexOf(this.projectId);

		let nextProjectId = filteredProjectIds[currentProjectIndex + 1];
		let prevProjectId = filteredProjectIds[currentProjectIndex - 1];

		this.setState({
			currentProjectIndex,
			prevProjectId,
			nextProjectId
		}, () => this.loadProject());

	};

	loadProject = () => {
		projectsService
			.loadProjectData(this.projectId)
			.then(res => {
				this.setState({project: res});
			})
			.then(() => {
					clientsService
						.loadAllClients()
						.then(res => {
							let client = res.filter(e => e._id === this.state.project.clientId);
							this.setState({clientName: client[0], loading: false});
						});
				}
			)
			.catch(err => {
				this.notifications.showMessage(err.responseJSON.description);
			});
	};

	loadRandomProjects = () => {

		let query = '?query={}&fields=_id';

		projectsService
			.loadAllProjects(query)
			.then(res => {

				const projects = res.filter(e => e._id !== this.projectId);

				const numberOfProjectsToLoad = 3;

				// Get random ids
				let projectIds = [];

				while (projectIds.length < numberOfProjectsToLoad) {

					let randomNumber = Math.floor((Math.random() * projects.length));

					if (!projectIds.includes(projects[randomNumber]._id)) {
						projectIds.push(projects[randomNumber]._id);
					}
				}

				// Load random projects by id
				for (let i = 0; i < projectIds.length; i++) {
					projectsService
						.loadProjectData(projectIds[i])
						.then(res => {
							this.setState({randomProjects: [...this.state.randomProjects, res]});
						})
						.catch(err => this.notifications.showMessage(err.responseJSON.description));
				}
			})
			.catch(err => this.notifications.showMessage(err.responseJSON.description));
	};

	showPreview = (e) => {
		this.setState({selectedImage: e.target.src});
	};

	hidePreview = () => {
		this.setState({selectedImage: ''});
	};

	render () {

		if (this.state.loading) {
			return (<div className="lds-dual-ring"/> );
		}

		let activeLanguage = this.context.language;

		let project = this.state.project;

		let client = this.state.clientName[activeLanguage];

		let gallery = project.images.map(e => {
			return (
				<figure className="image" key={e}>
					<img src={e} className="img-fit" alt={e} onClick={this.showPreview}/>
				</figure>
			);
		});

		let randomProjects = this.state.randomProjects.map((e, i) => {
			return (
				<ProjectCard key={e._id + i} project={e} activeLanguage={activeLanguage}/>
			);
		});

		return (
			<div id="project" className="container-fluid">

				<Notifications onRef={ref => (this.notifications = ref)} language={activeLanguage}/>

				<GalleryPreview image={this.state.selectedImage} allImages={project.images} onClose={this.hidePreview}/>

				<div className="project-info">
					<p className="project-title">{project.name[activeLanguage]}</p>
					<p>{client}</p>
					<p>{project.description[activeLanguage]}</p>
					<p>{project.year}</p>

					<div className="buttons-container">
						<Link to={this.state.prevProjectId !== undefined ? this.state.prevProjectId : '/projects'}
						      className={this.state.prevProjectId !== undefined ? 'btn btn-light' : 'btn btn-light disabled'}>
							<i className="fa fa-arrow-left" aria-hidden="true"/>
						</Link>

						<Link to={this.state.nextProjectId !== undefined ? this.state.nextProjectId : '/projects'}
						      className={this.state.nextProjectId !== undefined ? 'btn btn-light' : 'btn btn-light disabled'}>
							<i className="fa fa-arrow-right" aria-hidden="true"/>
						</Link>

					</div>

				</div>

				<div className="project-gallery">
					{gallery}
				</div>


				<h2 className="section-title">{USER_PAGES_TEXT.project[activeLanguage].otherProjects}</h2>
				<div className="projects-container">
					{randomProjects}
				</div>
			</div>
		);
	}
}

Project.contextType = LanguageContext;

export default Project;