import React from 'react';
import PropTypes from 'prop-types';

// HOC
import AnimateOnScroll from '../../../../HOC/AnimateOnScroll';
import { USER_PAGES_TEXT } from '../../../../../../constants/constants';

class Cliche extends React.Component {

	render () {

		let {activeLanguage, project, client} = this.props;

		return (

			<div className='container section-padding-top'>


				<p className='project-name'>
					{USER_PAGES_TEXT.project[activeLanguage].project}{project.name[activeLanguage]}
				</p>


				{client !== '' && client !== undefined &&
				<p className='client'>{USER_PAGES_TEXT.project[activeLanguage].client}{client} </p>
				}


				<h2 className="cliche">
					<span className="field">{USER_PAGES_TEXT.project[activeLanguage].cliche}</span>
					{project.description[activeLanguage]}
				</h2>


			</div>

		);
	}
}

const WrappedComponent = AnimateOnScroll(Cliche);

export default WrappedComponent;

Cliche.propTypes = {
	activeLanguage: PropTypes.string,
	client: PropTypes.string,
	project: PropTypes.object,
};