import React from 'react';

// Partials
import HomeProjectCard from '../../common/HomeProjectCard';

// Constants
import { USER_PAGES_TEXT } from '../../../../constants/constants';

function Projects (props) {

	let projects = props.projects;

	let lang = props.language;

	if (projects.length < 1) {
		return (<div className="lds-dual-ring"/> );
	}

	return (
		<section id="home-projects" className="container section-padding">
			<h2 className="section-title">{USER_PAGES_TEXT.home[lang].projects}</h2>
			{projects.map(e => <HomeProjectCard key={e._id} project={e}/>)}
		</section>
	);
}

export default Projects;