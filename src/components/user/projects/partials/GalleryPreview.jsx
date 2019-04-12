import React from 'react';
import ReactDOM from 'react-dom';

class GalleryPreview extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			image: this.props.image || '',

			allImages: this.props.allImages || []
		};

		this.image = React.createRef();
	}

	componentWillReceiveProps (nextProps) {
		this.setState({image: nextProps.image, allImages: nextProps.allImages});
	}

	showNextImage = () => {

		let allImages = this.state.allImages;

		let image = this.image.current;

		let currentImageIndex = 0;

		console.log(this.state.image.url)

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

		let isVisible = this.state.image !== '';

		return (
			<div className={isVisible ? 'image-preview visible' : 'image-preview'}>

				<figure className="image">
					<img src={this.state.image.url}
					     className="img-fit"
					     alt={this.state.image.url}
					     ref={this.image}/>
				</figure>



				<div className="gallery-navigation">
					<span className="gallery-navigation-button" onClick={this.showPrevImage}>
						<img id="prevBtn" src="/images/icons/arrow-left-white.svg" alt="previous"/>
					</span>
					<span className="gallery-navigation-button" onClick={this.showNextImage}>
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

export default GalleryPreview;