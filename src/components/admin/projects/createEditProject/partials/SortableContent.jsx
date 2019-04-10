import React from 'react';
import PropTypes from 'prop-types';
import { BUTTONS } from '../../../../../constants/constants';

class SortableContent extends React.Component {
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

	onDragStart = (e, elementKey) => {

		// Set the initial position of the dragged element
		this.setState({
			startX: e.clientX,
			startY: e.clientY
		});

		// Fade out element
		let elementIndex = Object.keys(this.props.elements).indexOf(elementKey);
		this.fadeOut(this.dataContainer.current.children[elementIndex], .1);

		// Save element and its index in the array
		e.dataTransfer.setData('element', elementKey);
		e.dataTransfer.setData('index', Object.keys(this.props.elements).indexOf(elementKey));
	};

	onDrop = (e) => {

		// Get image width and height
		let container = this.dataContainer;
		let imageWidth = container.current.children[0].clientWidth;
		let imageHeight = container.current.children[0].clientHeight;

		// Get images on row
		let imagesOnRow = Math.floor(container.current.clientWidth / imageWidth);

		// Get the image that we want to change
		let el = e.dataTransfer.getData('element');
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
		let reorderedElements = Object.keys(this.props.elements).filter(e => e !== el);
		reorderedElements.splice(newIndex, 0, el);

		let arr = {};

		reorderedElements.forEach(e => {
			arr[e] = this.props.elements[e];
		});


		// Save new arrangement
		this.props.onChange(arr);

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

		let elements = Object.keys(this.props.elements).map((element, index) => {

			let section = this.props.allSectionIds.filter(s => s._id === element)[0];
			let text = this.props.info[element];

			return (
				<div key={index}
				     className="info-text"
				     draggable
				     onDragStart={(e) => this.onDragStart(e, element)}>

					<div className="section-header">
						<h3 className="title">{section.name.bg}&nbsp;&nbsp;| </h3>
						<button className="btn btn-default xs"
						        data-state-prop={this.props.stateProp}
						        data-el-id={this.props.id}
						        data-section-name={element}
						        onClick={(e) => this.props.loadTextSectionForm(e)}>{BUTTONS.bg.edit}
						</button>
						<button className="btn btn-default xs"
						        name={element}
						        data-state-prop={this.props.stateProp}
						        data-el-id={this.props.id}
						        data-section-name={element}
						        onClick={(e) => this.props.deleteSection(e)}>{BUTTONS.bg.delete}
						</button>
					</div>

					<span className="label">BG</span>
					<div dangerouslySetInnerHTML={{__html: text.bg}}
					     className="text"/>

					<span className="label">EN</span>
					<div dangerouslySetInnerHTML={{__html: text.en}}
					     className="text"/>
				</div>);
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

export default SortableContent;

SortableContent.propTypes = {
	elements: PropTypes.object,
	info: PropTypes.object,
	allSectionsIds: PropTypes.array,
	deleteSection: PropTypes.func,
	loadTextSectionForm: PropTypes.func,
	// onChange: this.props.onChange
};