import React from 'react';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Constants
import { USER_PAGES_TEXT } from '../../../constants/constants';

// Utils
import UTILS from '../../../utils/utils';

class Services extends React.Component {


	render () {

		let activeLanguage = this.context.language;

		return (
			<div id="services" className='container-fluid'>

				<section className='banner container'>

					<h1 className='page-title'
					    dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.services[activeLanguage].title)}/>

					<p className='subtitle'
					   dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.services[activeLanguage].subtitle)}/>

				</section>

			</div>

		);
	}
}

Services.contextType = LanguageContext;

export default Services;