import requester from '../requester';

const module = 'appdata';
const basicAuth = 'basicAuth';
const sessionAuth = 'adminAuth';
let endPoint = 'clients';

export default {

	createClient: (state) => {

		let client = createClientInfo(state);

		return requester
			.post(sessionAuth, module, endPoint, client);
	},


	loadAllClients: () => {
		return requester
			.get(sessionAuth, module, endPoint);
	},


	loadClientData: (id) => {

		let endPointId = endPoint + '/' + id;

		return requester
			.get(sessionAuth, module, endPointId);
	},


	editClient: (id, state) => {

		let endPointId = endPoint + '/' + id;

		let client = createClientInfo(state);

		return requester
			.put(sessionAuth, module, endPointId, client);
	},

	deleteClient: (id) => {

		let endPointId = endPoint + '/' + id;

		return requester
			.remove(sessionAuth, module, endPointId);

	}
};

function createClientInfo (state) {

	return {
		name: state.name
	};

}

