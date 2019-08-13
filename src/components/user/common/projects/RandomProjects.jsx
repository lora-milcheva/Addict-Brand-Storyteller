import React from 'react';
import PropTypes from 'prop-types';

// Partials
import ProjectCard from './ProjectCard';

// Services
import projectsService from '../../../../services/projects/projectsService';


class RandomProjects extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			randomProjects: [],
			loading: true
		};
	}

	componentDidMount () {
		this.loadRandomProjects();
	}

	loadRandomProjects = () => {

		let query = '?query={"isBlocked":false}&fields=_id';

		projectsService
			.loadAllProjects(query)
			.then(res => {

				const projects = res.filter(e => e._id !== this.props.currentProjectId);

				let numberOfProjectsToLoad = projects.length;

				if (numberOfProjectsToLoad > 3) {
					numberOfProjectsToLoad = 3;
				}

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
							this.setState({
								randomProjects: [...this.state.randomProjects, res],
								loading: false
							});
						})
						.catch(err => this.notifications.showMessage(err.responseJSON.description));
				}
			})
			.catch(err => this.notifications.showMessage(err.responseJSON.description));
	};

	render () {

		if (this.state.loading) return (<div className="lds-dual-ring"/>);

		let {language} = this.props;

		let randomProjects = this.state.randomProjects.map((e, i) => {
			return (
				<ProjectCard key={e._id + i} project={e} activeLanguage={language}/>
			);
		});

		return (
			<div id="other-projects">
				{randomProjects}
			</div>
		);
	}

}

export default RandomProjects;

RandomProjects.propTypes = {
	language: PropTypes.string,
	currentProjectId: PropTypes.string
};

