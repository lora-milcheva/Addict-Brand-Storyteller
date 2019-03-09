import React from 'react';
import { Link } from 'react-router-dom';
import posed from 'react-pose';
import PropTypes from 'prop-types';

import { LanguageContext } from '../../common/languagesContext/LanguageContext';

const Card = posed.article({
	enter: {y: 0, opacity: 1},
	exit: {y: 50, opacity: 0}
});

class ProjectCard extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		let {project, category} = this.props;

		let activeLanguage = this.context.language;

		let pathLang = activeLanguage === 'en' ? '/' + activeLanguage : '';
		let linkPath = category
			? pathLang + '/projects/' + category + '/' + project._id
			: pathLang + '/projects/all/' + project._id;

		return (
			<Card className="project-card">
				<div className="img-container">
					<img className="img-fit" src={project.thumbnail} alt={project.name[activeLanguage]}/>
				</div>


				<Link to={linkPath} className="hover">
					<div className="info">
						{project.clientName && <p className="project-client">{project.clientName[activeLanguage]}</p>}
						<p className="project-name">{project.name[activeLanguage]}</p>
						<p className="project-year">{project.year}</p>
					</div>
				</Link>
			</Card>
		);
	}
}

ProjectCard.contextType = LanguageContext;

export default ProjectCard;

ProjectCard.propTypes = {
	project: PropTypes.object,
	activeLanguage: PropTypes.string,
	category: PropTypes.string
};