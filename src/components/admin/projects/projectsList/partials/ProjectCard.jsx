import React from 'react';
import { Link } from 'react-router-dom';

// Constants
import { BUTTONS } from '../../../../../constants/constants';

function ProjectCard (props) {

	let project = props.project;

	return (
		<article className="project-card">
			<figure className="img-container">
				<img className="img-fit" src={project.thumbnail}/>
			</figure>
			<p className="project-name">{project.name.bg}</p>

			<Link to={'project-edit/' + project._id} className="hover">
				<div className="edit-btn">
					<i className="fa fa-edit" aria-hidden="true"/>{BUTTONS.bg.edit}
				</div>
			</Link>
		</article>
	);

}

export default ProjectCard;