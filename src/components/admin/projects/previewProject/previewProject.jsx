import React from 'react';
import { LanguageContext } from '../../../common/languagesContext/LanguageContext';

// Partials - import from user folder
import ImagePreview from '../../../user/projects/project/partials/ImagePreview';
import ImageGallery from '../../../user/projects/project/partials/ImageGallery';
import VideoGallery from '../../../user/projects/project/partials/VideoGallery';
import ProjectHeader from '../../../user/projects/project/partials/ProjectHeader';
import ProjectInfo from '../../../user/projects/project/partials/ProjectInfo';


// Services
import projectsService from '../../../../services/projects/projectsService';
import sectionsService from '../../../../services/projects/sectionsService';
import clientsService from '../../../../services/clients/clientsService';

// Constants
import { BUTTONS } from '../../../../constants/constants';

class previewProject extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			project: '',
			clientName: '',

			selectedImage: '',

			allSections: '',

			direction: '',

			loading: true
		};

		this.image = React.createRef();
	}

	projectId = this.props.match.params.id;

	componentDidMount () {

		document.addEventListener('keydown', this.handleKeyPress);

		this.loadProject();

	}

	componentWillUnmount () {
		document.removeEventListener('keydown', this.handleKeyPress);
	}

	handleKeyPress = (e) => {

		if (e.key === 'ArrowLeft') this.changeState('left');

		if (e.key === 'ArrowRight') this.changeState('right');

		if (e.key === 'Escape') this.changeState('');
	};

	changeState = (direction) => {
		this.setState({direction});
	};

	loadProject = () => {

		projectsService
			.loadProjectData(this.projectId)
			.then(res => {
				this.setState({project: res});

				sectionsService
					.loadAllSections()
					.then(res => {
						this.setState({allSections: res});

						if (this.state.project.clientId) {
							clientsService
								.loadAllClients()
								.then(res => {
									let client = res.filter(e => e._id === this.state.project.clientId);
									this.setState({clientName: client[0], loading: false});
								});
						} else {
							this.setState({loading: false});
						}
					});
			})
			.catch(err => {
				this.notifications.showMessage(err.responseJSON.description);
			});
	};

	showPreview = (e) => {
		let image = JSON.parse(e.target.getAttribute('data-target'));
		this.setState({selectedImage: image});
		document.removeEventListener('keydown', this.handleKeyPress);
	};

	hidePreview = () => {
		this.setState({
			selectedImage: '',
			direction: ''
		});
		document.addEventListener('keydown', this.handleKeyPress);
	};

	render () {

		if (this.state.loading) return (<div className="lds-dual-ring"/>);

		let activeLanguage = this.context.language;

		let project = this.state.project;

		let client = this.state.clientName !== '' ? this.state.clientName.name[activeLanguage] : '';

		return (
			<div id="project-story" className="container-fluid">

				{this.state.selectedImage !== '' &&
				<ImagePreview image={this.state.selectedImage}
				              allImages={project.images}
				              activeLanguage={activeLanguage}
				              onClose={this.hidePreview}/>
				}


				<ProjectHeader activeLanguage={activeLanguage} project={project} client={client}/>


				<ProjectInfo activeLanguage={activeLanguage} project={project} sections={this.state.allSections}/>

				{this.state.project.videos.length > 0 &&
				<VideoGallery videos={project.videos}
				              sections={this.state.allSections}
				              direction={this.state.direction}
				              language={activeLanguage}
				              changeState={this.changeState}/>
				}


				{this.state.project.images.length > 0 &&
				<ImageGallery images={project.images}
				              sections={this.state.allSections}
				              showPreview={this.showPreview}
				              direction={this.state.direction}
				              language={activeLanguage}
				              changeState={this.changeState}/>
				}


				<div className="buttons-container text-center">
					<button className='btn btn-default'
					        onClick={() => this.props.history.push('/admin/project-edit/' + this.projectId)}>{BUTTONS.bg.back}
					</button>
				</div>


			</div>
		);
	}

}

previewProject.contextType = LanguageContext;

export default previewProject;

