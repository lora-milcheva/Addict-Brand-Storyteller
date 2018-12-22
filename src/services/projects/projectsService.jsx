import requester from '../requester';

const module = 'appdata';
const basicAuth = 'basicAuth';
const adminAuth = 'adminAuth';
let endPoint = 'projects';

export default {

	createProject: (state) => {

		let project = createProjectInfo(state);
		return requester
			.post(adminAuth, module, endPoint, project);
	},

	loadAllProjects: () => {
		return requester
			.get(adminAuth, module, endPoint);
	},

	loadProjectData: (id) => {

		endPoint += '/' + id;

		return requester
			.get(basicAuth, module, endPoint);
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

