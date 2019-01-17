import React from 'react';
import { Link } from 'react-router-dom';

class ProjectCard extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		let {project, activeLanguage, category} = this.props;

		console.log(project);

		let linkPath = category
			? '/projects/' + category + '/' + project._id
			: '/projects/all/' + project._id;

		return (
			<article className="project-card">
				<div className="img-container">
					<img className="img-fit" src={project.thumbnail} alt={project.name[activeLanguage]}/>
				</div>


				<Link to={linkPath} className="hover">
					<div className="info">
						<p className="project-client">{project.clientName}</p>
						<p className="project-name">{project.name[activeLanguage]}</p>
						<p className="project-year">{project.year}</p>
					</div>
				</Link>
			</article>
		);
	}
}

export default ProjectCard;