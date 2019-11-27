import $ from 'jquery';

const uploadFilesUrl = 'http://addict-bg.com/api/fileUpload.php';
const deleteFileUrl = 'http://addict-bg.com/api/deleteFile.php';
const makeDirUrl = 'http://addict-bg.com/api/makeDir.php';
const localhostUrl = 'http://localhost:80';

export default {

	uploadFiles: (files) => {

		return $.ajax({
			url: uploadFilesUrl,
			type: 'POST',
			data: files,
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
			url: localhostUrl,
			type: 'GET',
			data: {'file' : filePath },
			dataType: 'json'
		});
	}
};


