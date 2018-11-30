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

		const {placeholder, label, className, buttonText} = this.props;

		return (
			<div className= {"form-group " + className}>
				<label>{label}</label>
				<input className="form-control add-on"
				       type="text"
				       placeholder={placeholder}
				       onChange={this.handleChange}
				       value={this.state.image}>
				</input>
				<button className="btn md btn-primary add-on-btn" onClick={this.addImage}>{buttonText}</button>
			</div>
		);
	}
}

export default AddImageForm;
