import React from 'react';
import PropTypes from 'prop-types';

function FormSelectField (props){
	const {label, name, className, required, disabled, onChange, options, defaultValue} = props;

	let optionElements = options.map(el => {
		return (<option key={el._id} value={el._id}>{el.name.bg}</option>);
	});

	return (
		<div className={'form-group ' + className}>

			<label>{label}{required && <label className="text-danger">&nbsp;*</label>}</label>

			<select className="form-control"
			        name={name}
			        disabled={disabled}
			        required={required}
			        onChange={onChange}
			        value={defaultValue}>

				<option value=''/>

				{optionElements}

			</select>
		</div>
	);

}

export default FormSelectField;

FormSelectField.propTypes = {
	name: PropTypes.string,
	className: PropTypes.string,
	defaultValue: PropTypes.string,
	label: PropTypes.string,
	options: PropTypes.array,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	onChange: PropTypes.func
};