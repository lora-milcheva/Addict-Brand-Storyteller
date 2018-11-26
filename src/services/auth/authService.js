import requester from '../requester';

const module = 'user';
const basicAuth = 'basicAuth';
const sessionAuth = 'sessionAuth';


export default {

	register: (userInfo) => {
		return requester
			.get(basicAuth, module, null, userInfo);
	},


	login: (userInfo) => {

		let endpoint = 'login';

		return requester
			.post(basicAuth, module, endpoint, userInfo )
	},

	saveSession: (data) => {
		sessionStorage.setItem('authtoken', data._kmd.authtoken);
		sessionStorage.setItem('username', data.username);
		if( data._kmd.roles !== undefined) {
			sessionStorage.setItem('role', data._kmd.roles[0].roleId);
		}
	},

	logout: () => {
		return requester
			.post(sessionAuth, module, '_logout')
	},

	clearSession: () => {
		sessionStorage.clear();
	}
};

