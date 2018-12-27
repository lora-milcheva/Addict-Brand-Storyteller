import React from 'react';
import { Link } from 'react-router-dom';

import authService from '../../../services/auth/authService';

class Home extends React.Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
		authService
			.loginAnonymousUser()
			.then(res => {
				authService.saveSession(res);
				console.log('logged in as: ' + res.username)
			})
			.catch(err => console.log(err));
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