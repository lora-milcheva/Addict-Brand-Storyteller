import React from 'react';
import PropTypes from 'prop-types';

// HOC
import AnimateOnScroll from '../../HOC/AnimateOnScroll';
import { USER_PAGES_TEXT } from '../../../../constants/constants';

class SectionImage extends React.Component {

	render () {

		let {image} = this.props;

		return (
			<figure className="img-container">
				<img className="img-fit" src={image} alt=''/>
			</figure>
		);
	}
}

const WrappedComponent = AnimateOnScroll(SectionImage, 'fadeIn', 200, 2);

SectionImage.propTypes = {
	image: PropTypes.string
};

export default WrappedComponent;

