import React from 'react';

// Partials
import SectionHeader from '../../common/headers/SectionHeader';
import Article from '../../common/articlePartials/Article';

class OurPhilosophy extends React.Component {


	render () {

		let activeLanguage = this.props.language;

		return (

			<section id="our-philosophy" className="container section-padding-top-bottom">

				<SectionHeader language={activeLanguage}
				               pageName='home'
				               sectionName='ourPhilosophy'
				               showSectionName={true}/>

				<section id='sections'>

					<Article language={activeLanguage}
					         pageName='home'
					         sectionName='ourPhilosophy'
					         subSectionName='sections'
					         subSubSectionName='creativity'/>

					<Article language={activeLanguage}
					         pageName='home'
					         sectionName='ourPhilosophy'
					         subSectionName='sections'
					         subSubSectionName='strategy'/>

					<Article language={activeLanguage}
					         pageName='home'
					         sectionName='ourPhilosophy'
					         subSectionName='sections'
					         subSubSectionName='system'/>

					<Article language={activeLanguage}
					         pageName='home'
					         sectionName='ourPhilosophy'
					         subSectionName='sections'
					         subSubSectionName='experience'/>

				</section>

			</section>
		);
	}
}

export default OurPhilosophy;