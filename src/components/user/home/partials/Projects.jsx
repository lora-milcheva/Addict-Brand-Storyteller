import React from 'react';

// Partials
import ProjectCard from '../../common/ProjectCard';

// Constants
import { USER_PAGES_TEXT } from '../../../../constants/constants';

function Projects (props) {

	let projects = props.projects;
	let lang = props.language;

	if (projects.length < 1) {
		return (<div className="lds-dual-ring"/> );
	}

	return (
		<section id="home-projects" className="container section-padding-top-bottom">
			<div className="projects-container">
				{projects.map(e => <ProjectCard key={e._id} project={e} activeLanguage={lang}/>)}
			</div>
		</section>
	);
}

export default Projects;