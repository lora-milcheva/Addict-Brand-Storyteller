import requester from '../requester';

const module = 'appdata';
const basicAuth = 'basicAuth';
const sessionAuth = 'adminAuth';
let endPoint = 'clients';

export default {

	createClient: (state) => {

		let project = createCategoryInfo(state);

		return requester
			.post(sessionAuth, module, endPoint, project);
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

		let project = createCategoryInfo(state);

		return requester
			.put(sessionAuth, module, endPointId, project);
	}
};

function createCategoryInfo (state) {

	return {
		name: state.name,
		projectIds: state.projectIds
	};

}

