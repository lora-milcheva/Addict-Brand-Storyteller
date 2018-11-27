import React from 'react';
import PropTypes from 'prop-types';

class FormInput extends React.Component {
	render () {

		const {type, name, value, id, placeholder, label, required, disabled, step, min, max, onChange} = this.props;

		return (
			<div className="form-group">
				<label htmlFor={id}>{label}</label>
				<input className="form-control"
				       type={type}
				       name={name}
				       id={id}
				       placeholder={placeholder}
				       required={required}
				       disabled={disabled}
				       step={step}
				       min={min}
				       max={max}
				       onChange={onChange}/>
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
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	step: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	onChange: PropTypes.func
};