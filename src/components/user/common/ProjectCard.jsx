import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Constants
import {BUTTONS} from '../../../constants/constants'

function ProjectCard (props) {

	let {project, category, activeLanguage} = props;


	let pathLang = activeLanguage === 'en' ? '/' + activeLanguage : '';
	let linkPath = category
		? pathLang + '/projects/' + project._id
		: pathLang + '/projects/' + project._id;

	return (
		<Link to={linkPath} className="project-card">

			<figure className="img-container">
				<img className="img-fit" src={project.thumbnail} alt={project.name[activeLanguage]}/>
			</figure>

			<div className="project-info">
				<div>
					<p className='project-name'>{project.name[activeLanguage]}&nbsp;&#8212;&nbsp;{project.year}</p>
					<p className='cliche'>{project.description[activeLanguage]}</p>
				</div>
				<button className="btn">{BUTTONS[activeLanguage].more}</button>
			</div>

		</Link>
	);

}

export default ProjectCard;

ProjectCard.propTypes = {
	project: PropTypes.object,
	activeLanguage: PropTypes.string,
	category: PropTypes.string
};