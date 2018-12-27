import React from 'react';
import {Link} from 'react-router-dom';


class ProjectCard extends React.Component {
	constructor (props) {
		super(props);
	}


	render () {

		let project = this.props.project;

		return (
			<article className="project-card">
				<div className="img-container">
					<img className="img-fit" src={project.thumbnail}/>
				</div>


				<Link to={'projects/' + project._id} className="hover">
					<div className="info">
						<p className="project-client">{project.client}</p>
						<p className="project-name">{project.name.BG}</p>
						<p className="project-year">{project.year}</p>
					</div>
				</Link>
			</article>
		);
	}
}

export default ProjectCard;