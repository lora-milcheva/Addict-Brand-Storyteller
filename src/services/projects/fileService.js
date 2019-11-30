import $ from 'jquery';

const localhostUrl = 'http://localhost:80';

const uploadFilesUrl = 'http://addict-bg.com/api/fileUpload.php';
const deleteFileUrl = 'http://addict-bg.com/api/deleteFile.php';
const makeDirUrl = 'http://addict-bg.com/api/makeDir.php';


export default {

	uploadFiles: (data) => {

		console.log(data)

		return $.ajax({
			url: uploadFilesUrl,
			type: 'POST',
			data: data,
			processData: false,
			contentType: false,
			mode: 'no-cors'
		});
	},

	makeDir: (data) => {

		return $.ajax({
			url: makeDirUrl,
			type: 'POST',
			data: data,
		});
	},

	deleteFile: (filePath) => {
		return $.ajax({
			url: deleteFileUrl,
			type: 'GET',
			data: {'file' : filePath },
			dataType: 'json'
		});
	}
};


