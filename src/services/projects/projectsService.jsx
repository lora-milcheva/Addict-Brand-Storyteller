import requester from '../requester';

const module = 'appdata';
const basicAuth = 'basicAuth';
const sessionAuth = 'sessionAuth';
let endPoint = 'projects';

export default {

	loadAllProjects: () => {
		return requester
			.get(sessionAuth, module, endPoint);
	},

	loadProjectData: (id) => {

		endPoint += '/' + id;

		return requester
			.get(basicAuth, module, endPoint);
	},

	createProject: (project) => {
		return requester
			.post(sessionAuth, module, endPoint, project);
	}
};

