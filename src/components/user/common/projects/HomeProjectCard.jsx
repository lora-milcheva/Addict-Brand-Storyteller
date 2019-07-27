import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Constants
import {BUTTONS} from '../../../../constants/constants'

function HomeProjectCard (props) {

	let {project, activeLanguage, additionalClass} = props;

	if (project === undefined) {
		return <div className="lds-dual-ring"/>
	}


	let pathLang = activeLanguage === 'en' ? '/' + activeLanguage : '';
	let linkPath = pathLang + '/projects/' + project._id;

	let style = additionalClass ? "project-info " + additionalClass : "project-info"

	return (
		<section className='home-project'>

			<figure className="img-container">
				<img className="img-fit" src={project.largeThumbnail} alt={project.name[activeLanguage]}/>
			</figure>

			<div className={style}>
				<div>
					<p className='project-name'>{project.name[activeLanguage]}</p>
					<p className='cliche'>{project.description[activeLanguage]}</p>
				</div>
				<Link to={linkPath} className="btn btn-default-light">{BUTTONS[activeLanguage].seeProject}</Link>
			</div>
		</section>
	);

}

export default HomeProjectCard;

HomeProjectCard.propTypes = {
	project: PropTypes.object,
	activeLanguage: PropTypes.string,
	additionalClass: PropTypes.string
};