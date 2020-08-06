import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// HOC
import AnimateOnScroll from '../../HOC/AnimateOnScroll'


// Constants
import { BUTTONS } from '../../../../constants/constants';

// Utils
import UTILS from "../../../../utils/utils";

function HomeProjectCard (props) {

	let {project, activeLanguage, additionalClass} = props;

	if (project === undefined) {
		return <div className="lds-dual-ring"/>;
	}

	let pathLang = activeLanguage === 'en' ? '/' + activeLanguage : '';

	let style = additionalClass ? 'project-info ' + additionalClass : 'project-info';

	let imageUrl = UTILS.generateUrl(project.projectFolder, project.largeThumbnail);

	return (
		<section className='home-project'>

			<figure className="img-container">
				<img className="img-fit" src={imageUrl} alt={project.name[activeLanguage]}/>
			</figure>

			<div className={style}>
				<div>
					<p className='project-name'>{project.name[activeLanguage]}</p>
					<p className='cliche'>{project.description[activeLanguage]}</p>
				</div>
				<Link to={pathLang + '/projects/' + project.url}
				      aria-label={BUTTONS[activeLanguage].seeProject}
				      className="btn btn-default-light">{BUTTONS[activeLanguage].seeProject}</Link>
			</div>
		</section>
	);

}

const WrappedComponent = AnimateOnScroll(HomeProjectCard, 'fadeIn', 0, 2);

export default WrappedComponent;

HomeProjectCard.propTypes = {
	project: PropTypes.object,
	activeLanguage: PropTypes.string,
	additionalClass: PropTypes.string
};