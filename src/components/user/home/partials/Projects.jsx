import React from 'react';

// Partials
import HomeProjectCard from '../../common/HomeProjectCard';

function Projects (props) {

	let projects = props.projects;
	let lang = props.language;

	if (projects.length < 1) {
		return (<div className="lds-dual-ring"/>);
	}

	return (
		<section id="home-projects">

			{projects.map(e => <HomeProjectCard key={e._id} project={e} activeLanguage={lang}/>)}

		</section>
	);
}

export default Projects;