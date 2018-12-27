import React from 'react';
import { Link } from 'react-router-dom';

// Services
import projectsService from '../../../../services/projects/projectsService';
import clientsService from '../../../../services/clients/clientsService';
import authService from '../../../../services/auth/authService';

// Notifications
import Messages from '../../../common/Messages';

class Project extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			project: [],
			projectId: '',
			client: '',

			currentProjectIndex: 0,
			prevProjectId: undefined,
			nextProjectId: undefined,

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
				})
				.catch(err => this.messages.showMessage(err.responseJSON.description))

			return
		}

		this.setIndexes();
	}

	componentWillReceiveProps (nextProps) {
		this.setState({loading: true});
		this.projectId = nextProps.match.params.id;

		this.setIndexes();
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
		}, () => this.loadProject(this.projectId));

	};

	loadProject = () => {

		projectsService
			.loadProjectData(this.projectId)
			.then(res => {
				this.setState({project: res});

				clientsService
					.loadAllClients()
					.then(res => {
						let client = res.filter(e => e._id === this.state.project.clientId);
						this.setState({client: client[0].name.BG, loading: false});
					});
			})
			.catch(err => {
				this.messages.showMessage(err.responseJSON.description);
			});
	};

	render () {

		if (this.state.loading) {
			return (<div className="lds-dual-ring"/> );
		}

		let project = this.state.project;

		let client = this.state.client;

		let gallery = project.images.map(e => {
			return (
				<figure className="image" key={e}>
					<img src={e} className="img-fit"/>
				</figure>
			);
		});


		return (
			<div id="project" className="container">

				<Messages onRef={ref => (this.messages = ref)}/>

				<main className="project-gallery">
					{gallery}
				</main>

				<aside className="project-info">
					<p className="project-title">{project.name.BG}</p>
					<p>{client}</p>
					<p>{project.description.BG}</p>
					<p>{project.year}</p>

					<Link to={this.state.prevProjectId !== undefined ? this.state.prevProjectId : '/projects'}
					      className={this.state.prevProjectId !== undefined ? "btn btn-light" : "btn btn-light disabled"}>prev</Link>

					<Link to={this.state.nextProjectId !== undefined ? this.state.nextProjectId : '/projects'}
					      className={this.state.nextProjectId !== undefined ? "btn btn-light" : "btn btn-light disabled"}>next</Link>

					<Link to={'/projects'} className='btn btn-primary sm'>Back to all projects</Link>
				</aside>
			</div>
		);
	}
}

export default Project;