import React from 'react';
import { Link } from 'react-router-dom';
import posed from 'react-pose/lib/index';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Partials
import ImagePreview from './partials/ImagePreview';
import ProjectCard from '../common/ProjectCard';
import Gallery from './partials/Gallery';
import VideoGallery from './partials/VideoGallery';
import ContactForm from '../common/ContactForm';

// Services
import projectsService from '../../../services/projects/projectsService';
import sectionsService from '../../../services/projects/sectionsService';
import clientsService from '../../../services/clients/clientsService';
import authService from '../../../services/auth/authService';

// Constants
import { USER_PAGES_TEXT } from '../../../constants/constants';

class ProjectStory extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			project: '',
			clientName: '',

			selectedImage: {},

			currentProjectIndex: 0,
			prevProjectId: undefined,
			nextProjectId: undefined,

			randomProjects: [],

			allSections: [],

			visibleSectionIds: [],

			loading: true
		};

		this.image = React.createRef();
	}

	projectId = this.props.match.params.id;

	componentDidMount () {

		// Log anonymous user if storage is empty
		if (sessionStorage.getItem('authtoken') === null) {
			authService
				.loginAnonymousUser()
				.then(res => {
					authService.saveSession(res);
					this.loadProject();
					this.loadRandomProjects();
				})
				.catch(err => this.notifications.showMessage(err.responseJSON.description));
		} else {
			this.loadProject();
			this.loadRandomProjects();
		}
	}

	componentWillReceiveProps (nextProps) {

		if (this.props.match.params.id !== nextProps.match.params.id) {
			this.setState({loading: true});

			this.projectId = nextProps.match.params.id;

			this.setState({randomProjects: []}, () => {
				this.loadProject();
				this.loadRandomProjects()
			});
		}
	}


	loadProject = () => {
		projectsService
			.loadProjectData(this.projectId)
			.then(res => {
				this.setState({
					project: res,
					visibleSectionIds: [Object.keys(res.info)[0]]
				});
			})
			.then(() => {
				sectionsService
					.loadAllSections()
					.then(res => {
						this.setState({allSections: res});
					})
					.then(() => {
						clientsService
							.loadAllClients()
							.then(res => {
								let client = res.filter(e => e._id === this.state.project.clientId);
								this.setState({clientName: client[0], loading: false});
							});
					});
				}
			)
			.catch(err => {
				this.notifications.showMessage(err.responseJSON.description);
			});
	};

	loadRandomProjects = () => {

		let query = '?query={}&fields=_id';

		projectsService
			.loadAllProjects(query)
			.then(res => {

				const projects = res.filter(e => e._id !== this.projectId);

				let numberOfProjectsToLoad = projects.length;

				if (numberOfProjectsToLoad > 3) {
					numberOfProjectsToLoad = 3;
				}

				// Get random ids
				let projectIds = [];

				while (projectIds.length < numberOfProjectsToLoad) {

					let randomNumber = Math.floor((Math.random() * projects.length));

					if (!projectIds.includes(projects[randomNumber]._id)) {
						projectIds.push(projects[randomNumber]._id);
					}
				}

				// Load random projects by id
				for (let i = 0; i < projectIds.length; i++) {
					projectsService
						.loadProjectData(projectIds[i])
						.then(res => {
							this.setState({randomProjects: [...this.state.randomProjects, res]});
						})
						.catch(err => this.notifications.showMessage(err.responseJSON.description));
				}
			})
			.catch(err => this.notifications.showMessage(err.responseJSON.description));
	};

	showPreview = (e) => {
		let image = JSON.parse(e.target.getAttribute('data-target'));
		this.setState({selectedImage: image});
	};

	hidePreview = () => {
		this.setState({selectedImage: {}});
	};

	toggleSection = (e) => {

		let sectionId = e.target.name;

		if (this.state.visibleSectionIds.includes(sectionId)) {
			this.setState({
				visibleSectionIds: this.state.visibleSectionIds.filter(el => el !== sectionId)
			});
		} else {
			this.setState({
				visibleSectionIds: [...this.state.visibleSectionIds, sectionId]
			});
		}
	};

	render () {

		if (this.state.loading) return (<div className="lds-dual-ring"/>);

		let activeLanguage = this.context.language;

		let project = this.state.project;

		let client = this.state.clientName.name[activeLanguage];

		let info;

		if (Object.keys(project.info)) {

			info = Object.keys(project.info).map(e => {

				let sectionText = project.info[e][activeLanguage];
				let image = project.info[e].image;
				let sectionName = this.state.allSections.filter(s => s._id === e)[0].name[activeLanguage];

				// let result = findImageInString(sectionText);
				//
				//
				// let imgStyle = {
				// 	height: '350px',
				// 	backgroundImage: 'url(' + result.url + ')',
				// 	backgroundSize: 'cover',
				// 	backgroundAttachment: 'fixed',
				// 	WebkitTransition: 'all',    // note the capital 'W' here
				// 	msTransition: 'all'         // 'ms' is the only lowercase vendor prefix
				// };

				return (
					<section key={e}>

						{image !== '' && <img src={image} alt='project'/>}

						<article className="section container">
							<div className="section-header">
								<h2 className="section-title">{sectionName}</h2>
							</div>
							<div className='section-text' style={{color: 'inherit'}}
							     dangerouslySetInnerHTML={{__html: sectionText}}/>
						</article>

						{/*{result.url !== '' && <div style={imgStyle}/>}*/}

					</section>
				);
			});
		}

		let randomProjects = this.state.randomProjects.map((e, i) => {
			return (
				<ProjectCard key={e._id + i} project={e} activeLanguage={activeLanguage}/>
			);
		});

		return (
			<div id="project-story" className="container-fluid">

				<ImagePreview image={this.state.selectedImage}
				              allImages={project.images}
				              activeLanguage={activeLanguage}
				              onClose={this.hidePreview}/>


				<div id="project-info">

					{/*<section id='project-cover' style={{backgroundImage: 'url(' + this.state.project.cover + ')'}}/>*/}
					<section id='project-cover'>
						<img src={this.state.project.cover} alt='page cover'/>
					</section>

					<section id="project-summary" className='container'>
						<p className='project-name'> {project.name[activeLanguage]}&nbsp;&nbsp;&#8212;&nbsp;&nbsp;{project.year} </p>
						<p className='client'> {client} </p>
						<h2 className="cliche">
							<span className="field">{USER_PAGES_TEXT.project[activeLanguage].cliche}</span>
							{project.description[activeLanguage]}
						</h2>
					</section>



					<section id="project-description">
						{info}
					</section>
				</div>


				{this.state.project.videos.length > 0 &&
				<VideoGallery data={project.videos}
				              sections={this.state.allSections}
				              language={activeLanguage}/>
				}


				{this.state.project.images.length > 0 &&
				<Gallery data={project.images}
				         sections={this.state.allSections}
				         showPreview={this.showPreview}
				         language={activeLanguage}/>
				}

				<section id='like-us' className='container-padding section-padding-top-bottom'>
					<h3 className='section-title'>Like what you see?</h3>
					<a href='#contact-us' className='btn btn-default-light'>Get in touch</a>
				</section>


				<section className='container-padding section-padding-top-bottom'>
					<h2 className="section-title">{USER_PAGES_TEXT.project[activeLanguage].otherProjects}</h2>
					<div id="other-projects">
						{randomProjects}
					</div>
				</section>

				{/*<ContactForm/>*/}
			</div>
		);
	}

}

ProjectStory.contextType = LanguageContext;

export default ProjectStory;

function findImageInString (string) {

	let imageArr = string.match(/<img([\w\W]+?)\/>/g);
	let url = '';

	if (imageArr) {
		let img = imageArr[0].match(/<img([\w\W]+?)\/>/g)[0];
		url = img.match(/"(.)+?"/g)[0];
	}

	let text = string.replace(/<p><img([\w\W]+?)\/><\/p>/g, '');

	return {text, url};
}