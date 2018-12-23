import requester from '../requester';

const module = 'appdata';
const basicAuth = 'basicAuth';
const sessionAuth = 'adminAuth';
let endPoint = 'projects';

export default {

	createProject: (state) => {

		let project = createProjectInfo(state);

		return requester
			.post(sessionAuth, module, endPoint, project);
	},


	loadAllProjects: () => {
		return requester
			.get(sessionAuth, module, endPoint);
	},


	loadProjectData: (id) => {

		let endPointId = endPoint + '/' + id;

		return requester
			.get(sessionAuth, module, endPointId);
	},


	editProject: (id, state) => {

		let endPointId = endPoint + '/' + id;

		let project = createProjectInfo(state);

		return requester
			.put(sessionAuth, module, endPointId, project);
	}
};

function createProjectInfo (state) {

	return {
		name: state.name,
		description: state.description,
		year: state.year,
		client: state.client,
		category: state.category,
		images: state.images,
		avatar: state.avatar,
		videos: state.videos,
	};

}

