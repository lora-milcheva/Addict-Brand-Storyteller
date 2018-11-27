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
			avatar: ''
		};
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	addProject = () => {
		console.log( 222)
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

	render () {
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

					<AddImageForm label="Добави снимка"
					              addImage={this.addImage}/>

					<button className="btn btn-primary" type="submit"> Create </button>
				</form>
			</div>
		);
	}
}

export default createProject;