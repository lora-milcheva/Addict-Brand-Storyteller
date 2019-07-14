import React from 'react';
import { Link } from 'react-router-dom';

// Partials
import SectionHeader from '../../common/headers/SectionHeader';

// Constants
import { BUTTONS } from '../../../../constants/constants';



class AboutUs extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (

			<section id="home-about-us" className="container section-padding-top-bottom">

				<SectionHeader pageName='home' language={activeLanguage} sectionName='aboutUs'/>

				<Link className='btn btn-default' to='/about-us'>{BUTTONS[activeLanguage].readMore}</Link>

			</section>
		);
	}
}

export default AboutUs;