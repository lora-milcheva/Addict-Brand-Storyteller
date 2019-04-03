import React from 'react';

// Constants
import { USER_PAGES_TEXT } from '../../../../constants/constants';

const SLIDES = ['slide1', 'slide2', 'slide3'];

const SLIDE_TIME = 10000;
const FADE_OUT_TIME = 1000;
const FADE_IN_TIME = 500;

class CarouselNew extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			activeSlide: SLIDES[0],
			intervalId: ''
		};

		this.image = React.createRef();
	}

	componentDidMount () {
		// this.startTimer();
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

		let currentImageIndex = SLIDES.indexOf(this.state.activeSlide);
		let nextImageIndex = index;

		if (nextImageIndex === undefined) {
			nextImageIndex = currentImageIndex + 1;

			if (nextImageIndex >= SLIDES.length) {
				nextImageIndex = 0;
			}
		}

		this.fadeOut(imageHTML);

		setTimeout(() => {
			this.setState({activeSlide: SLIDES[nextImageIndex]}, () => this.fadeIn(imageHTML));
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

		let lang = this.props.language;

		let slide = this.state.activeSlide;

		let previews = SLIDES.map((e, i) => {

			let style = 'slide-preview';

			if (SLIDES.indexOf(this.state.activeSlide) === i) {
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

			<section id="carousel-new" ref={this.image}>

				<figure className="img-container" >
					<img className="img-fit"
					     src={USER_PAGES_TEXT.carousel[lang][slide].image}
					     alt=''/>
				</figure>

				<div className="slide-content">
					<h1 className="slide-headline">{USER_PAGES_TEXT.carousel[lang][slide].sectionId}</h1>
					<p className="slide-text">{USER_PAGES_TEXT.carousel[lang][slide].text}</p>
				</div>

				<div className="carousel-navigation">
					{previews}
				</div>
			</section>
		);
	}
}

export default CarouselNew;