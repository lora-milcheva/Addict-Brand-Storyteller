import $ from 'jquery';

const localhostUrl = 'http://localhost:80';

const uploadFilesUrl = 'http://addict-bg.com/api/uploadFile.php';
const deleteFileUrl = 'http://addict-bg.com/api/deleteFile.php';
const createProjectFolder = 'http://addict-bg.com/api/createProjectFolder.php';
const renameProjectFolderUrl = 'http://addict-bg.com/api/renameProjectFolder.php';
const deleteProjectFolderUrl = 'http://addict-bg.com/api/deleteProjectFolder.php';


export default {

    uploadFiles: (data) => {

        return $.ajax({
            url: uploadFilesUrl,
            type: 'POST',
            data: data,
            processData: false,
            contentType: false,
            mode: 'no-cors'
        });
    },

    deleteFile: (filePath) => {

        return $.ajax({
            url: deleteFileUrl,
            type: 'GET',
            data: {'file': filePath},
            dataType: 'json'
        });
    },

    createProjectFolder: (projectFolder) => {

        let data = {projectFolder: projectFolder};

        return $.ajax({
            url: createProjectFolder,
            type: 'POST',
            data: data,
        });
    },

    renameProjectFolder: (oldName, newName) => {

        let data = {
        	oldName: oldName,
			newName: newName
        };

        console.log(data);

        return $.ajax({
            url: renameProjectFolderUrl,
            type: 'POST',
            data: data
        });
    },

    deleteProjectFolderAndFiles: (projectFolder) => {

        let data = {projectFolder: projectFolder};

        return $.ajax({
            url: deleteProjectFolderUrl,
            type: 'POST',
            data: data,
            dataType: 'json'
        });
    }
};


