import React from 'react';

import DropToUpload from 'react-drop-to-upload';

// Partials
import FormInput from '../../common/formComponents/FormInput';
import FormSelectField from '../../common/formComponents/FormSelectField';
import AddOnInput from '../../common/formComponents/AddOnInput';
import NewLanguageInputs from './partials/NewLanguageInputs';

// Services
import projectsService from '../../../services/projects/projectsService';

// Notifications
import Messages from '../../common/Messages';

// Utils
import Utils from '../../../utils/utils';

// Constants
import { LANGUAGES, CREATE_PROJECT_INPUTS, BUTTONS, CATEGORIES } from '../../../constants/constants';

class createProject extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			name: {},
			description: {},
			year: '',
			client: {},
			category: '',
			images: [],
			avatar: '',
			videos: [],

			activeLanguage: LANGUAGES.BG,
		};
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	handleMultiLangChange = (e) => {
		let lang = e.target.id.split('-')[1];   // get the language
		let key = e.target.name;                // get the state key
		let value = e.target.value;             // get new value

		let stateProp = Object.assign({}, this.state[key]);  // make state key copy

		stateProp[lang] = value; // add new value

		this.setState({[key]: stateProp}, () => console.log(this.state));
	};

	addImage = (url) => {
		this.setState({images: [...this.state.images, url]}, () => console.log(this.state));
	};

	removeImage = (e) => {
		e.preventDefault();
		this.setState({images: this.state.images.filter(el => el !== e.target.name)});
	};

	addVideo = (url) => {
		this.setState({videos: [...this.state.videos, url]}, () => console.log(this.state));
	};

	removeVideo = (e) => {
		e.preventDefault();
		this.setState({videos: this.state.videos.filter(el => el !== e.target.name)});
	};

	addAvatar = (url) => {
		this.setState({avatar: url}, () => console.log(this.state));
	};

	showTabContent = (e) => {
		let lang = e.target.name;
		this.setState({activeLanguage: lang});
	};


	createProject = (e) => {
		e.preventDefault();

		projectsService
			.createProject(Utils.createStateCopy(this.state))
			.then(res => {
				console.log(res);
				this.setState({
					name: {},
					description: {},
					year: '',
					client: {},
					category: '',
					images: [],
					avatar: '',
					videos: [],
				})
			})
			.catch(err => {
				this.messages.showMessage(err.responseJSON.description);
			});
	};

	render () {

		let language = this.state.activeLanguage;

		let avatar = this.state.avatar !== '' ?
			<img src={this.state.avatar} alt="project avatar" className="image"/> : null;

		let images = this.state.images.map((image, index) => {
			return (
				<figure className="image" key={index}>
					<img src={image} alt=""/>
					<button className="btn xs btn-primary del-btn" name={image} onClick={this.removeImage}>clear
					</button>
				</figure>);
		});

		let videos = this.state.videos.map((video, index) => {
			return (
				<div className="image" key={index}>
					<iframe src={video} title={video}/>
					<button className="btn xs btn-primary del-btn" name={video} onClick={this.removeVideo}>clear
					</button>
				</div>

			);
		});

		return (
			<div id="project-create" className="container">

				<Messages onRef={ref => (this.messages = ref)}/>

				<h1 className="page-title">Add new project</h1>


				{/*//TABS*/}
				<div className="languages">

					<button
						className={language === LANGUAGES.BG ? 'btn btn-primary xs active' : 'btn btn-primary xs'}
						name={LANGUAGES.BG}
						onClick={this.showTabContent}>{LANGUAGES.BG}
					</button>

					<button
						className={language === LANGUAGES.EN ? 'btn btn-primary xs active' : 'btn btn-primary xs'}
						name={LANGUAGES.EN}
						onClick={this.showTabContent}>{LANGUAGES.EN}
					</button>
				</div>


				{/*//FORM*/}
				<form method="post" onSubmit={this.createProject} id="create-project-form">

					<main id="project-info">

						{/*//LANGUAGES*/}
						{language === LANGUAGES.BG &&
						<NewLanguageInputs language={LANGUAGES.BG}
						                   nameValue={this.state.name[language]}
						                   descriptionValue={this.state.description[language]}
						                   clientValue={this.state.client[LANGUAGES.BG]}
						                   onChange={this.handleMultiLangChange}/>
						}

						{language === LANGUAGES.EN &&
						<NewLanguageInputs language={LANGUAGES.EN}
						                   nameValue={this.state.name[LANGUAGES.EN]}
						                   descriptionValue={this.state.description[LANGUAGES.EN]}
						                   clientValue={this.state.client[LANGUAGES.EN]}
						                   onChange={this.handleMultiLangChange}/>
						}


						{/*//YEAR*/}
						<FormInput type='text'
						           name='year'
						           value={this.state.year}
						           id='year'
						           placeholder=''
						           label={CREATE_PROJECT_INPUTS[language].year}
						           className='year-field'
						           required={false}
						           disabled={false}
						           onChange={this.handleChange}/>

						{/*//CATEGORY*/}
						<FormSelectField className='category-field'
						                 name='category'
						                 value={this.state.category}
						                 label={CREATE_PROJECT_INPUTS[language].category}
						                 options={CATEGORIES[language]}
						                 onChange={this.handleChange}
						/>
					</main>


					{/*//PROJECT IMAGES & VIDEOS*/}
					<aside id="project-data">

						<div className="project-data">
							<div className="container">
								{avatar}
							</div>

							<AddOnInput
								label={CREATE_PROJECT_INPUTS[language].avatar}
								buttonText='+'
								placeholder='Добави аватар'
								className='add-avatar-field'
								addImage={this.addAvatar}/>
						</div>


						<div className="project-data">
							<div className="container">
								{images}
							</div>

							<AddOnInput
								label={CREATE_PROJECT_INPUTS[language].images}
								buttonText='+'
								placeholder='Добави снимка'
								className='add-image-field'
								addImage={this.addImage}/>
						</div>

						<div className="project-data">

							<div className="container">
								{videos}
							</div>

							<AddOnInput
								label={CREATE_PROJECT_INPUTS[language].videos}
								buttonText='+'
								placeholder='Добави видео'
								className='add-image-field'
								addImage={this.addVideo}/>
						</div>

					</aside>


					{/*//SUBMIT*/}
					<div className="form-group">
						<button className="btn btn-primary" type="submit">{BUTTONS[language].create}</button>
					</div>
				</form>
			</div>
		);
	}
}

export default createProject;

