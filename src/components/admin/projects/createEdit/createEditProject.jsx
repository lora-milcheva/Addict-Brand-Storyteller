import React from 'react';

// Partials
import FormInput from '../../../common/formComponents/FormInput';
import FormSelectField from '../../../common/formComponents/FormSelectField';
import Textarea from '../../../common/formComponents/TextArea';
import AddOnInput from '../../../common/formComponents/AddOnInput';

// Services
import projectsService from '../../../../services/projects/projectsService';

// Notifications
import Messages from '../../../common/Messages';
import ConfirmDialog from '../../../common/ConfirmDialog';

// Utils
import Utils from '../../../../utils/utils';

// Constants
import { CREATE_PROJECT_INPUTS, BUTTONS, CATEGORIES } from '../../../../constants/constants';

class createProject extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			name: {},
			description: {},
			year: '',
			client: '',
			category: '',
			images: [],
			avatar: '',
			videos: [],

			loading: true
		};
	}

	projectId = this.props.match.params.id;

	componentDidMount () {

		if (this.projectId) {

			projectsService
				.loadProjectData(this.projectId)
				.then(res => {

					this.setState({
						name: res.name,
						description: res.description,
						year: res.year,
						client: res.client,
						category: res.category,
						images: res.images,
						avatar: res.avatar,
						videos: res.videos,

						loading: false
					});
				})
				.catch(err => console.log(err));
		} else {
			this.setState({loading: false});
		}
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

		this.setState({[key]: stateProp});
	};

	addImage = (url) => {
		this.setState({images: [...this.state.images, url]});
	};

	removeImage = (e) => {
		e.preventDefault();
		this.setState({images: this.state.images.filter(el => el !== e.target.name)});
	};

	addVideo = (url) => {
		this.setState({videos: [...this.state.videos, url]});
	};

	removeVideo = (e) => {
		e.preventDefault();
		this.setState({videos: this.state.videos.filter(el => el !== e.target.name)});
	};

	addAvatar = (url) => {
		this.setState({avatar: url});
	};

	clearData = () => {
		this.setState({
			name: {BG: '', EN: ''},
			description: {BG: '', EN: ''},
			year: '',
			client: '',
			category: '',
			images: [],
			avatar: '',
			videos: [],
		});
	};

	createProject = (e) => {

		e.preventDefault();

		if (this.projectId) {

			projectsService
				.editProject(this.projectId, Utils.createStateCopy(this.state))
				.then(res => {
					this.messages.confirm('Успешна редакция.');
					setTimeout(() => this.props.history.go(-1), 2000);
				})
				.catch(err => {
					this.messages.confirm(err.responseJSON.description);
				});
			return;
		}

		projectsService
			.createProject(Utils.createStateCopy(this.state))
			.then(res => {
				this.messages.confirm('Проектът беше създаден.');
				this.clearData();
				setTimeout(() => this.props.history.go(-1), 2000);
			})
			.catch(err => {
				this.messages.confirm(err.responseJSON.description);
			});
	};

	confirm = () => {
		this.confirmDialog.showMessage('test', this.deleteProject);
	};

	deleteProject = () => {
		console.log('from delete');
	};

	cancel = (e) => {
		e.preventDefault();
		this.props.history.go(-1);
	};

	render () {

		let avatar = this.state.avatar !== '' ?
			<img src={this.state.avatar} alt="project avatar" className="img-fit"/> : null;

		let images = this.state.images.map((image, index) => {
			return (
				<figure className="image" key={index}>
					<img src={image} className="img-fit" alt=""/>
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

		let title = this.projectId ? 'Редакция на проект' : 'Създаване на проект';

		let buttonText = this.projectId ? BUTTONS.BG.edit : BUTTONS.BG.create;

		if (this.state.loading) {
			return (<div className="lds-dual-ring"/>);
		}

		return (
			<div id="project-create" className="container">

				<Messages onRef={ref => (this.messages = ref)}/>
				<ConfirmDialog onRef={ref => (this.confirmDialog = ref)}/>

				<div className="page-header">
					<h1 className="page-title">{title}</h1>

					{this.projectId &&
					<button className="btn btn-danger xs" onClick={this.confirm}>{BUTTONS.BG.delete}</button>
					}
				</div>


				{/*//FORM*/}
				<form method="post" onSubmit={this.createProject} id="create-project-form">

					<main id="project-info">

						{/*//NAME BG*/}
						<FormInput type='text'
						           name='name'
						           value={this.state.name.BG}
						           id='name-BG'
						           placeholder=''
						           label={CREATE_PROJECT_INPUTS.BG.name}
						           className='name-field'
						           required={true}
						           disabled={false}
						           onChange={this.handleMultiLangChange}/>

						{/*//NAME EN*/}
						<FormInput type='text'
						           name='name'
						           value={this.state.name.EN}
						           id='name-EN'
						           placeholder=''
						           label={CREATE_PROJECT_INPUTS.EN.name}
						           className='name-field'
						           required={true}
						           disabled={false}
						           onChange={this.handleMultiLangChange}/>

						{/*//DESCRIPTION BG*/}
						<Textarea name='description'
						          value={this.state.description.BG}
						          id='description-BG'
						          placeholder=''
						          label={CREATE_PROJECT_INPUTS.BG.description}
						          className='description-field'
						          required={false}
						          onChange={this.handleMultiLangChange}/>

						{/*//DESCRIPTION EN*/}
						<Textarea name='description'
						          value={this.state.description.EN}
						          id='description-EN'
						          placeholder=''
						          label={CREATE_PROJECT_INPUTS.EN.description}
						          className='description-field'
						          required={false}
						          onChange={this.handleMultiLangChange}/>

						{/*//CLIENT*/}
						<FormInput type='text'
						           name='client'
						           value={this.state.client}
						           id='client'
						           placeholder=''
						           label={CREATE_PROJECT_INPUTS.BG.client}
						           className='client-field'
						           required={false}
						           disabled={false}
						           onChange={this.handleChange}/>

						{/*//YEAR*/}
						<FormInput type='text'
						           name='year'
						           value={this.state.year}
						           id='year'
						           placeholder=''
						           label={CREATE_PROJECT_INPUTS.BG.year}
						           className='year-field'
						           required={false}
						           disabled={false}
						           onChange={this.handleChange}/>

						{/*//CATEGORY*/}
						<FormSelectField className='category-field'
						                 name='category'
						                 value={this.state.category}
						                 label={CREATE_PROJECT_INPUTS.BG.category}
						                 options={CATEGORIES.BG}
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
								label={CREATE_PROJECT_INPUTS.BG.avatar}
								buttonText='+'
								placeholder='Аватар'
								className='add-avatar-field'
								addImage={this.addAvatar}/>
						</div>


						<div className="project-data">
							<div className="container">
								{images}
							</div>

							<AddOnInput
								label={CREATE_PROJECT_INPUTS.BG.images}
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
								label={CREATE_PROJECT_INPUTS.BG.videos}
								buttonText='+'
								placeholder='Добави видео'
								className='add-image-field'
								addImage={this.addVideo}/>
						</div>

					</aside>


					{/*//SUBMIT*/}
					<div className="form-group">
						<button className="btn btn-default" onClick={this.cancel}>{BUTTONS.BG.cancel}</button>
						<button className="btn btn-primary" type="submit">{buttonText}</button>
					</div>
				</form>
			</div>
		);
	}
}

export default createProject;

