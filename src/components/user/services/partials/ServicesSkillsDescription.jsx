import React from 'react';
import PropTypes from 'prop-types';

// HOC
import AnimateOnScroll from '../../HOC/AnimateOnScroll';

// Partials
import ArticleList from '../../common/articlePartials/ArticleList'


class ServicesSkillsDescription extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (
				<section id='skills-description'>

					<ArticleList language={activeLanguage} pageName='services' sectionName='skills' subSectionName='strategy' />

					<ArticleList language={activeLanguage} pageName='services' sectionName='skills' subSectionName='design' />

					<ArticleList language={activeLanguage} pageName='services' sectionName='skills' subSectionName='marketing' />

					<ArticleList language={activeLanguage} pageName='services' sectionName='skills' subSectionName='production' />

				</section>
		);
	}
}

const WrappedComponent = AnimateOnScroll(ServicesSkillsDescription, 'fadeIn', 200, 2);

export default WrappedComponent;

ServicesSkillsDescription.propTypes = {
	language: PropTypes.string
};