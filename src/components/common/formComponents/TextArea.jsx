import React from 'react';
import PropTypes from 'prop-types';

class TextArea extends React.Component {
	render () {

		const {name, id, value, placeholder, label, className, required, onChange} = this.props;

		return (
			<div className={'form-group ' + className}>
				<label htmlFor={id}>{label}</label>
				<textarea className="form-control"
				          name={name}
				          id={id}
				          value={value}
				          placeholder={placeholder}
				          required={required}

				          onChange={onChange}/>
			</div>
		);
	}
}

export default TextArea;

TextArea.propTypes = {
	name: PropTypes.string,
	value: PropTypes.string,
	id: PropTypes.string,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	className: PropTypes.string,
	required: PropTypes.bool,
	onChange: PropTypes.func
};