import React from 'react';
import PropTypes, { object } from 'prop-types';

class ImagePreview extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			image: this.props.image,

			allImages: this.props.allImages
		};

		this.image = React.createRef();
	}

	componentWillUnmount () {
		document.removeEventListener('keydown', this.handleKeyPress);
	}

	componentWillReceiveProps (nextProps) {

		if (Object.keys(nextProps.image).length > 0) {
			document.addEventListener('keydown', this.handleKeyPress);
		}

		this.setState({image: nextProps.image, allImages: nextProps.allImages});
	}

	handleKeyPress = (e) => {

		console.log(e)

		if (e.key === 'ArrowLeft') this.showPrevImage();

		if (e.key === 'ArrowRight') this.showNextImage();

		if (e.key === 'Escape') {
			document.removeEventListener('keydown', this.handleKeyPress);
			this.props.onClose();
		}
	};

	showNextImage = () => {

		let allImages = this.state.allImages;

		let image = this.image.current;

		let currentImageIndex = 0;

		allImages.forEach((e, i) => {
			if (e.url === this.state.image.url) currentImageIndex = (i);
		});

		let nextImageIndex = currentImageIndex + 1;
		if (nextImageIndex === allImages.length) {
			nextImageIndex = 0;
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
			prevImageIndex = allImages.length - 1;
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

	render () {

		let isVisible = Object.keys(this.state.image).length > 0;

		let lang = this.props.activeLanguage;

		return (
			<div id='image-preview' className={isVisible ? 'visible' : ''}>

				<div className='gallery'>
					<figure className="image">
						<img src={this.state.image.url}
						     className="img-fit"
						     alt={this.state.image.url}
						     ref={this.image}/>
					</figure>

					{/*{this.state.image.Headline && this.state.image.Content &&*/}
					{/*<div className='content'>*/}
					{/*	<h4 dangerouslySetInnerHTML={{__html: this.state.image.Headline[lang]}}/>*/}
					{/*	<p dangerouslySetInnerHTML={{__html: this.state.image.Content[lang]}}/>*/}
					{/*</div>*/}
					{/*}*/}
				</div>


				<div className="gallery-navigation">
					<span className="gallery-navigation-button"
					      onClick={this.showPrevImage}>

						<img id="prevBtn" src="/images/icons/arrow-left-white.svg" alt="previous"/>
					</span>
					<span className="gallery-navigation-button"
					      onClick={this.showNextImage}>
						<img id="nextBtn" src="/images/icons/arrow-right-white.svg" alt="next"/>
					</span>
				</div>

				<button className="close-btn" onClick={this.props.onClose}>
					<img src="/images/icons/close-btn-white.svg" alt="close preview"/>
				</button>
			</div>
		);
	}
}

export default ImagePreview;

ImagePreview.propTypes = {
	image: PropTypes.object,
	allImages: PropTypes.array,
	activeLanguage: PropTypes.string,
	onClose: PropTypes.func
};