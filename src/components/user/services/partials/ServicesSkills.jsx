import React from 'react';
import PropTypes from 'prop-types';


// Partials
import SectionHeader from '../../common/headers/SectionHeader';
import ServicesSkillsDescription from './ServicesSkillsDescription'



class ServicesSkills extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (

			<section id='services-skills' className='container section-padding-top-bottom'>

				<SectionHeader language={activeLanguage} pageName='services' sectionName='skills' showSectionName={true}/>

				<ServicesSkillsDescription language={activeLanguage}/>

			</section>
		);
	}
}


export default ServicesSkills;

ServicesSkills.propTypes = {
	language: PropTypes.string
};