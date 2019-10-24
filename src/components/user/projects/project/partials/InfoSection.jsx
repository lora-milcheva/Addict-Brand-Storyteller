import React from 'react';
import PropTypes from 'prop-types';

// HOC
import AnimateOnScroll from '../../../HOC/AnimateOnScroll';

// Partials
import SectionImage from '../../../common/images/SectionImage';
import SectionText from './partials/SectionText'

class InfoSection extends React.Component {

	render () {

		let {image, sectionName, sectionText} = this.props;

		return (

			<section>
				{image !== '' &&
				<SectionImage image={image}/>
				}

				<SectionText sectionName={sectionName} sectionText={sectionText} />
			</section>
		);
	}
}

const WrappedComponent = AnimateOnScroll(InfoSection, 'fadeIn', 200, 2);

export default WrappedComponent;

InfoSection.propTypes = {
	image: PropTypes.string,
	sectionName: PropTypes.string,
	sectionText: PropTypes.string,
};