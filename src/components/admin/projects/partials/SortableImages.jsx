import React from 'react';

import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

const SortableItem = SortableElement(({itemIndex, value, deleteImage}) =>

	<figure key={itemIndex}
	        className="image">

		<img src={value} className="img-fit" alt=""/>

		<button className="btn xs btn-primary del-btn" name='images' value={value}
		        onClick={() => deleteImage(value)}>clear
		</button>
	</figure>
);

const SortableList = SortableContainer(({items, deleteImage}) => {
	let itemIndex = 1;

	return (
		items.map((value, index) => (
			<SortableItem key={`item-${index}`}
			              itemIndex={itemIndex++}
			              index={index}
			              value={value}
			              deleteImage={deleteImage}/>
		))

	);
});

class SortableImages extends React.Component {
	state = {
		items: this.props.sortableItems
	};

	onSortEnd = ({oldIndex, newIndex}) => {
		this.setState({
			items: arrayMove(this.state.items, oldIndex, newIndex),
		});

		this.handleOrderChange(this.state.items);
	};

	handleOrderChange;

	render () {

		this.handleOrderChange = this.props.handleOrderChange;

		let deleteImage = this.props.deleteImage;

		return <SortableList
			getContainer={() => document.getElementById('sortable-images')}
			items={this.state.items}
			deletImage={deleteImage}
			distance={10}
			onSortEnd={this.onSortEnd}/>;
	}
}

export default SortableImages;
