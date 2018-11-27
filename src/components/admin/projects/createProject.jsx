import React from 'react';

// Components
import FormInput from '../../common/formComponents/FormInput';
import AddImageForm from '../../common/formComponents/AddImageFrom';

// Services
import projectsService from '../../../services/projects/projectsService';

// Notifications
import Messages from '../../common/Messages';

class createProject extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			name: '',
			description: '',
			year: '',
			client: '',
			images: [],
			avatar: '',
			videos: [],
		};
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
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
	}

	addAvatar = (url) => {
		this.setState({avatar: url}, () => console.log(this.state));
	};

	render () {

		let images = this.state.images.map((image, index) => {
			return (
				<figure className="project-image" key={index}>
					<img src={image} className="image" alt=""/>
					<button className="btn xs btn-primary del-btn" name={image} onClick={this.removeImage}>clear</button>
				</figure>);
		});

		let videos = this.state.videos.map((video, index) => {
			return <iframe src={video} title="" className="video" key={index}/>;
		});
		return (
			<div id="project-create" className="container">

				<Messages onRef={ref => (this.messages = ref)}/>

				<h1>Add new project</h1>

				<form method="post" onSubmit={this.addProject}>

					<FormInput type='text'
					           name='name'
					           value={this.state.name}
					           id='name'
					           placeholder=''
					           label='Project name'
					           required={true}
					           disabled={false}
					           onChange={this.handleChange}/>

					<FormInput type='text'
					           name='description'
					           value={this.state.description}
					           id='description'
					           placeholder=''
					           label='Description'
					           required={true}
					           disabled={false}
					           onChange={this.handleChange}/>

					<FormInput type='text'
					           name='year'
					           value={this.state.year}
					           id='year'
					           placeholder=''
					           label='Year'
					           required={true}
					           disabled={false}
					           onChange={this.handleChange}/>

					<FormInput type='text'
					           name='client'
					           value={this.state.client}
					           id='client'
					           placeholder=''
					           label='Client'
					           required={true}
					           disabled={false}
					           onChange={this.handleChange}/>


					<AddImageForm
						buttonText="Добави аватар"
						placeholder="Добави аватар"
						addImage={this.addAvatar}/>

					<AddImageForm
						buttonText="Добави снимка"
						placeholder="Добави снимка"
						addImage={this.addImage}/>

					<div className="project-pictures">
						<h3 className="section-title">Project pictures</h3>
						<div className="pictures-container">
							{images}
						</div>
					</div>

					<div className="project-videos">
						<h3 className="section-title">Project videos</h3>
						<div className="videos-container">
							{videos}
						</div>
					</div>

					<button className="btn btn-primary" type="submit"> Create</button>
				</form>
			</div>
		);
	}
}

export default createProject;