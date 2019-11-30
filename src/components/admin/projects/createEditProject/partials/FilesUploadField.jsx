import React from 'react';
import DropToUpload from 'react-drop-to-upload';
import PropTypes from 'prop-types';

// Services
import fileService from '../../../../../services/projects/fileService';

class FilesUploadField extends React.Component {

	constructor (props) {
		super(props);

		this.state = {};
	}

	handleDrop = (files) => {

		this.uploadFiles(files)
	};

	handleInputFiles = (e) => {

		const files = Array.from(e.target.files);

		this.uploadFiles(files);
	};

	uploadFiles = (files) => {

		let data = new FormData();

		let projectFolder = this.props.projectFolder;

		if (!projectFolder) {
			alert('No folder');
			return;
		}

		files.forEach((file, index) => {
			console.log(file);
			data.append(projectFolder + '/file_' + index, file);
		});

		let stateProp = this.props.stateProp;
		console.log(files);

		fileService
			.uploadFiles(data)
			.then(res => {
				console.log(res);
				this.props.addFiles(stateProp, JSON.parse(res['addedFiles']));
			})
			.catch(err => {
				console.log(err);
			});
	};

	render () {
		return (
			<div>
				<DropToUpload onDrop={this.handleDrop} id='files-upload-field'>
					Drop files here to upload
				</DropToUpload>
				<input type='file' multiple='multiple' onChange={this.handleInputFiles}/>
			</div>

		);
	}
}

export default FilesUploadField;

FilesUploadField.propTypes = {
	addFiles: PropTypes.func,
	projectFolder: PropTypes.string,
	stateProp: PropTypes.string
};