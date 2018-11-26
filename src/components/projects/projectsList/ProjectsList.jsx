import React from 'react';
import { Link } from 'react-router-dom';

import projectsService from '../../../services/projects/projectsService';

class ProjectList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			projects: [],
		};
	}

	componentDidMount () {
		this.loadProjects();
	}

	loadProjects = () => {
		projectsService
			.loadAllProjects()
			.then(res => {

				this.setState({projects: res})
			})
			.catch(err => {
				console.log(err);
			});
	};

	addProject = () => {
		projectsService
			.createProject({})
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	};

	render () {
		let idOne = 2;

		return (
			<div id="projects">
				<h1>These are my projects.</h1>
				<Link to={'projects/' + idOne}>1</Link>
				<Link to={'projects/' + 2}>2</Link>

				<button onClick={this.addProject}>add project</button>
			</div>
		);
	}
}

export default ProjectList;