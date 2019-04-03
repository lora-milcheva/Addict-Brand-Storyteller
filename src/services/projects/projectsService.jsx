import requester from '../requester';

const module = 'appdata';
const basicAuth = 'basicAuth';
const sessionAuth = 'sessionAuth';
let endPoint = 'projects';

export default {

	createProject: (state) => {

		let project = createProjectInfo(state);

		return requester
			.post(sessionAuth, module, endPoint, project);
	},


	loadAllProjects: (query) => {
		return requester
			.get(sessionAuth, module, endPoint, query);
	},


	loadProjectData: (id) => {

		let endPointId = endPoint + '/' + id;

		return requester
			.get(sessionAuth, module, endPointId);
	},

	getProjectsCount: () => {

		let endPointCount = endPoint + '/_count';

		return requester
			.get(sessionAuth, module, endPointCount);

	},


	editProject: (id, state) => {

		let endPointId = endPoint + '/' + id;

		let project = createProjectInfo(state);

		return requester
			.put(sessionAuth, module, endPointId, project);
	},

	deleteProject: (id) => {

		let endPointId = endPoint + '/' + id;

		return requester
			.remove(sessionAuth, module, endPointId);

	}
};

function createProjectInfo (state) {

	return {
		name: state.name,
		description: state.description,
		info: state.info,
		year: state.year,
		webPage: state.webPage,
		isStar: state.isStar,
		clientId: state.clientId,
		categoryIds: state.categoryIds,
		images: state.images,
		thumbnail: state.thumbnail,
		videos: state.videos,
	};
}

