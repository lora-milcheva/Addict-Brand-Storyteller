import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

const AnimateOnScroll = (WrappedComponent, props) => {

	class HOC extends React.Component {

		render () {

			let type, delay, duration, animatePreScroll = props;

			return (
				<ScrollAnimation animateIn={type || 'fadeInUp'}
				                 delay={delay || 0}
				                 duration={duration || 1}
				                 animatePreScroll={animatePreScroll || true}
				                 animateOnce={true}>

					<WrappedComponent {...this.props} />

				</ScrollAnimation>
			);
		}
	}

	return HOC;
};

export default AnimateOnScroll;