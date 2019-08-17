import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

const AnimateOnScroll = (WrappedComponent, type, delay, duration, animatePreScroll) => {

	class HOC extends React.Component {

		render () {

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