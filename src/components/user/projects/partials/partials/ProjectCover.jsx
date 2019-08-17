import React from 'react';
import PropTypes from 'prop-types';

// HOC
import AnimateOnScroll from '../../../HOC/AnimateOnScroll';

class ProjectCover extends React.Component {

	render () {

		let {image} = this.props;

		return (

			<figure className="img-container">
				<img src={image} className='img-fit' alt='page cover'/>
			</figure>

		);
	}
}

const WrappedComponent = AnimateOnScroll(ProjectCover, 'fadeIn', 200, 2);

export default WrappedComponent;

ProjectCover.propTypes = {
	image: PropTypes.string
};