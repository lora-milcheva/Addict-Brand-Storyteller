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
					<img className="img-fit" src='/images/carousel/home_01.jpg' alt=''/>
				</div>
			</div>
		);
	}
}

export default Carousel;