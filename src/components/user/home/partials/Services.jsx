import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// HOC
import AnimateOnScroll from '../../HOC/AnimateOnScroll';

// Partials
import SectionHeader from '../../common/headers/SectionHeader';

// Constants
import { BUTTONS } from '../../../../constants/constants';



class Services extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (

			<section id="home-services" className="container section-padding-top-bottom">

				<SectionHeader language={activeLanguage}
				               pageName='home'
				               sectionName='services'
				               showSectionName={true}/>

				<Link className='btn btn-default' to='/services' aria-label={BUTTONS[activeLanguage].readMore}>{BUTTONS[activeLanguage].readMore}</Link>

			</section>
		);
	}
}

const WrappedComponent = AnimateOnScroll(Services);

export default WrappedComponent;

Services.propTypes = {
	language: PropTypes.string,
};