import React from 'react';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Partials
import ImagePreview from './partials/ImagePreview';
import ImageGallery from './partials/ImageGallery';
import VideoGallery from './partials/VideoGallery';

// Services
import projectsService from '../../../services/projects/projectsService';
import sectionsService from '../../../services/projects/sectionsService';
import clientsService from '../../../services/clients/clientsService';
import authService from '../../../services/auth/authService';

// Constants
import { USER_PAGES_TEXT } from '../../../constants/constants';
import RandomProjects from '../common/projects/RandomProjects';
import Article from '../common/articlePartials/Article';
import InfoSection from './partials/partials/InfoSection';
import ProjectHeader from './partials/ProjectHeader';
import ProjectInfo from './partials/ProjectInfo';
import SectionHeader from '../common/headers/SectionHeader';

class ProjectStory extends React.Component {
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

		// Log anonymous user if storage is empty
		if (sessionStorage.getItem('authtoken') === null) {
			authService
				.loginAnonymousUser()
				.then(res => {
					authService.saveSession(res);
					this.loadProject();
				})
				.catch(err => this.notifications.showMessage(err.responseJSON.description));
		} else {
			this.loadProject();
		}
	}

	componentWillReceiveProps (nextProps, nextContext) {

		// To reload page when select different project

		if (this.props.match.params.id !== nextProps.match.params.id) {
			this.setState({loading: true});

			this.projectId = nextProps.match.params.id;

			this.loadProject();
		}
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

				<section id='project-cover'>
					<img src={this.state.project.cover} alt='page cover'/>
				</section>

				<ProjectHeader activeLanguage={activeLanguage} project={project} client={client}/>

				<ProjectInfo activeLanguage={activeLanguage} project={project} sections={this.state.allSections}/>

				{this.state.project.videos.length > 0 &&
				<VideoGallery videos={project.videos}
				              sections={this.state.allSections}
				              direction={this.state.direction}
				              language={activeLanguage}/>
				}


				{this.state.project.images.length > 0 &&
				<ImageGallery images={project.images}
				              sections={this.state.allSections}
				              showPreview={this.showPreview}
				              direction={this.state.direction}
				              language={activeLanguage}/>
				}


				<section className='section-padding-top-bottom'>
					<SectionHeader pageName='project' language={activeLanguage} sectionName='otherProjects' />
					{/*<h2 className="section-title text-center">{USER_PAGES_TEXT.project[activeLanguage].otherProjects}</h2>*/}
					<RandomProjects language={activeLanguage} currentProjectId={this.projectId}/>
				</section>

			</div>
		);
	}

}

ProjectStory.contextType = LanguageContext;

export default ProjectStory;

