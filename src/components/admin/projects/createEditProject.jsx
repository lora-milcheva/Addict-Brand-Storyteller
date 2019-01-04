import React from 'react';

// Partials
import FormInput from '../../common/formComponents/FormInput';
import FormSelectField from '../../common/formComponents/FormSelectField';
import Textarea from '../../common/formComponents/TextArea';
import AddOnInput from '../../common/formComponents/AddOnInput';

// Services
import projectsService from '../../../services/projects/projectsService';
import clientsService from '../../../services/clients/clientsService';
import categoriesService from '../../../services/categories/categoriesService';

// Notifications
import Messages from '../../common/Messages';
import ConfirmDialog from '../../common/ConfirmDialog';

// Utils
import Utils from '../../../utils/utils';

// Constants
import { CREATE_PROJECT_INPUTS, BUTTONS } from '../../../constants/constants';

class createProject extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			name: {},
			description: {},
			year: '',
			clientId: '',
			categoryIds: [],
			images: [],
			thumbnail: '',
			videos: [],

			projectLoaded: false,

			dataLoaded: false,

			startX: 0,
			startY: 0,

			allClients: [],
			allCategories: []
		};

		this.image = React.createRef();
		this.imagesContainer = React.createRef();
	}

	projectId = this.props.match.params.id;

	componentDidMount () {

		this.loadData();

		if (this.projectId) {

			projectsService
				.loadProjectData(this.projectId)
				.then(res => {

					let projectClientId = res.clientId;

					clientsService
						.loadClientData(projectClientId);

					this.setState({
						name: res.name,
						description: res.description,
						year: res.year,
						clientId: res.clientId,
						categoryIds: res.categoryIds,
						images: res.images,
						thumbnail: res.thumbnail,
						videos: res.videos,

						projectLoaded: true
					});
				})
				.catch(err => console.log(err));
		} else {
			this.setState({projectLoaded: true});
		}
	}

	loadData = () => {
		clientsService
			.loadAllClients()
			.then(res => {

				this.setState({allClients: res});

				categoriesService
					.loadAllCategories()
					.then(res => {
						this.setState({
							allCategories: res,
							dataLoaded: true
						});
					})
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	};

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

	handleArrChange = (e) => {

		e.preventDefault();

		if (this.state[e.target.name].includes(e.target.value)) {
			this.setState({[e.target.name]: this.state[e.target.name].filter(el => el !== e.target.value)}, () => console.log(this.state));

		} else {
			this.setState({[e.target.name]: [...this.state[e.target.name], e.target.value]}, () => console.log(this.state));
		}
	};

	saveProject = (e) => {

		e.preventDefault();

		if (this.projectId) {

			projectsService
				.editProject(this.projectId, Utils.createStateCopy(this.state))
				.then(res => {

					this.messages.showMessage('Успешна редкация');
					setTimeout(() => this.props.history.go(-1), 2000);

				})
				.catch(err => {
					this.messages.showMessage(err.responseJSON.description);
				});

			return;
		}

		projectsService
			.createProject(Utils.createStateCopy(this.state))
			.then(res => {

				this.messages.showMessage('Проектът беше създаден.');
				setTimeout(() => this.props.history.go(-1), 2000);

			})
			.catch(err => {
				this.messages.showMessage(err.responseJSON.description);
			});
	};

	confirmDelete = () => {
		// First give the massage, then the callback to be executed
		this.confirmDialog.showMessage('test', this.deleteProject);
	};

	deleteProject = () => {
		console.log('from delete');
	};

	cancel = (e) => {
		e.preventDefault();
		this.props.history.go(-1);
	};

	onDragOver = (e) => {
		e.preventDefault();
	};

	onDragStart = (e, element) => {

		this.setState({
			startX: e.clientX,
			startY: e.clientY
		});

		e.dataTransfer.setData('element', element);
		e.dataTransfer.setData('index', this.state.images.indexOf(element));
	};

	onDrop = (e) => {

		let imageWidth = this.image.current.clientWidth;
		let imageHeight = this.image.current.clientHeight;

		let imagesOnRow = Math.floor(this.imagesContainer.current.clientWidth / imageWidth);

		let el = e.dataTransfer.getData('element');
		let imageIndex = Number(e.dataTransfer.getData('index'));

		let startX = this.state.startX;
		let startY = this.state.startY;

		let stepX = 0;
		let stepY = 0;

		stepX = Math.round((e.clientX - startX) / imageWidth);

		stepY = Math.round((e.clientY - startY) / imageHeight) * imagesOnRow;

		console.log(stepX);
		console.log(stepY);

		imageIndex = imageIndex + stepY + stepX;

		console.log(imageIndex);

		let filtered = this.state.images.filter(e => e !== el);
		filtered.splice(imageIndex, 0, el);

		this.setState({images: filtered});
	};

	render () {

		let title = this.projectId ? 'Редакция на проект' : 'Създаване на проект';

		let buttonText = this.projectId ? BUTTONS.BG.edit : BUTTONS.BG.create;

		// Show loader until data is loaded
		if (!this.state.projectLoaded || !this.state.dataLoaded) {
			return (<div className="lds-dual-ring"/>);
		}

		let thumbnail = this.state.thumbnail !== '' ? (<figure className="image">
			<img src={this.state.thumbnail} alt="project thumbnail" className="img-fit"/>
		</figure>) : null;

		let images = this.state.images.map((imageUrl, index) => {
			return (
				<figure key={index}
				        ref={this.image}
				        className="image"
				        draggable
				        onDragStart={(e) => this.onDragStart(e, imageUrl)}>

					<img src={imageUrl} className="img-fit" alt=""/>

					<button className="btn xs btn-primary del-btn" name='images' value={imageUrl}
					        onClick={this.handleArrChange}>clear
					</button>
				</figure>);
		});

		let videos = this.state.videos.map((video, index) => {
			return (
				<div className="image" key={index}>
					<iframe src={video} title={video}/>
					<button className="btn xs btn-primary del-btn" name='videos' value={video}
					        onClick={this.handleArrChange}>clear
					</button>
				</div>

			);
		});

		let categories = this.state.allCategories.map(e => {
			let style = this.state.categoryIds.includes(e._id) ? 'btn category-label selected' : 'btn category-label';
			return (
				<button key={e._id} className={style} name="categoryIds" value={e._id}
				        onClick={this.handleArrChange}>{e.name.BG}</button>
			);
		});

		return (
			<div id="project-create" className="container">

				<Messages onRef={ref => (this.messages = ref)}/>
				<ConfirmDialog onRef={ref => (this.confirmDialog = ref)}/>

				<div className="page-header">
					<h1 className="page-title">{title}</h1>

					{this.projectId &&
					<button className="btn btn-danger xs" onClick={this.confirmDelete}>{BUTTONS.BG.delete}</button>
					}
				</div>


				{/*//FORM*/}
				<form method="post" onSubmit={this.saveProject} id="create-project-form">

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

						<div className="form-group">
							{categories}
						</div>

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
						<FormSelectField name='clientId'
						                 label={CREATE_PROJECT_INPUTS.BG.client}
						                 className='client-field'
						                 required={false}
						                 disabled={false}
						                 selected={this.state.clientId}
						                 options={this.state.allClients}
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


					</main>


					{/*//PROJECT IMAGES & VIDEOS*/}
					<aside id="project-data">


						<div className="project-data">

							<h3 className="section-title">Thumbnail</h3>
							<div className="container">
								{thumbnail}
							</div>

							<AddOnInput
								name="thumbnail"
								// label={CREATE_PROJECT_INPUTS.BG.thumbnail}
								labelClassName="no-label"
								buttonText='+'
								placeholder='Thumbnail'
								onChange={this.handleChange}/>
						</div>


						<div className="project-data">
							<h3 className="section-title">Изображения</h3>
							<div className="droppable container"
							     ref={this.imagesContainer}
							     onDragOver={this.onDragOver}
							     onDrop={(e) => this.onDrop(e)}>
								{images}
							</div>

							<AddOnInput
								name="images"
								// label={CREATE_PROJECT_INPUTS.BG.images}
								labelClassName="no-label"
								buttonText='+'
								placeholder='Добави снимка'
								onChange={this.handleArrChange}/>
						</div>

						<div className="project-data">
							<h3 className="section-title">Видео</h3>
							<div className="container">
								{videos}
							</div>

							<AddOnInput
								name="videos"
								// label={CREATE_PROJECT_INPUTS.BG.videos}
								labelClassName="no-label"
								buttonText='+'
								placeholder='Добави видео'
								onChange={this.handleArrChange}/>
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

