import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { LanguageContext } from '../../common/languagesContext/LanguageContext';

class ProjectCard extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		let {project, category} = this.props;


		let activeLanguage = this.context.language
		console.log(activeLanguage)

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
						<p className="project-client">{project.clientName[activeLanguage]}</p>
						<p className="project-name">{project.name[activeLanguage]}</p>
						<p className="project-year">{project.year}</p>
					</div>
				</Link>
			</article>
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