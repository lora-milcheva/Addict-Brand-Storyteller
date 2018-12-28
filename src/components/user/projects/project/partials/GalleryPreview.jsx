import React from 'react';
import ReactDOM from 'react-dom';

class GalleryPreview extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			image: '',

			allImages: []
		};

		this.image = React.createRef();
	}

	componentDidMount () {
		this.setState({
			image: this.props.image,
			allImages: this.props.allImages
		});
	}

	componentWillReceiveProps (nextProps) {
		this.setState({image: nextProps.image});
	}


	showNextImage = () => {

		let allImages = this.state.allImages;

		let image = this.image.current;

		let nextImageIndex = allImages.indexOf(this.state.image) + 1;
		if (nextImageIndex === allImages.length) {
			nextImageIndex = 0;
		}

		this.fadeOut(image);

		setTimeout(() => {
			this.setState({ image: this.state.allImages[nextImageIndex]});
			this.fadeIn(image)
		}, 600);

	};


	showPrevImage = () => {
		let allImages = this.state.allImages;

		let image = this.image.current;

		let prevImageIndex = allImages.indexOf(this.state.image) - 1;
		if (prevImageIndex < 0) {
			prevImageIndex = allImages.length - 1;
		}

		this.fadeOut(image);

		setTimeout(() => {
			this.setState({image: this.state.allImages[prevImageIndex]});
			this.fadeIn(image)
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
				<button className="close-btn" onClick={this.props.onClose}>close</button>
				<div className="gallery-navigation">
					<span className="gallery-navigation-button" onClick={this.showPrevImage}>prev</span>
					<span className="gallery-navigation-button" onClick={this.showNextImage}>next</span>
				</div>
				<figure className="image">
					<img src={this.state.image}
					     className="img-fit"
					     alt={this.state.image}
					     ref={this.image}/>
				</figure>
			</div>
		);
	}
}

export default GalleryPreview;