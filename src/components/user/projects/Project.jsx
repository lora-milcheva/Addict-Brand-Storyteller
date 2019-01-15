import React from 'react';
import { Link } from 'react-router-dom';

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
import { USER_PAGES_TEXT } from '../../../constants/constants'

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

		console.log(this.props.match.params)
		// Log anonymous user if storage is empty
		if (sessionStorage.getItem('authtoken') === null) {
			authService
				.loginAnonymousUser()
				.then(res => {
					authService.saveSession(res);
					this.setIndexes();
				})
				.catch(err => this.notifications.showMessage(err.responseJSON.description));

			return;
		}

		this.setIndexes();
		this.loadRandomProjects();
	}

	componentWillReceiveProps (nextProps) {
		this.setState({loading: true});

		this.projectId = nextProps.match.params.id;

		this.setIndexes();

		this.setState({randomProjects: []}, () => this.loadRandomProjects());
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
							this.setState({clientName: client[0].name.BG, loading: false});
						});
				}
			)
			.catch(err => {
				this.notifications.showMessage(err.responseJSON.description);
			});
	};

	loadRandomProjects = () => {
		projectsService
			.getProjectsCount()
			.then(res => {

				const allProjectsCount = res.count;

				const numberOfProjectsToLoad = 3;

				// Get random numbers
				let numbers = [];

				while (numbers.length < numberOfProjectsToLoad) {

					let randomNumber = Math.floor((Math.random() * allProjectsCount));

					if (!numbers.includes(randomNumber)) {
						numbers.push(randomNumber);
					}
				}

				// Load random projects
				for (let i = 0; i < numbers.length; i++) {

					let query = `?query={}&limit=${1}&skip=${numbers[i]}`;

					projectsService
						.loadAllProjects(query)
						.then(res => {

							if (res[0]._id === this.projectId) return;

							this.setState({randomProjects: [...this.state.randomProjects, ...res]});
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

		let project = this.state.project;

		let client = this.state.clientName;

		let gallery = project.images.map(e => {
			return (
				<figure className="image" key={e}>
					<img src={e} className="img-fit" alt={e} onClick={this.showPreview}/>
				</figure>
			);
		});

		let randomProjects = this.state.randomProjects.map((e, i) => {
			return (
				<ProjectCard key={e._id + i} project={e}/>
			);
		});

		return (
			<div id="project" className="container-fluid">

				<Notifications onRef={ref => (this.notifications = ref)}/>

				<GalleryPreview image={this.state.selectedImage} allImages={project.images} onClose={this.hidePreview}/>

				<div className="project-info">
					<p className="project-title">{project.name.BG}</p>
					<p>{client}</p>
					<p>{project.description.BG}</p>
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


				<h2 className="section-title">{USER_PAGES_TEXT.project.BG.otherProjects}</h2>
				<div className="projects-container">
					{randomProjects}
				</div>
			</div>
		);
	}
}

export default Project;