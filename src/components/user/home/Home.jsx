import React from 'react';
import { Link } from 'react-router-dom';

import authService from '../../../services/auth/authService';

class Home extends React.Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
		authService.loginAnonymousUser()
			.then(res => {
				authService.saveSession(res);
			})
	}


	render () {

		return (
			<div id="home" className="container">
				<h1> HOME. Here I am.</h1>
				<Link to="/projects">Projects</Link>
				<p/>
				<Link to="/login">Login</Link>
			</div>
		);
	}
}

export default Home;