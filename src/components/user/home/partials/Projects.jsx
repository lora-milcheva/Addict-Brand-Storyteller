import React from 'react';
import PropTypes from 'prop-types';

// Partials
import HomeProjectCard from '../../common/projects/HomeProjectCard';

function Projects (props) {

	let projects = props.projects;
	let lang = props.language;

	if (projects.length < 1) {
		return (<div className="lds-dual-ring"/>);
	}

	return (
		<section id="home-projects">

			{projects.map((e, i) => <HomeProjectCard key={e._id} project={e} activeLanguage={lang} additionalClass={i % 2 === 0 ? 'left' : 'right'}/>)}

		</section>
	);
}

export default Projects;

Projects.propTypes = {
	language: PropTypes.string,
	projects: PropTypes.array
};

