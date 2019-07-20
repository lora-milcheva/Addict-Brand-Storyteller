import React from 'react';
import { Link } from 'react-router-dom';


function ProjectCard (props) {

	let project = props.project;

	return (
		<Link to={'project-edit/' + project._id}>
			<article className="project-card">

				<figure className="img-container">
					<img className="img-fit" src={project.thumbnail}/>
				</figure>
				<p className="project-name">{project.name.bg}</p>

				{project.isStar &&
				<span className='star'>
				<i className="fa fa-star" aria-hidden="true"/>
			</span>}


			</article>
		</Link>
	);

}

export default ProjectCard;