import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { RESOLUTIONS } from '../../../../constants/constants';

class Gallery extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			translateValue: 0,
			step: 0,
			productsToShow: 0,
			imageIndex: 0
		};

		this.container = React.createRef();
	}

	componentDidMount () {
		this.handleResolutionChange();
		window.addEventListener('resize', this.handleResolutionChange);
		window.addEventListener('orientationchange', this.handleResolutionChange);
	}

	componentWillUnmount () {
		window.removeEventListener('resize', this.handleResolutionChange);
		window.removeEventListener('orientationchange', this.handleResolutionChange);
	}

	handleResolutionChange = () => {

		// if (window.innerWidth < RESOLUTIONS.smTopSellers) {
		// 	this.setState({productsToShow: 1}, () => {
		// 		this.getCardWidth();
		// 	});
		// } else if (window.innerWidth < RESOLUTIONS.mdTopSellers) {
		// 	this.setState({productsToShow: 2}, () => {
		// 		this.getCardWidth();
		// 	});
		// } else {
		// 	this.setState({productsToShow: 3}, () => {
		// 		this.getCardWidth();
		// 	});
		// }
	};

	getCurrentImageWidth = (callback) => {

		let index = this.state.imageIndex;
		let el = 'img' + index;

		// Get parent width with padding
		let currentImageWidth = this[el].current.parentNode.clientWidth;

		this.setState({step: currentImageWidth},() => callback());
	};

	moveCarousel = (direction) => {

		this.getCurrentImageWidth(() => {

			let container = this.container.current;

			let step = this.state.step;
			let translateValue;
			let translateMaxValue = container.scrollWidth;

			if (direction === 'left') {
				translateValue = this.state.translateValue - step;
				if (translateValue < 0) return;

			} else {
				translateValue = this.state.translateValue + step;
				if (translateValue > translateMaxValue - step) return;
			}

			this.setState({translateValue}, () => {
				window.requestAnimationFrame(function () {
					container.style.transform = `translateX(-${translateValue}px)`;
					container.style.transition = '.6s ease-out';
				});
			});
		});
	};

	render () {

		let lang = this.props.language;

		let gallery = this.props.data.map((element, i) => {

			for (let el in element.info) {
				let section = this.props.sections.filter(s => s._id === el)[0];
				element[section.name.en] = element.info[el];
			}

			let name = 'img' + i;

			this[name] = React.createRef();

			return (
				<div key={name} className='image-container'>
					<figure className="image"
					        ref={this[name]}
					        onLoad={() => {
						        let img = this[name].current;
						        if (img.clientWidth < img.clientHeight) {
							        img.classList.add('portrait');
						        }
					        }}>
						<img src={element.url}
						     className="img-fit"
						     alt={element.url}
						     data-target={JSON.stringify(element)}
						     onClick={this.props.showPreview}/>
					</figure>

					{element.Headline &&
					<div className='name' dangerouslySetInnerHTML={{__html: element.Headline[lang]}}/>
					}
				</div>
			);
		});

		return (
			<div id="project-gallery">

				<div id='gallery' ref={this.container}>
					{gallery}
				</div>


				<div className="gallery-navigation">
						<span className="gallery-navigation-button" onClick={() => this.moveCarousel('left')}>
							<img id="prevBtn" src="/images/icons/arrow-left-white.svg" alt="previous"/>
						</span>
					<span className="gallery-navigation-button" onClick={() => this.moveCarousel('right')}>
							<img id="nextBtn" src="/images/icons/arrow-right-white.svg" alt="next"/>
						</span>
				</div>
			</div>
		);
	}
}

export default Gallery;

Gallery.propTypes = {
	data: PropTypes.array,
	language: PropTypes.string,
	sections: PropTypes.array,
	showPreview: PropTypes.func
};