import React from 'react';
import { Link } from 'react-router-dom';

// Partials
import ProjectCard from './partials/ProjectCard';

// Services
import projectsService from '../../../../services/projects/projectsService';

// Notifications
import Notifications from '../../../common/Notifications';

// Constants
import { BUTTONS, ADMIN_PAGES_TEXT } from '../../../../constants/constants';

class projectsList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			projects: [],

			loading: true
		};
	}

	componentDidMount () {

		if (sessionStorage.length === 0) {
			this.props.history.push('/')
		}

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

				<Notifications onRef={ref => (this.notifications = ref)} language='bg'/>

				<div className="page-header">
					<h1 className="page-title">{ADMIN_PAGES_TEXT.project.bg.allProjects}</h1>
				</div>

				<div className="buttons-container">
					<Link to="/admin/project-create" className="btn btn-primary sm">{BUTTONS.bg.newProject}</Link>
					<Link to="/admin/client-create" className="btn btn-primary sm">{BUTTONS.bg.newClient}</Link>
					<Link to="/admin/category-create" className="btn btn-primary sm">{BUTTONS.bg.newCategory}</Link>
				</div>

				<div className="projects-container">
					{projects}
				</div>

			</div>
		);
	}
}

export default projectsList;

