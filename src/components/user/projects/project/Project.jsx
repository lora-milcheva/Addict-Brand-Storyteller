import React from 'react';

// Services
import projectsService from '../../../../services/projects/projectsService';

// Notifications
import Messages from '../../../common/Messages';

class Project extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			project: {},

			loading: true
		};
	}

	componentDidMount () {
		this.loadProject();
	}

	loadProject = () => {
		let projectId = this.props.match.params.id;
		projectsService
			.loadProjectData(projectId)
			.then(res => {
				this.setState({project: res, loading: false});
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

		return (
			<div id="project" className="container">

				<Messages onRef={ref => (this.messages = ref)}/>
				<p>{project.name.BG}</p>
			</div>
		);
	}
}

export default Project;