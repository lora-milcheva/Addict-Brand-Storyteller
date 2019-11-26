import React from 'react';
import DropToUpload from 'react-drop-to-upload';
import PropTypes from 'prop-types';
import { BUTTONS } from '../../../../../constants/constants';

// Services
import fileService from '../../../../../services/projects/fileService';

class FilesUploadField extends React.Component {

	constructor (props) {
		super(props);

		this.state = {};
	}

	handleDrop = (files) => {

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
	};

	render () {
		return (
			<DropToUpload onDrop={this.handleDrop} id='files-upload-field'>
				Drop files here to upload
			</DropToUpload>
		);
	}
}

export default FilesUploadField;

FilesUploadField.propTypes = {
	addImages: PropTypes.func,
	projectFolder: PropTypes.string
};