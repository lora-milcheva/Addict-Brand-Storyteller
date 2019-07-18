import React from 'react';
import PropTypes from 'prop-types';

// Partials
import ArticleSection from './ArticleSection';

class StoryArchetypes extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (
			<section id='story-archetypes' className='container'>

				<ArticleSection language={activeLanguage}
				                pageName='aboutUs'
				                sectionName='storyArchetypes'
				                subSectionName='theMonster'/>

				<ArticleSection language={activeLanguage}
				                pageName='aboutUs'
				                sectionName='storyArchetypes'
				                subSectionName='reborn'/>

				<ArticleSection language={activeLanguage}
				                pageName='aboutUs'
				                sectionName='storyArchetypes'
				                subSectionName='ragsToRiches'/>

				<ArticleSection language={activeLanguage}
				                pageName='aboutUs'
				                sectionName='storyArchetypes'
				                subSectionName='theQuest'/>

				<ArticleSection language={activeLanguage}
				                pageName='aboutUs'
				                sectionName='storyArchetypes'
				                subSectionName='tragedy'/>

				<ArticleSection language={activeLanguage}
				                pageName='aboutUs'
				                sectionName='storyArchetypes'
				                subSectionName='comedy'/>

				<ArticleSection language={activeLanguage}
				                pageName='aboutUs'
				                sectionName='storyArchetypes'
				                subSectionName='travel'/>
			</section>

		);
	}
}

export default StoryArchetypes;

StoryArchetypes.propTypes = {
	language: PropTypes.string
};