import React from 'react';
import PropTypes from 'prop-types';

class FormInput extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			value: this.props.value || ''
		}
	}


	handleChange = (e) => {
		this.setState({value: e.target.value});
		this.props.onChange(e)
	};

	render () {

		const {type, name, value, id, placeholder, label, className, required, disabled, step, min, max, onChange} = this.props;

		return (
			<div className={"form-group "+ className}>
				<label htmlFor={id}>{label}</label>
				<input className="form-control"
				       type={type}
				       value={this.state.value}
				       name={name}
				       id={id}
				       placeholder={placeholder}
				       required={required}
				       disabled={disabled}
				       step={step}
				       min={min}
				       max={max}
				       onChange={this.handleChange}/>
			</div>
		);
	}
}

export default FormInput;

FormInput.propTypes = {
	type: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	id: PropTypes.string,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	className: PropTypes.string,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	step: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	onChange: PropTypes.func
};