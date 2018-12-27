import React from 'react';
import { Link } from 'react-router-dom';

import authService from '../../../services/auth/authService';

class Home extends React.Component {
	constructor (props) {
		super(props);
	}


	render () {

		return (
			<div id="home" className="container">
				<h1> HOME. Here I am.</h1>
			</div>
		);
	}
}

export default Home;