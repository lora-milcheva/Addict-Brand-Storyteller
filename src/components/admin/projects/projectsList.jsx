import React from 'react';
import { Link } from 'react-router-dom';

// Services
import projectsService from '../../../services/projects/projectsService';

// Notifications
import Messages from '../../common/Messages';

// Constants
import { BUTTONS } from '../../../constants/constants';

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

		let projects;

		if (this.state.projects.length > 0) {
			projects = this.state.projects.map(e => {
					return (
						<article key={e._id} className="project-card">
							<figure className="img-container">
								<img className="img-fit" src={e.thumbnail}/>
							</figure>
							<p className="project-name">{e.name.BG}</p>

							<Link to={'project-edit/' + e._id} className="hover">
								<div className="edit-btn">

									<i className="fa fa-pencil" aria-hidden="true"/>{BUTTONS.BG.edit}
								</div>
							</Link>

						</article>
					);
				}
			);
		}

		if (this.state.projectLoading) {
			return (<div className="lds-dual-ring"/> );
		}

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

