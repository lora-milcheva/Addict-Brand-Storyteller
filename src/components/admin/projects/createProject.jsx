import React from 'react';

// Components
import FormInput from '../../common/formComponents/FormInput';
import TextArea from '../../common/formComponents/TextArea';
import AddImageForm from '../../common/formComponents/AddImageFrom';

// Services
import projectsService from '../../../services/projects/projectsService';

// Notifications
import Messages from '../../common/Messages';

class createProject extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			name: {BG: '', EN: ''},
			description: {BG: '', EN: ''},
			year: '',
			client: {BG: '', EN: ''},
			images: [],
			avatar: '',
			videos: [],
		};
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value}, () => console.log(this.state));
	};

	handleMultiLangChange = (e) => {

		let lang = e.target.id.split('-')[1];
		let key = e.target.name;
		let value = e.target.value;

		let stateProp = Object.assign({}, this.state[key]);

		stateProp[lang] = value;

		this.setState({[key]: stateProp}, () => console.log(this.state))
	};

	addProject = () => {

		projectsService
			.createProject(this.state)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				this.messages.showMessage(err.responseJSON.description);
			});
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

	render () {

		let avatar = this.state.avatar !== '' ? <img src={this.state.avatar} alt="project avatar" className="image"/> : null;

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
					<iframe src={video} title={video} />
					<button className="btn xs btn-primary del-btn" name={video} onClick={this.removeVideo}>clear
					</button>
				</div>

			);
		});

		return (
			<div id="project-create" className="container">

				<Messages onRef={ref => (this.messages = ref)}/>

				<h1 className="page-title">Add new project</h1>

				<form method="post" onSubmit={this.addProject} id="project-form">

					<FormInput type='text'
					           name='name'
					           value={this.state.name.EN}
					           id='name-EN'
					           placeholder=''
					           label='Project name'
					           className='name-field'
					           required={true}
					           disabled={false}
					           onChange={this.handleMultiLangChange}/>

					<FormInput type='text'
					           name='name'
					           value={this.state.name.BG}
					           id='name-BG'
					           placeholder=''
					           label='Име'
					           className='name-field'
					           required={true}
					           disabled={false}
					           onChange={this.handleMultiLangChange}/>

					<FormInput type='text'
					           name='client'
					           value={this.state.client}
					           id='client'
					           placeholder=''
					           label='Client'
					           className='client-field'
					           required={false}
					           disabled={false}
					           onChange={this.handleChange}/>

					<FormInput type='text'
					           name='year'
					           value={this.state.year}
					           id='year'
					           placeholder=''
					           label='Year'
					           className='year-field'
					           required={false}
					           disabled={false}
					           onChange={this.handleChange}/>

					<TextArea name='description'
					          value={this.state.description}
					          id='description'
					          placeholder=''
					          label='Description'
					          className='description-field'
					          required={false}
					          onChange={this.handleChange}/>

					<AddImageForm
						buttonText='Добави аватар'
						placeholder='Добави аватар'
						className='add-avatar-field'
						addImage={this.addAvatar}/>


					<AddImageForm
						buttonText='Добави снимка'
						placeholder='Добави снимка'
						className='add-image-field'
						addImage={this.addImage}/>



					<AddImageForm
						buttonText='Добави видео'
						placeholder='Добави видео'
						className='add-image-field'
						addImage={this.addVideo}/>



					<div className="form-group">
						<button className="btn btn-primary" type="submit">Create</button>
					</div>
				</form>

				<aside id="project-data">
					<div className="project-avatar">
						<h3 className="section-title">Project avatar</h3>
						<div className="container">
							{avatar}
						</div>
					</div>
					<div className="project-pictures">
						<h3 className="section-title">Project pictures</h3>
						<div className="container">
							{images}
						</div>
					</div>
					<div className="project-videos">
						<h3 className="section-title">Project videos</h3>
						<div className="container">
							{videos}
						</div>
					</div>
				</aside>
			</div>
		);
	}
}

export default createProject;

