import React from 'react';


class AddImageForm extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			image: '',
		};
	}

	handleChange = (e) => {
		this.setState({image: e.target.value});
	};

	addImage = (e) => {
		e.preventDefault();

		if (this.state.image === '') return;

		this.props.addImage(this.state.image);

		this.setState({image: ''});
	};

	render () {
		return (
			<div className="form-group">
				<input className="form-control-group"
				       type="text"
				       onChange={this.handleChange}
				       value={this.state.image}>
				</input>
				<button className="btn md btn-primary add-on-btn" onClick={this.addImage}>Добави</button>
			</div>
		);
	}
}

export default AddImageForm;
