import React from 'react';
import { Link } from 'react-router-dom';

import { BUTTONS } from '../../../../constants/constants';
import HomeProjectCard from '../../common/projects/HomeProjectCard';
import PropTypes from 'prop-types';
import Article from '../../common/articlePartials/Article';


class AccentProject extends React.Component {

	render () {

		let activeLanguage = this.props.language;
		let project = this.props.project;

		if (project === undefined) {
			return <div className={'loader'}/>
		}

		let pathLang = activeLanguage === 'en' ? '/' + activeLanguage : '';
		let linkPath = pathLang + '/projects/' + project._id;

		return (

			<HomeProjectCard project={project} activeLanguage={activeLanguage}/>
		);
	}
}

export default AccentProject;

AccentProject.propTypes = {
	language: PropTypes.string,
	pageName: PropTypes.string,
	sectionName: PropTypes.string,
	subSectionName: PropTypes.string,
	subSubSectionName: PropTypes.string
};