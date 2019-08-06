import React from 'react';
import PropTypes from 'prop-types';
import { USER_PAGES_TEXT } from '../../../../constants/constants';



class ProjectHeader extends React.Component {

	render () {

		let {activeLanguage, project, client} = this.props;

		return (

			<section id="project-header" className='container'>
				<p className='project-name'>Проектът: {project.name[activeLanguage]}</p>
				{client !== '' && <p className='client'>Възложителят: {client} </p>}
				<h2 className="cliche">
					<span className="field">{USER_PAGES_TEXT.project[activeLanguage].cliche}</span>
					{project.description[activeLanguage]}
				</h2>
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