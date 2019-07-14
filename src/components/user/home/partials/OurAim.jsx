import React from 'react';
import { Link } from 'react-router-dom';

// Partials
import SectionHeader from '../../common/headers/SectionHeader';

// Constants
import { BUTTONS } from '../../../../constants/constants';


class OurAim extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (

			<section id="our-aim" className="container section-padding-bottom">

				<SectionHeader pageName='home' language={activeLanguage} sectionName='ourAim'/>

				<Link className='btn btn-default' to='projects'>{BUTTONS[activeLanguage].seeWhatWeDo}</Link>

			</section>
		);
	}
}

export default OurAim;