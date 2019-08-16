import React from 'react';
import PropTypes from 'prop-types';

// Partials
import HomeProjectCard from '../../common/projects/HomeProjectCard';


class AccentProject extends React.Component {

	render () {

		let activeLanguage = this.props.language;
		let project = this.props.project;

		if (project === undefined) {
			return <div className={'loader'}/>
		}

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