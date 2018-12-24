import React from 'react';
import PropTypes from 'prop-types';


class FormSelectField extends React.Component {
	constructor (props) {
		super(props);
	}


	render () {
		const {label, name, className, value, required, disabled, onChange, options} = this.props;


		let optionElements = options.map(el => {
			return (<option key={el._id} value={el._id}>{el.name.BG}</option>)
		});


		return (
			<div className={"form-group "+ className}>
				<label>{label}{required && <label className="text-danger">&nbsp;*</label>}</label>
				<select className="form-control"
					name={name}
					value={value}
					disabled={disabled}
					required={required}
					onChange={onChange}>
					<option value=''/>
					{optionElements}

				</select>
			</div>
		);
	}
}

export default FormSelectField;

FormSelectField.propTypes = {
	name: PropTypes.string,
	className: PropTypes.string,
	value: PropTypes.string,
	label: PropTypes.string,
	options: PropTypes.array,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	onChange: PropTypes.func
};