import React from 'react';
import PropTypes from 'prop-types';
import { USER_PAGES_TEXT } from '../../../../constants/constants';
import InfoSection from './partials/InfoSection';



class ProjectInfo extends React.Component {

	render () {

		let {activeLanguage, project, sections} = this.props;

		let info;

		if (Object.keys(project.info)) {

			info = Object.keys(project.info).map(e => {

				let sectionText = project.info[e][activeLanguage];
				let image = project.info[e].image;
				let sectionName = sections.filter(s => s._id === e)[0].name[activeLanguage];

				return (
					<InfoSection key={e}
					             image={image}
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
	sections: PropTypes.array
};