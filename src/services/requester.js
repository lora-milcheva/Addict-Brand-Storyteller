import $ from 'jquery';

const baseUrl = 'https://baas.kinvey.com';
const appKey = 'kid_HJ46HdBCm';  // APP KEY HERE;
const appSecret = '0d8a90c423d84f79aa9d89c75a1ebdb1';  // APP SECRET HERE;

export default {

	get: (auth, module, endPoint, query) => {

		let url = query !== undefined
			? baseUrl + '/' + module + '/' + appKey + '/' + endPoint + query
			: baseUrl + '/' + module + '/' + appKey + '/' + endPoint;

		return $.ajax(
			{
				url: url,
				type: 'GET',
				headers: createHeader(auth)
			});
	},

	post: (auth, module, endPoint, data) => {

		let url = baseUrl + '/' + module + '/' + appKey + '/' + endPoint;

		return $.ajax(
			{
				url: url,
				type: 'POST',
				headers: createHeader(auth),
				data: JSON.stringify(data)
			});
	},

	put: (auth, module, endPoint, data) => {

		let url = baseUrl + '/' + module + '/' + appKey + '/' + endPoint;

		return $.ajax(
			{
				url: url,
				type: 'PUT',
				headers: createHeader(auth),
				data: JSON.stringify(data)
			});
	},
};

let createHeader = (auth) => {
	return auth === 'basicAuth'
		? {
			'Authorization': 'Basic ' + btoa(appKey + ':' + appSecret),
			'Content-type': 'application/json'
		}
		: {
			'Authorization': 'Kinvey ' + sessionStorage.getItem('authtoken'),
			'Content-type': 'application/json'
		};
};