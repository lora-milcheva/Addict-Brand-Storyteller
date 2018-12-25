import React from 'react';
import { Link } from 'react-router-dom';

import projectsService from '../../../../services/projects/projectsService';

import Messages from '../../../common/Messages';

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
				this.messages.confirmDelete(err.responseJSON.description);
			});
	};


	render () {
		let idOne = 2;

		return (
			<div id="projects" className="container">

				<Messages onRef={ref => (this.messages = ref)}/>

				<h1>These are my projects.</h1>
				<Link to={'projects/' + idOne}>1</Link>
				<Link to={'projects/' + 2}>2</Link>
			</div>
		);
	}
}

export default ProjectList;