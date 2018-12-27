import React from 'react';
import { Link } from 'react-router-dom';

// Partials
import ProjectCard from '../../common/ProjectCard';

// Services
import projectsService from '../../../services/projects/projectsService';

// Notifications
import Messages from '../../common/Messages';


class projectsList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			projects: [],

			loading: true
		};
	}

	componentDidMount () {

		projectsService
			.loadAllProjects()
			.then(res => {
				this.setState({
					projects: res,
					loading: false
				});
			})
			.catch(err => console.log(err));

	}

	render () {

		if (this.state.loading) {
			return (<div className="lds-dual-ring"/> );
		}

		let projects = this.state.projects.map(e => {
				return (
					<ProjectCard key={e._id} project={e}/>
				);
			}
		);

		return (
			<div id="admin-projects-list" className="container">

				<Messages onRef={ref => (this.messages = ref)}/>

				<div className="page-header">
					<h1 className="page-title">Проекти</h1>
				</div>

				<div className="buttons-container">
					<Link to="/admin/project-create" className="btn btn-primary sm">New Project</Link>
					<Link to="/admin/client-create" className="btn btn-primary sm">New Client</Link>
					<Link to="/admin/category-create" className="btn btn-primary sm">New Category</Link>
				</div>

				<div className="projects-container">
					{projects}
				</div>

			</div>
		);
	}
}

export default projectsList;

