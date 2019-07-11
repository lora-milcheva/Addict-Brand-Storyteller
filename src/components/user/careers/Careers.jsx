import React from 'react';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Constants
import { USER_PAGES_TEXT } from '../../../constants/constants';

// Utils
import UTILS from '../../../utils/utils';


class Careers extends React.Component {

	render () {

		let activeLanguage = this.context.language;

		return (
			<div id="careers" className='container-fluid'>

				<section className='banner container'>

					<h1 className='page-title'
					    dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.careers[activeLanguage].title)}/>

					<p className='subtitle'
					   dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.careers[activeLanguage].subtitle)}/>
				</section>

			</div>

		);
	}
}

Careers.contextType = LanguageContext;

export default Careers;