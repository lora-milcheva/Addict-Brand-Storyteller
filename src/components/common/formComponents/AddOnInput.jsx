import React from 'react';
import PropTypes from 'prop-types';

class AddOnInput extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			value: '',
		};
	}

	handleChange = (e) => {
		this.setState({value: e.target.value});
	};

	submit = (e) => {
		e.preventDefault();

		if (this.state.value === '') return;

		this.props.onChange(e);

		this.setState({value: ''});
	};

	render () {

		const {placeholder, label, buttonText, name, labelClassName} = this.props;

		return (
			<div className={'form-group add-on'}>
				<label className={labelClassName}>{label}</label>
				<input className="form-control add-on"
				       type="text"
				       placeholder={placeholder}
				       onChange={this.handleChange}
				       value={this.state.value}>
				</input>

				<button className="btn md btn-primary add-on-btn"
				        name={name}
				        value={this.state.value}
				        onClick={this.submit}>{buttonText}
				</button>
			</div>
		);
	}
}

export default AddOnInput;

AddOnInput.propTypes = {
	name: PropTypes.string,
	labelClassName: PropTypes.string,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	buttonText: PropTypes.string,
	onChange: PropTypes.func
};