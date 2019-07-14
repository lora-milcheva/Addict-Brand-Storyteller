import React from 'react';
import { Link } from 'react-router-dom';


// Partials
import SectionHeader from '../../common/headers/SectionHeader';

// Constants
import { BUTTONS } from '../../../../constants/constants';

class Services extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (

			<section id="home-services" className="container section-padding-top-bottom">

				<SectionHeader pageName='home' language={activeLanguage} sectionName='services'/>

				<Link className='btn btn-default' to='/services'>{BUTTONS[activeLanguage].readMore}</Link>

			</section>
		);
	}
}

export default Services;