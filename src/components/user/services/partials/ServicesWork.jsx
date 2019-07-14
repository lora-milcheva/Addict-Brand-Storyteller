import React from 'react';
import PropTypes from 'prop-types';


// Partials
import SectionHeader from '../../common/headers/SectionHeader';
import RandomProjects from '../../common/projects/RandomProjects';


class ServicesWork extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (

			<section id='services-work' className=''>
				<SectionHeader pageName='services' language={activeLanguage} sectionName='work'/>
				<RandomProjects language={activeLanguage}/>
			</section>
		);
	}
}

export default ServicesWork;

ServicesWork.propTypes = {
	language: PropTypes.string
};