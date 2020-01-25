import React from 'react';
import { Link } from 'react-router-dom';
import { MENU } from '../../../../../constants/constants';

function ProjectCard (props) {

	let project = props.project;

	return (
		<Link to={'project-edit/' + project._id} >
			<article className="project-card">

				<figure className="img-container">
					<img className="img-fit" src={project.thumbnail} alt={project.name.bg}/>
				</figure>

				<p className="project-name">{project.name.bg}</p>

				<div className='labels'>
				{project.isStar &&
				<span className='star'>
					<i className="fa fa-star" aria-hidden="true"/>
				</span>
				}

				{project.isBlocked &&
				<span className='blocked'>
					<i className="fa fa-ban" aria-hidden="true"/>
				</span>
				}
				</div>

			</article>
		</Link>
	);

}

export default ProjectCard;