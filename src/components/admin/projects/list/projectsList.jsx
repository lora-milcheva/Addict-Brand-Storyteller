import React from 'react';
import {Link} from 'react-router-dom';

// Services
import projectsService from '../../../../services/projects/projectsService';

// Notifications
import Messages from '../../../common/Messages';



class projectsList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			projects: []
		};
	}

	componentDidMount () {

		console.log('from projects list')

		projectsService
			.loadAllProjects()
			.then(res => {
				console.log(res);
				this.setState({projects: res});
			})
			.catch(err => console.log(err));

	}

	render () {

		let projects;

		if (this.state.projects.length > 0) {
			projects = this.state.projects.map(e => {
					console.log(e);
					return(
						<article key={e._id} className="project-card">
							<figure className="img-container">
								<img src={e.avatar}/>
							</figure>
							<p className="project-name">{e.name.BG}</p>
							<Link to={'project-edit/' + e._id}>edit</Link>
						</article>
					)
				}
			);
		}



		return (
			<div id="projects-list" className="container">

				<Messages onRef={ref => (this.messages = ref)}/>

				<h1 className="page-title">Проекти</h1>

				{projects}
			</div>
		);
	}
}

export default projectsList;

