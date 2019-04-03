import requester from '../requester';

const module = 'appdata';
const basicAuth = 'basicAuth';
const sessionAuth = 'adminAuth';
let endPoint = 'sections';

export default {

	createSection: (state) => {

		let project = createSectionInfo(state);

		return requester
			.post(sessionAuth, module, endPoint, project);
	},


	loadAllSections: () => {
		return requester
			.get(sessionAuth, module, endPoint);
	},


	loadSectionData: (id) => {

		let endPointId = endPoint + '/' + id;

		return requester
			.get(sessionAuth, module, endPointId);
	},


	editSection: (id, state) => {

		let endPointId = endPoint + '/' + id;

		let project = createSectionInfo(state);

		return requester
			.put(sessionAuth, module, endPointId, project);
	}
};

function createSectionInfo (state) {

	return {
		name: state.name,
	};

}

