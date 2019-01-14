import React from 'react';
import {Link} from 'react-router-dom';

// Constants
import { BUTTONS } from '../../../../../constants/constants';


class ProjectCard extends React.Component {
	constructor (props) {
		super(props);
	}


	render () {

		let project = this.props.project;

		return (
			<article className="project-card">
				<figure className="img-container">
					<img className="img-fit" src={project.thumbnail}/>
				</figure>
				<p className="project-name">{project.name.BG}</p>

				<Link to={'project-edit/' + project._id} className="hover">
					<div className="edit-btn">
						<i className="fa fa-edit" aria-hidden="true"/>{BUTTONS.BG.edit}
					</div>
				</Link>
			</article>
		);
	}
}

export default ProjectCard;