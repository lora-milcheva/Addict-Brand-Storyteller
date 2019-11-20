import React from 'react';
import PropTypes from 'prop-types';
import { BUTTONS } from '../../../../../constants/constants';

class SortableImages extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			startX: 0,
			startY: 0,
		};

		this.dataContainer = React.createRef();
	}

	onDragOver = (e) => {
		// Enable movement
		e.preventDefault();
	};

	onDragStart = (e, element) => {

		// Set the initial position of the dragged element
		this.setState({
			startX: e.clientX,
			startY: e.clientY
		});

		// Fade out element
		let elementIndex = this.props.elements.indexOf(element);
		this.fadeOut(this.dataContainer.current.children[elementIndex], .1);

		// Save element and its index in the array
		e.dataTransfer.setData('element', JSON.stringify(element));
		e.dataTransfer.setData('index', this.props.elements.indexOf(element));
	};

	onDrop = (e) => {

		// Get image width and height
		let container = this.dataContainer;
		let imageWidth = container.current.children[0].clientWidth;
		let imageHeight = container.current.children[0].clientHeight;

		// Get images on row
		let imagesOnRow = Math.floor(container.current.clientWidth / imageWidth);

		// Get the image that we want to change
		let el = JSON.parse(e.dataTransfer.getData('element'));
		let imageIndex = Number(e.dataTransfer.getData('index'));

		// Get the image start position
		let startX = this.state.startX;
		let startY = this.state.startY;

		let stepX = 0;
		let stepY = 0;

		// Get movement
		stepX = Math.round((e.clientX - startX) / imageWidth);
		stepY = Math.round((e.clientY - startY) / imageHeight) * imagesOnRow;

		// Change image index according to the movement
		let newIndex = imageIndex + stepY + stepX;

		if (newIndex >= container.current.children.length || newIndex === imageIndex) {
			this.fadeIn(container.current.children[imageIndex], 1);
			return;
		}

		// Fade out new position
		this.fadeOut(container.current.children[newIndex], .3);

		// Remove image from the array and then place it in the new index position
		let reorderedElements = this.props.elements.filter(e => e.url !== el.url);
		reorderedElements.splice(newIndex, 0, el);

		// Save new arrangement
		this.props.onChange(this.props.name, reorderedElements);

		// Fade in changed elements
		setTimeout(() => {
			this.fadeIn(container.current.children[newIndex], 1);
			this.fadeIn(container.current.children[imageIndex], 1);
		}, 200);
	};

	fadeOut = (el, opacity) => {
		window.requestAnimationFrame(function () {
			el.style.transition = 'opacity 0ms';
			el.style.opacity = opacity;
		});
	};

	fadeIn = (el, opacity) => {
		window.requestAnimationFrame(function () {
			el.style.transition = 'opacity 1200ms';
			el.style.opacity = opacity;
		});
	};

	render () {

		let elements = (this.props.elements).map((element, index) => {

			return (
				<figure key={index}
				        className="image"
				        draggable
				        onDragStart={(e) => this.onDragStart(e, element)}>

					<img src={element.url} className="img-fit" alt=""/>

					<div className='del-btn'>
						<button className="btn xs btn-primary"
						        name='images'
						        value={element.url}
						        onClick={this.props.onDelete}>{BUTTONS.en.clear}
						</button>

						<button className="btn xs btn-success"
						        data-state-prop={'images'}
						        onClick={(e) => this.props.showMediaInfo(e, element)}>{BUTTONS.en.info}
						</button>
					</div>
				</figure>
			);
		});

		return (
			<div className="droppable container"
			     ref={this.dataContainer}
			     onDragOver={this.onDragOver}
			     onDrop={(e) => this.onDrop(e)}>
				{elements}
			</div>
		);
	}
}

export default SortableImages;

SortableImages.propTypes = {
	elements: PropTypes.array,
	name: PropTypes.string,
	onDelete: PropTypes.func,
	onChange: PropTypes.func,
	showMediaInfo: PropTypes.func,
	removeImageVideo: PropTypes.func
};