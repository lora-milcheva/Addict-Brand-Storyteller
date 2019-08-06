import requester from '../requester';

const module = 'appdata';
const basicAuth = 'basicAuth';
const sessionAuth = 'adminAuth';
let endPoint = 'sections';

export default {

	createSection: (state) => {

		let section = createSectionInfo(state);

		return requester
			.post(sessionAuth, module, endPoint, section);
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

		let section = createSectionInfo(state);

		return requester
			.put(sessionAuth, module, endPointId, section);
	}
};

function createSectionInfo (state) {

	return {
		name: state.name,
	};

}

