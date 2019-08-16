import React from 'react';
import PropTypes from 'prop-types';

// HOC
import AnimateOnScroll from '../../HOC/AnimateOnScroll';

// Partials
import SectionHeader from '../../common/headers/SectionHeader';
import RandomProjects from '../../common/projects/RandomProjects';

class ServicesWork extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (

			<section id='services-work' className='section-padding-top-bottom bg-light'>
				<SectionHeader language={activeLanguage}
				               pageName='services'
				               sectionName='work'
				               showSectionName={false}/>
				<RandomProjects language={activeLanguage}/>
			</section>
		);
	}
}

const WrappedComponent = AnimateOnScroll(ServicesWork);

export default WrappedComponent;

ServicesWork.propTypes = {
	language: PropTypes.string
};