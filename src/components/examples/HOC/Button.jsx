import React from 'react';

import stylesWrapper from './stylesWrapper';


const Button = (props) => {

	return (
		<button style={props.style}>Button</button>
	);
};

export default stylesWrapper(Button);