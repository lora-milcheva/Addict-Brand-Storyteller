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


	render () {

		let isHomePage = window.location.pathname === '/';

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