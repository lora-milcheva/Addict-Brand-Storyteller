import React from 'react';
import PropTypes from 'prop-types';

// Partials
import InfoSection from './InfoSection';


// Utils
import UTILS from '../../../../../utils/utils';


class ProjectInfo extends React.Component {

	render () {

		let {activeLanguage, project, sections} = this.props;

		let info;

		if (project.info.length > 0) {

			info = project.info.map(s => {

                let sectionName = sections[s.sectionId][activeLanguage];
				let sectionText = s.text[activeLanguage];
                let imageUrl = '';

				if (s.image) {
					imageUrl = UTILS.generateUrl(project.projectFolder, s.image);
				}

				return (
					<InfoSection key={s.sectionId}
					             image={imageUrl}
					             sectionName={sectionName}
					             sectionText={sectionText}/>
				);
			});
		}

		return (
			<section id="project-info">
				{info}
			</section>
		);
	}
}

export default ProjectInfo;

ProjectInfo.propTypes = {
	activeLanguage: PropTypes.string,
	project: PropTypes.object,
	sections: PropTypes.object
};