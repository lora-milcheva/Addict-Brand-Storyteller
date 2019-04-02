import React from 'react';

const IMAGES = ['slider_one_white.jpg', 'slider-three.jpg', 'slider-two.jpg'];

const SLIDE_TIME = 10000;
const FADE_OUT_TIME = 1000;
const FADE_IN_TIME = 500;

class Carousel extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			activeImage: IMAGES[0],
			intervalId: ''
		};

		this.image = React.createRef();
	}

	componentDidMount () {
		this.startTimer();
	}

	componentWillUnmount () {
		this.stopTimer();
	}

	startTimer = () => {
		let intervalId = setInterval(this.timer, SLIDE_TIME);
		this.setState({intervalId: intervalId});
	};

	stopTimer = () => {
		clearInterval(this.state.intervalId);
	};

	timer = (index) => {

		let imageHTML = this.image.current;

		let currentImageIndex = IMAGES.indexOf(this.state.activeImage);
		let nextImageIndex = index;

		if (nextImageIndex === undefined) {
			nextImageIndex = currentImageIndex + 1;

			if (nextImageIndex >= IMAGES.length) {
				nextImageIndex = 0;
			}
		}

		this.fadeOut(imageHTML);

		setTimeout(() => {
			this.setState({activeImage: IMAGES[nextImageIndex]}, () => this.fadeIn(imageHTML));
		}, FADE_OUT_TIME);
	};

	showImage = (imageIndex) => {
		this.stopTimer();
		this.timer(imageIndex);
		this.startTimer();
	};

	fadeOut = (el) => {
		window.requestAnimationFrame(function () {
			el.style.transition = 'opacity ' + FADE_OUT_TIME + 'ms';
			el.style.opacity = 0;
		});
	};

	fadeIn = (el) => {
		window.requestAnimationFrame(function () {
			el.style.transition = 'opacity ' + FADE_IN_TIME + 'ms';
			el.style.opacity = 1;
		});
	};

	render () {

		let previews = IMAGES.map((e, i) => {

			let style = 'slide-preview';

			if (IMAGES.indexOf(this.state.activeImage) === i) {
				style += ' selected';
			}
			return <span key={e}
			             className={style}
			             onClick={() => this.showImage(i)}
			             onMouseEnter={() => {
				             this.stopTimer();
				             this.showImage(i);
			             } }/>;
		});

		return (

			<section id="carousel">

				<figure className="img-container" ref={this.image}>
					<img className="img-fit"
					     src={'/images/carousel/' + this.state.activeImage}
					     alt=''/>
				</figure>

				<div className="carousel-navigation">
					{previews}
				</div>
			</section>
		);
	}
}

export default Carousel;