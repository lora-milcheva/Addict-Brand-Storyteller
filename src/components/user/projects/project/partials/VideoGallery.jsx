import React from 'react';
import PropTypes from 'prop-types';
import UTILS from "../../../../../utils/utils";

class VideoGallery extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			translateValue: 0,
			step: 0,
			imageIndex: 0,
			volume: .5
		};

		this.container = React.createRef();
	}

	componentDidMount () {
		this.setVolumeOnPlayers();
		window.addEventListener('resize', this.moveGalleryToStart);
	}

	componentWillReceiveProps (nextProps, nextContext) {

		let direction = nextProps.direction;

		if (direction) {
			this.moveCarousel(direction);
		}
	}

	componentWillUnmount () {
		window.removeEventListener('resize', this.moveGalleryToStart);
	}

	moveGalleryToStart = () => {

		if (window.innerWidth <= 768 && this.state.imageIndex > 0) {

			let container = this.container.current;

			this.setState({
				translateValue: 0,
				imageIndex: 0
			}, () => {
				window.requestAnimationFrame(function () {
					container.style.transform = `translateX(-${0}px)`;
					container.style.transition = '.6s ease-out';
				});
			});
		}

		this.props.changeState('');
	};

	moveCarousel = (direction) => {

		this.getCurrentImageWidth(direction, () => {

			let container = this.container.current;

			let step = this.state.step;
			let translateValue = this.state.translateValue;
			let translateMaxValue = container.scrollWidth;

			let nextImageIndex;

			if (direction === 'left') {

				if (translateValue <= 0) return;

				translateValue -= step;

				if (translateValue < 0) translateValue = 0; // fix bug if value goes negative

				nextImageIndex = this.state.imageIndex - 1;

			} else {

				translateValue = this.state.translateValue + step;

				if (translateValue > translateMaxValue - step + 20) return;

				nextImageIndex = this.state.imageIndex + 1;
			}

			this.setState({
				translateValue,
				imageIndex: nextImageIndex
			}, () => {
				window.requestAnimationFrame(function () {
					container.style.transform = `translateX(-${translateValue}px)`;
					container.style.transition = '.6s ease-out';
				});
			});
		});
	};

	getCurrentImageWidth = (direction, callback) => {

		let index = this.state.imageIndex;

		if (direction === 'left' && index > 0) index -= 1;

		let el = 'video' + index;

		// Get parent width with included padding
		let currentImageWidth = this[el].current.parentNode.clientWidth;

		this.setState({step: currentImageWidth}, () => callback());
	};

	setVolumeOnPlayers = () => {

		for (let i = 0; i < this.props.videos.length; i++) {

			let name = 'video' + i;
			let video = this[name].current;
			video.volume = this.state.volume;

			video.onvolumechange = (e) => {this.saveVolumeValue(e);};
		}
	};

	saveVolumeValue = (e) => {
		let newVolume = e.target.volume;
		this.setState({volume: newVolume});

		this.changeVolume();
	};

	changeVolume = () => {
		for (let i = 0; i < this.props.videos.length; i++) {

			let name = 'video' + i;
			let video = this[name].current;
			video.volume = this.state.volume;
		}
	};

	stopOtherVideos = (e) => {

		let videoName = e.target.getAttribute('data-target-name');

		for (let i = 0; i < this.props.videos.length; i++) {

			let name = 'video' + i;

			if (name === videoName) continue;

			let video = this[name].current;

			if (!video.paused) video.pause();
		}
	};

	render () {

		let lang = this.props.language;

		let videos = this.props.videos.map((video, i) => {

			let info;

			if (video.info && video.info.length > 0) {

				info = video.info.map(vObject => {
					return (
						<div key={video.url + vObject.sectionId} className='section'>
							<p className='section-name'>{this.props.sections[vObject.sectionId][lang]}</p>
							{/*<p className='section-text' dangerouslySetInnerHTML={{__html: video.info[vObject][lang]}}/>*/}
							<p className='section-text'>{vObject.text[lang]}</p>
						</div>
					);
				});
			}

			let name = 'video' + i;

			this[name] = React.createRef();

			let videoUrl = UTILS.generateUrl(this.props.projectFolder, video.url);
			let posterUrl = UTILS.generateUrl(this.props.projectFolder, video.poster);

			return (
				<div key={videoUrl} className='video-container'>

					<video poster={posterUrl}
					       data-target-name={name}
					       className='video'
					       controls
					       controlsList="nodownload"
					       onPlay={this.stopOtherVideos}
					       ref={this[name]}>
						<source src={videoUrl} type="video/mp4"/>
					</video>

					<div className='video-info'>
						{info}
					</div>
				</div>
			);

		});

		return (
				<div id="project-video-gallery" className='section-padding-top-bottom'>


				<div id='video-gallery' ref={this.container}>
					{videos}
				</div>


				<div className="gallery-navigation">
					<div className="gallery-navigation">
						<button
							className={this.state.imageIndex === 0 ? 'btn btn-default md disabled' : 'btn btn-default md'}
							aria-label={'Move left'}
							onClick={() => this.moveCarousel('left')}>
							<i className="fa fa-arrow-left" aria-hidden="true"/>
						</button>
						<button
							className={this.state.imageIndex === (this.props.videos.length - 1) ? 'btn btn-default md disabled' : 'btn btn-default md'}
							aria-label={'Move right'}
							onClick={() => this.moveCarousel('right')}>
							<i className="fa fa-arrow-right" aria-hidden="true"/>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default VideoGallery;

VideoGallery.propTypes = {
	videos: PropTypes.array,
	projectFolder: PropTypes.string,
	language: PropTypes.string,
	sections: PropTypes.object,
	showPreview: PropTypes.func,
	deviceWidth: PropTypes.number,
	changeState: PropTypes.func
};