import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// HOC
import AnimateOnScroll from '../../HOC/AnimateOnScroll'

// Partials
import SectionHeader from '../../common/headers/SectionHeader';

// Constants
import { BUTTONS } from '../../../../constants/constants';

class AboutUs extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (

			<section id="home-about-us" className="container section-padding-top-bottom">

				<SectionHeader language={activeLanguage}
				               pageName='home'
				               sectionName='aboutUs'
				               showSectionName={true}/>

				<Link className='btn btn-default' to='/about-us' aria-label={BUTTONS[activeLanguage].readMore}>{BUTTONS[activeLanguage].readMore}</Link>

			</section>
		);
	}
}

const WrappedComponent = AnimateOnScroll(AboutUs);

export default WrappedComponent;

AboutUs.propTypes = {
	language: PropTypes.string,
};