import React from 'react';

// Services
import projectsService from '../../../../services/projects/projectsService';
import clientsService from '../../../../services/clients/clientsService';

// Notifications
import Messages from '../../../common/Messages';

class Project extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			project: {},

			client: '',

			loading: true
		};
	}

	componentDidMount () {
		this.loadProject();
	}

	loadProject = () => {
		let projectId = this.props.match.params.id;

		// let projectIds = sessionStorage.getItem('filteredProjects');
		// console.log(projectIds)
		projectsService
			.loadProjectData(projectId)
			.then(res => {
				this.setState({project: res});

				clientsService
					.loadAllClients()
					.then(res => {
						let client = res.filter(e => e._id === this.state.project.clientId);
						this.setState({client: client[0].name.BG, loading: false});
					})
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
					<img src={e} className="img-fit" />
				</figure>
			)
		})

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

					<button className="btn btn-light">prev</button>
					<button className="btn btn-light">next</button>
				</aside>
			</div>
		);
	}
}

export default Project;