import React from 'react';

class Carousel extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		let images = this.props.images;

		return (

			<div className="carousel">
				<div className="img-container">
					<img className="img-fit" src='/images/carousel/carousel_03.jpg' alt=''/>
				</div>
			</div>
		);
	}
}

export default Carousel;