import React from 'react';
import PropTypes from 'prop-types';

// Utils
import UTILS from "../../../../../utils/utils";

class ImagePreview extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			image: this.props.image,

			allImages: this.props.allImages,

			touchStartPosition: 0,
			touchEndPosition: 0
		};

		this.image = React.createRef();
	}

	componentDidMount () {

		document.addEventListener('keydown', this.handleKeyPress);
	}

	componentWillUnmount () {
		document.removeEventListener('keydown', this.handleKeyPress);
	}

	handleKeyPress = (e) => {

		if (e.key === 'ArrowLeft') this.showPrevImage();

		if (e.key === 'ArrowRight') this.showNextImage();

		if (e.key === 'Escape') this.props.onClose();
	};

	// componentWillReceiveProps (nextProps, nextContext) {
	//
	// 	let direction = nextProps.direction;
	//
	// 	if (direction === 'left') this.showPrevImage();
	//
	// 	if (direction === 'right') this.showNextImage();
	//
	// 	if (direction === '') this.props.onClose();
	// }

	showNextImage = () => {

		let allImages = this.state.allImages;

		let image = this.image.current;

		let currentImageIndex = 0;

		allImages.forEach((e, i) => {
			if (e.url === this.state.image.url) currentImageIndex = (i);
		});

		let nextImageIndex = currentImageIndex + 1;
		if (nextImageIndex === allImages.length) {
			// nextImageIndex = 0;
			this.props.onClose();
			return;
		}

		this.fadeOut(image);

		setTimeout(() => {
			this.setState({image: this.state.allImages[nextImageIndex]});
			this.fadeIn(image);
		}, 600);

	};

	showPrevImage = () => {
		let allImages = this.state.allImages;

		let image = this.image.current;

		let currentImageIndex = 0;

		allImages.forEach((e, i) => {
			if (e.url === this.state.image.url) currentImageIndex = (i);
		});

		let prevImageIndex = currentImageIndex - 1;
		if (prevImageIndex < 0) {
			// prevImageIndex = allImages.length - 1;
			this.props.onClose();
			return;
		}

		this.fadeOut(image);

		setTimeout(() => {
			this.setState({image: this.state.allImages[prevImageIndex]});
			this.fadeIn(image);
		}, 600);
	};

	fadeOut = (el) => {
		window.requestAnimationFrame(function () {
			el.style.transition = 'opacity 400ms';
			el.style.opacity = 0;
		});
	};

	fadeIn = (el) => {
		window.requestAnimationFrame(function () {
			el.style.transition = 'opacity 1200ms';
			el.style.opacity = 1;
		});
	};

	onTouchStart = (e) => {

		let touchStart = e.changedTouches[0].clientX;

		this.setState({touchStartPosition: touchStart});

	};

	onTouchEnd = (e) => {

		let touchEnd = e.changedTouches[0].clientX;

		this.setState({touchEndPosition: touchEnd}, () => {

			let startPosition = this.state.touchStartPosition;
			let endPosition = this.state.touchEndPosition;

			if (startPosition >= endPosition) {
				this.showNextImage();
			} else {
				this.showPrevImage();
			}
		});

	};

	render () {

		let imageUrl = UTILS.generateUrl(this.props.projectFolder, this.state.image.url);

		return (
			<div id='image-preview' onTouchEnd={this.onTouchEnd} onTouchStart={this.onTouchStart}>

				<figure className="image">
					<img src={imageUrl}
					     className="img-fit"
					     alt={this.state.image.url}
					     ref={this.image}/>
				</figure>

				<div className="gallery-navigation">
					<button className={'btn btn-default-light md'}
					        aria-label={'Show previous image'}
					        onClick={this.showPrevImage}>
						<i className="fa fa-arrow-left" aria-hidden="true"/>
					</button>
					<button className={'btn btn-default-light md'}
					        aria-label={'Show next image'}
					        onClick={this.showNextImage}>
						<i className="fa fa-arrow-right" aria-hidden="true"/>
					</button>
				</div>

				<button id='close-btn' className="btn btn-default-light md" aria-label={'Close'} onClick={this.props.onClose}>
					<i className="fa fa-times" aria-hidden="true"/>
				</button>
			</div>
		);
	}
}

export default ImagePreview;

ImagePreview.propTypes = {
	image: PropTypes.object,
	projectFolder: PropTypes.string,
	allImages: PropTypes.array,
	activeLanguage: PropTypes.string,
	onClose: PropTypes.func,
	// direction: PropTypes.string
};