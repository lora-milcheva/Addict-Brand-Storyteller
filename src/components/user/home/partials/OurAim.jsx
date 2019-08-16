import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// HOC
import AnimateOnScroll from '../../HOC/AnimateOnScroll'

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

const WrappedComponent = AnimateOnScroll(OurAim, ['fadeIn', 200]);

export default WrappedComponent;


OurAim.propTypes = {
	language: PropTypes.string,
};