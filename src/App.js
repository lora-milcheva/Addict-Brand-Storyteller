import React from 'react';
import './css/main.css';
import './css/animations.css';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Routes from './components/routes/Routes';

import Messages from './components/common/Messages';

import authService from './services/auth/authService';


class App extends React.Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
		authService.clearSession();
		this.loginAnonymousUser();
	}

	componentWillUnmount () {
		authService
			.logout()
			.then(authService.clearSession());
	}

	loginAnonymousUser = () => {

		authService
			.loginAnonymousUser()
			.then(res => {
				this.messages.confirmDelete('logged in as: ' + res.username);
				authService.saveSession(res);
			})
			.catch(err => {
				this.messages.confirmDelete(err.responseJSON.description);
			});
	};

	render () {
		return (

            <div>
	            <Messages onRef={ref => (this.messages = ref)}/>
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