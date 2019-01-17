import React from 'react';

import './css/main.css';
import './css/animations.css';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Routes from './components/routes/Routes';

import Notifications from './components/common/Notifications';

import authService from './services/auth/authService';

class App extends React.Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {

		if (sessionStorage.length === 0) {
			authService
				.loginAnonymousUser()
				.then(res => {
					authService.saveSession(res);
				})
				.catch(err => {
					console.log(err);
				});
		}
	}



	render () {

		let isHomePage = window.location.pathname === '/' || window.location.pathname === '/home';

		return (

			<div>

				{!isHomePage && <Header/> }

				<main>
					<Routes />
				</main>

				<Footer/>
			</div>

		);
	}
}

export default App;