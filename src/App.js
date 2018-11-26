import React from 'react';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Routes from './components/routes/Routes';

import './css/main.css';

import authService from './services/auth/authService';


class App extends React.Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
		this.loginAnonymousUser();
	}

	componentWillUnmount () {
		authService
			.logout()
			.then(authService.clearSession());
	}

	loginAnonymousUser = () => {
		let anonymousUser = {
			username: 'anonymous',
			password: '123456'
		};

		authService
			.login(anonymousUser)
			.then(res => {
				authService.saveSession(res);
			})
			.catch(err => console.log(err));
	};

	render () {
		return (

            <div>
              <Header/>

              <main>
                <Routes />
              </main>

              <Footer/>
            </div>

		);
	}
}

export default App;