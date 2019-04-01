import React from 'react';

import { USER_PAGES_TEXT } from '../../../../constants/constants';

class Company extends React.Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
	}

	componentWillUnmount () {

	}

	render () {

		let lang = this.props.language;

		return (

			<section id="company" className="container section-padding">
				<h2 className="section-title ">Story - Telling & Experience</h2>
				<section className="about-us">
					<p>
						Addict е първата „storyteller” агенция в България.
					</p>
					<p>
						Ние обличаме в емоция всичко което правим, защото държим да докоснем сърцата на хората.
						Разказването на истории е в кръвта ни — затова на всеки проект гледаме като на предизвикателство
						да поднесем една нова, оригинална история. Ние създадаваме светове и изграждаме силни образи,
						които носят собствен дух и характер. Така именно в тях оставяме тази различност, толкова важна
						за да бъдат те запомнени и откроени.
					</p>
				</section>

				<section id="categories">
					<article className="category">
						<h3 className="category-name">{USER_PAGES_TEXT.company[lang].radio.name}</h3>
						<p className="category-text">{USER_PAGES_TEXT.company[lang].radio.text}</p>
					</article>

					<article className="category">
						<h3 className="category-name">{USER_PAGES_TEXT.company[lang].creative.name}</h3>
						<p className="category-text">{USER_PAGES_TEXT.company[lang].creative.text}</p>
					</article>

					<article className="category">
						<h3 className="category-name">{USER_PAGES_TEXT.company[lang].events.name}</h3>
						<p className="category-text">{USER_PAGES_TEXT.company[lang].events.text}</p>
					</article>
				</section>
			</section>
		);
	}
}

export default Company;