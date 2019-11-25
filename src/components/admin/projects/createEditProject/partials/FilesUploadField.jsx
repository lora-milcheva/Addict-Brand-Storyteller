import React from 'react';
import DropToUpload from 'react-drop-to-upload';
import PropTypes from 'prop-types';
import { BUTTONS } from '../../../../../constants/constants';

// Services
import fileService from '../../../../../services/projects/fileService';

class FilesUploadField extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			images: [],
			dirName: ''
		};

		this.dataContainer = React.createRef();
	}

	handleInputChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	makeFolder = () => {

		let data = {dirName: this.state.dirName};

		fileService
			.makeDir(data)
			.then((res) => {
				console.log(res.responseText);
			})
			.catch(err => {
				console.log(err.responseText);
			});
	};

	handleDrop (files) {
		let data = new FormData();

		files.forEach((file, index) => {
			data.append('file' + index, file);
		});

		fileService
			.uploadFiles(data)
			.then((res) => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	}

	render () {
		return (
			<div>
				<DropToUpload onDrop={this.handleDrop} id='files-upload-field'>
					Drop file here to upload
				</DropToUpload>
				<input type='text' name='dirName' onChange={this.handleInputChange}/>
				<button className='btn btn-default' onClick={this.makeFolder}>Направи папка</button>
			</div>

		);
	}
}

export default FilesUploadField;

FilesUploadField.propTypes = {};