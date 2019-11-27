import React from 'react';
import PropTypes from 'prop-types';

// Notifications
import Notifications from '../../../../common/notifications/Notifications';

// Partials
import FormSelectField from '../../../../common/formComponents/FormSelectField';
import FormInputField from '../../../../common/formComponents/FormInput';
import TextEditor from './TextEditor';

// Constants
import { BUTTONS, CREATE_PROJECT_INPUTS, NOTIFICATIONS } from '../../../../../constants/constants';
import fileService from '../../../../../services/projects/fileService';

class TextSectionFrom extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			stateProp: '',

			mediaId: '',
			sectionId: '',

			textBG: '',
			textEN: '',
			image: '',

			sections: [],

			visible: false,
		};
	}

	componentDidMount () {
		this.props.onRef(this);
	}

	componentWillUnmount () {
		this.props.onRef(undefined);
	}

	loadData = (data) => {

		this.setState({
			stateProp: data.stateProp,

			mediaId: data.mediaId,
			sectionId: data.sectionId,

			textBG: data.textBG,
			textEN: data.textEN,
			image: data.image,

			sections: data.sections,

			visible: true,
		});
	};

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	handleTextChangeBG = (value) => {
		this.setState({textBG: value});
	};

	handleTextChangeEN = (value) => {
		this.setState({textEN: value});
	};

	addImage = (e) => {

		const files = Array.from(e.target.files);
		const stateProp = e.target.name;

		let data = new FormData();

		let projectFolder = this.props.projectFolder;

		if (!projectFolder) {
			alert('No folder');
			return;
		}

		console.log(this.state.image);

		if (this.state.image) {
			fileService
				.deleteFile(this.state.image)
				.then(res => {
					console.log(res);
				})
				.catch(err => console.log(err));
		}

		files.forEach((file, index) => {
			data.append(projectFolder + '/file_' + index, file);
		});

		fileService
			.uploadFiles(data)
			.then(res => {
				console.log(res);
				let image = '/projects/' + projectFolder + '/' + JSON.parse(res['addedFiles'])[0];

				this.setState({[stateProp]: image});
			})
			.catch(err => {
				console.log(err);
			});
	};

	submitInfo = (e) => {
		e.preventDefault();

		let s = this.state;

		// Remove image
		if (s.image === undefined) s.image = '';

		// Check info
		if (!this.state.sectionId) {
			this.notifications.showMessage(NOTIFICATIONS.bg.selectSectionName);
			return;
		}

		let data = {
			[s.sectionId]: {
				bg: s.textBG,
				en: s.textEN,
				image: s.image
			}
		};

		if (this.state.stateProp === 'info') data[s.sectionId].image = s.image;

		this.state.stateProp === 'info'
			? this.props.addTextSection(data, this.state.stateProp)
			: this.props.addMediaInfo(data, this.state.stateProp, this.state.mediaId);

		this.cancel();  // To close modal
	};

	cancel = () => {
		this.setState({
			stateProp: '',
			mediaId: '',
			sectionId: '',
			textBG: '',
			textEN: '',
			image: '',

			sections: [],

			visible: false
		});
	};

	render () {

		let isVisible = this.state.visible;

		// To prevent mounting of text editor with empty values
		if (!this.state.visible) return (<div className={'loader'}/>);

		return (
			<div className={isVisible ? 'visible' : ''}
			     id="info-section-inputs">

				<Notifications onRef={ref => (this.notifications = ref)} language='bg'/>

				<div className="form">

					<img src={this.state.image} alt={''}/>

					{/*<FormInputField name='image'*/}
					{/*                label='Change Image'*/}
					{/*                value={this.state.image}*/}
					{/*                type='text'*/}
					{/*                required={false}*/}
					{/*                onChange={this.handleChange}/>*/}

					<input type='file' name='image' onChange={this.addImage}/>

					<FormSelectField name='sectionId'
					                 label={CREATE_PROJECT_INPUTS.bg.textSectionName}
					                 className='client-field'
					                 required={true}
					                 disabled={false}
					                 defaultValue={this.state.sectionId}
					                 options={this.state.sections}
					                 onChange={this.handleChange}/>

					<div className="form-group">
						<label>{CREATE_PROJECT_INPUTS.bg.textBG}</label>

						{this.state.visible !== '' &&
						<TextEditor
							value={this.state.textBG}
							onChange={this.handleTextChangeBG}/>
						}
					</div>


					<div className="form-group">
						<label>{CREATE_PROJECT_INPUTS.bg.textEN}</label>

						{this.state.visible !== '' &&
						<TextEditor
							value={this.state.textEN}
							onChange={this.handleTextChangeEN}/>
						}
					</div>


					<div className="buttons-container text-center">
						<button className="btn sm btn-default-light"
						        onClick={this.cancel}>{BUTTONS.bg.cancel}
						</button>
						<button className="btn sm btn-primary"
						        name={this.state.stateProp}
						        onClick={this.submitInfo}>{BUTTONS.bg.ok}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default TextSectionFrom;

TextSectionFrom.propTypes = {
	projectFolder: PropTypes.string
};
