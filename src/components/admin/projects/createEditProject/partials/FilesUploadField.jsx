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
			data.append(projectFolder + '/file_' + index, file);
		});

		fileService
			.uploadFiles(data)
			.then(res => {
				console.log(res);
				this.props.addImages(JSON.parse(res['addedFiles']));
			})
			.catch(err => {
				console.log(err);
			});
	}

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
	addImages: PropTypes.func,
	projectFolder: PropTypes.string
};