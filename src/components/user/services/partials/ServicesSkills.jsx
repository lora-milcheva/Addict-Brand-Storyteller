import React from 'react';
import PropTypes from 'prop-types';


// Partials
import SectionHeader from '../../common/headers/SectionHeader';
import ArticleList from '../../common/articlePartials/ArticleList'


class ServicesSkills extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (

			<section id='services-skills' className='container'>

				<SectionHeader pageName='services' language={activeLanguage} sectionName='skills'/>

				<section id='skills-description'>

					<ArticleList language={activeLanguage} pageName='services' sectionName='skills' subSectionName='strategy' />

					<ArticleList language={activeLanguage} pageName='services' sectionName='skills' subSectionName='design' />

					<ArticleList language={activeLanguage} pageName='services' sectionName='skills' subSectionName='marketing' />

					<ArticleList language={activeLanguage} pageName='services' sectionName='skills' subSectionName='production' />

				</section>

			</section>
		);
	}
}

export default ServicesSkills;

ServicesSkills.propTypes = {
	language: PropTypes.string
};