import React from 'react';
import PropTypes from 'prop-types';
import posed  from 'react-pose';

// Constants
import { USER_PAGES_TEXT } from '../../../../constants/constants';

// Utils
import UTILS from '../../../../utils/utils';

const ListContainer = posed.ul({
	enter: {staggerChildren: 50},
	exit: {staggerChildren: 20, staggerDirection: -1}
});

const Item = posed.li({
	enter: {y: 0, opacity: 1},
	exit: {y: 50, opacity: 0}
});

class PageHeader extends React.Component {

	render () {

		let {language, pageName} = this.props;

		let subtitle = UTILS.createMarkup(USER_PAGES_TEXT[pageName][language].subtitle);

		return (

			<ListContainer>
				<section className='banner container page-header'>

					<Item>
						<h1 className='page-title'
						    dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT[pageName][language].title)}/>
					</Item>


					<Item>
						{subtitle.__html &&
						<p className="subtitle"
						   dangerouslySetInnerHTML={subtitle}/>
						}
					</Item>

				</section>
			</ListContainer>
		);
	}
}

export default PageHeader;

PageHeader.propTypes = {
	language: PropTypes.string,
	pageName: PropTypes.string
};