import React from 'react';
import PropTypes from 'prop-types';

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

	}

	componentWillMount () {
		clearTimeout(this.timeOut);
	}

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

		for (let i = 0; i < this.props.data.length; i++) {

			let name = 'video' + i;
			let video = this[name].current;
			video.volume = this.state.volume;

			video.onvolumechange = (e) => {this.saveVolumeValue(e);};
		}
	};

	saveVolumeValue = (e) => {
		let newVolume = e.target.volume;
		this.setState({volume: newVolume});

		// this.changeVolume();
	};

	changeVolume = () => {
		for (let i = 0; i < this.props.data.length; i++) {

			let name = 'video' + i;
			let video = this[name].current;
			video.volume = this.state.volume;
		}
	};

	render () {

		let lang = this.props.language;

		let videos = this.props.data.map((video, i) => {

			for (let el in video.info) {
				let section = this.props.sections.filter(s => s._id === el)[0];
				video.info[el].sectionName = section.name[lang];
			}

			let info = Object.keys(video.info).map(sectionId => {
				return (
					<div key={video.url + sectionId} className='section'>
						<p className='section-name'>{video.info[sectionId].sectionName}</p>
						<p className='section-text' dangerouslySetInnerHTML={{__html: video.info[sectionId][lang]}}/>
					</div>
				);
			});

			let name = 'video' + i;

			this[name] = React.createRef();

			return (
				<div key={video.url} className='video-container'>

					<video poster={video.poster}
					       className='video'
					       controls
					       ref={this[name]}>
						<source src={video.url} type="video/mp4"/>
					</video>

					<div className='video-info'>
						{info}
					</div>
				</div>
			);

		});

		return (
			<div id="project-video-gallery" onLoad={this.videoTest}>


				<div id='video-gallery' ref={this.container}>
					{videos}
				</div>


				<div className="gallery-navigation">
						<span className='gallery-navigation-button'
						      onClick={() => this.moveCarousel('left')}>
							<img id="prevBtn"
							     className={this.state.imageIndex === 0 ? 'disabled' : ''}
							     src="/images/icons/arrow-left-white.svg" alt="previous"/>
						</span>
					<span className='gallery-navigation-button'
					      onClick={() => this.moveCarousel('right')}>
							<img id="nextBtn"
							     className={this.state.imageIndex === (this.props.data.length - 1) ? 'disabled' : ''}
							     src="/images/icons/arrow-right-white.svg" alt="next"/>
						</span>
				</div>
			</div>
		);
	}
}

export default VideoGallery;

VideoGallery.propTypes = {
	data: PropTypes.array,
	language: PropTypes.string,
	sections: PropTypes.array,
	showPreview: PropTypes.func
};