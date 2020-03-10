import React from 'react';
import PropTypes from 'prop-types';

// Partials
import Cliche from './partials/Cliche';
import ProjectCover from './partials/ProjectCover';


// Utils
import UTILS from '../../../../../utils/utils';

class ProjectHeader extends React.Component {

	render () {

		let {activeLanguage, project, client} = this.props;

		let imageUrl = UTILS.generateUrl(project.projectFolder, project.cover);

		return (

			<section id="project-header">

				<ProjectCover image={imageUrl}/>

				<Cliche activeLanguage={activeLanguage} project={project} client={client}/>

			</section>
		);
	}
}

export default ProjectHeader;

ProjectHeader.propTypes = {
	activeLanguage: PropTypes.string,
	project: PropTypes.object,
	client: PropTypes.string,
};