import React from 'react';

import { USER_PAGES_TEXT } from '../../../../constants/constants';

class OurPhilosophy extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (

			<section id="our-philosophy" className="container section-padding-top-bottom">

				<h4 className='section-name'>{USER_PAGES_TEXT.home[activeLanguage].sections.ourPhilosophy.name}</h4>

				<h2 className="section-title">{USER_PAGES_TEXT.home[activeLanguage].sections.ourPhilosophy.title}</h2>

				<section id='sections'>
					<article>
						<h4 className='title'>{USER_PAGES_TEXT.home[activeLanguage].sections.ourPhilosophy.sections.creativity.name}</h4>
						<p className='text'>{USER_PAGES_TEXT.home[activeLanguage].sections.ourPhilosophy.sections.creativity.text}</p>
					</article>

					<article>
						<h4 className='title'>{USER_PAGES_TEXT.home[activeLanguage].sections.ourPhilosophy.sections.strategy.name}</h4>
						<p className='text'>{USER_PAGES_TEXT.home[activeLanguage].sections.ourPhilosophy.sections.strategy.text}</p>
					</article>

					<article>
						<h4 className='title'>{USER_PAGES_TEXT.home[activeLanguage].sections.ourPhilosophy.sections.system.name}</h4>
						<p className='text'>{USER_PAGES_TEXT.home[activeLanguage].sections.ourPhilosophy.sections.system.text}</p>
					</article>

					<article>
						<h4 className='title'>{USER_PAGES_TEXT.home[activeLanguage].sections.ourPhilosophy.sections.experience.name}</h4>
						<p className='text'>{USER_PAGES_TEXT.home[activeLanguage].sections.ourPhilosophy.sections.experience.text}</p>
					</article>
				</section>

			</section>
		);
	}
}

export default OurPhilosophy;