import React from 'react';
import { Link } from 'react-router-dom';

import authService from '../../services/auth/authService';

import Messages from '../common/Messages';

class Login extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		};
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	login = (e) => {
		e.preventDefault();

		let {username, password} = this.state;

		if (username.trim() === '') {
			this.messages.showMessage('invalid username');
			return;
		}

		if (password.trim() === '') {
			this.messages.showMessage('invalid password');
			return;
		}

		if (sessionStorage.getItem('authtoken')) {
			authService
				.logout() // To logout anonymous user
				.then(() => {
					authService.clearSession();
					this.makeLoginRequest();
				});

			return
		}

		this.makeLoginRequest();

	};

	makeLoginRequest = () => {
		authService.login(this.state)
			.then(res => {
				authService.saveSession(res);
				this.clearForm();
				this.messages.showMessage('logged in as: ' + res.username);
				setTimeout(() => {
					this.props.history.push('/');
				}, 2000)
			})
			.catch(err => {
				this.messages.showMessage(err.responseJSON.description);
			});
	};

	clearForm = () => {
		this.setState({username: '', password: ''});
	};

	render () {

		return (
			<div id="login">
				<Messages onRef={ref => (this.messages = ref)}/>

				<h1>Login</h1>

				<form method="post" onSubmit={this.login}>

					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input type="text"
						       name="username"
						       value={this.state.username}
						       className="form-control"
						       id="username"
						       placeholder="Username"
						       onChange={this.handleChange}/>
					</div>

					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input type="password"
						       name="password"
						       value={this.state.password}
						       className="form-control"
						       id="password"
						       placeholder="Password"
						       onChange={this.handleChange}/>
					</div>

					<button className="btn btn-primary" type="submit"> Login</button>
				</form>
			</div>
		);
	}
}

export default Login;