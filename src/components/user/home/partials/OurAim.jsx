import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Partials
import SectionHeader from '../../common/headers/SectionHeader';

// Constants
import { BUTTONS } from '../../../../constants/constants';


class OurAim extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (

			<section id="our-aim" className="container section-padding-top-bottom">

				<SectionHeader language={activeLanguage}
				               pageName='home'
				               sectionName='ourAim'
				               showSectionName={false}/>

				<Link className='btn btn-default' to='/projects'>{BUTTONS[activeLanguage].seeWhatWeDo}</Link>

			</section>
		);
	}
}

export default OurAim;


OurAim.propTypes = {
	language: PropTypes.string,
};