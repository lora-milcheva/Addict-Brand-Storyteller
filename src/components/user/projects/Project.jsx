import React from 'react';
import { Link } from 'react-router-dom';
import posed from 'react-pose';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Partials
import GalleryPreview from './partials/GalleryPreview';
import ProjectCard from '../common/ProjectCard';
import List from '../test/List';

// Services
import projectsService from '../../../services/projects/projectsService';
import clientsService from '../../../services/clients/clientsService';
import authService from '../../../services/auth/authService';

// Notifications
import Notifications from '../../common/Notifications';

// Constants
import { USER_PAGES_TEXT } from '../../../constants/constants';

const ImagesContainer = posed.div({
	enter: {staggerChildren: 50},
	exit: {staggerChildren: 20, staggerDirection: -1}
});

const Card = posed.figure({
	enter: {
		y: 0,
		opacity: 1,
		transition: {
			opacity: {ease: 'easeOut', duration: 100},
			default: {ease: 'linear', duration: 100}
		},
	},
	exit: {y: 250, opacity: 0}
});

class Project extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			project: '',
			clientName: '',

			selectedImage: '',

			currentProjectIndex: 0,
			prevProjectId: undefined,
			nextProjectId: undefined,

			randomProjects: [],

			loading: true
		};
	}

	projectId = this.props.match.params.id;

	componentDidMount () {

		// Log anonymous user if storage is empty
		if (sessionStorage.getItem('authtoken') === null) {
			authService
				.loginAnonymousUser()
				.then(res => {
					authService.saveSession(res);
					this.setIndexes();
					this.loadRandomProjects();
				})
				.catch(err => this.notifications.showMessage(err.responseJSON.description));
		} else {
			this.setIndexes();
			this.loadRandomProjects();
		}
	}

	componentWillReceiveProps (nextProps) {

		if (this.props.match.params.id !== nextProps.match.params.id) {
			this.setState({loading: true});
			this.props = nextProps;

			this.projectId = nextProps.match.params.id;

			this.setIndexes();

			this.setState({randomProjects: []}, () => this.loadRandomProjects());
		}
	}

	componentWillUnmount () {
		sessionStorage.removeItem('filteredProjects');
	}

	setIndexes = () => {

		let filteredProjectIds = JSON.parse(sessionStorage.getItem('filteredProjects'));

		if (!filteredProjectIds) {
			this.loadProject();
			return;
		}

		let currentProjectIndex = filteredProjectIds.indexOf(this.projectId);

		let nextProjectId = filteredProjectIds[currentProjectIndex + 1];
		let prevProjectId = filteredProjectIds[currentProjectIndex - 1];

		this.setState({
			currentProjectIndex,
			prevProjectId,
			nextProjectId
		}, () => this.loadProject());

	};

	loadProject = () => {
		projectsService
			.loadProjectData(this.projectId)
			.then(res => {
				this.setState({project: res});
			})
			.then(() => {
					clientsService
						.loadAllClients()
						.then(res => {
							let client = res.filter(e => e._id === this.state.project.clientId);
							this.setState({clientName: client[0], loading: false});
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
		this.setState({selectedImage: e.target.name});
	};

	hidePreview = () => {
		this.setState({selectedImage: ''});
	};

	render () {

		if (this.state.loading) {
			return (<div className="lds-dual-ring"/> );
		}

		let activeLanguage = this.context.language;

		let project = this.state.project;

		let isProjectLoaded = project !== '';

		let client = this.state.clientName.name[activeLanguage];

		let gallery, randomProjects;

		if (project !== '') {
			gallery = project.images.map(e => {
				return (
					<Card className="image" key={e}>
						<img src={e} className="img-fit" alt={e} name={e} onClick={this.showPreview}/>
					</Card>
				);
			});

			randomProjects = this.state.randomProjects.map((e, i) => {
				return (
					<ProjectCard key={e._id + i} project={e} activeLanguage={activeLanguage}/>
				);
			});
		}

		return (
			<div id="project" className="container-fluid">

				<GalleryPreview image={this.state.selectedImage} allImages={project.images} onClose={this.hidePreview}/>


				<div id="project-info">
					<section id="project-summary">
						<p>{project.name[activeLanguage]}</p>
						<p>{client}</p>
						{/*<p>{project.description[activeLanguage]}</p>*/}
						<p>{project.year}</p>
					</section>


					<section id="project-description">
						<article className="section">
							<h4 className="section-title">Идеята.</h4>
							<div className="section-text">
								<p> - Това не е просто календар. „Просто календар“ хората или вече
									не правят, защото го намират за „отживелица“, или влагат минимум средства и усилия,
									правейки го стандартен. А стандартни календари бол. Искам повече. Искам идеология.
									Искам тема, която да
									докосва. Нищо, че сме компания, която се занимава със строителни материали. Не
									значи, че не
									можем да се разпознаем в тема, която те грабва и прави с теб каквото си поиска.,
									леко
									въздъхна един от главните мениджъри на Сдружение Топливо след като вече беше
									поставил
									задачата си.
								</p>
								<p>
									- „Тема, която те грабва и прави с теб каквото си поиска.“, думите му оттекваха
									в главата ми като камбанен звън.
									- Мислил ли сте за посока? Посока, в която да тръгнем?
								</p>
								<p>

									Едно от най-важните неща за партньора, с когото работим и за нашия екип бе
									посоката, в която гледаме и вървим. Тя винаги трябва да е една и съща.
								</p>
							</div>
						</article>

						<article className="section">
							<h4 className="section-title">Посоката.</h4>
							<div className="section-text">
								<p>- Напоследък си мисля върху нещата, които остават след нас.
									Животът е сеитба, казват. А жътвата не е тук. Не че съм толкова стар и съм се
									замислил
									за завещание, но защо не направим календар с визии, които да завещават ценности.
									Нека
									бъде идеология и за компанията ни, и за хората, които ще го получат.
								</p>
							</div>
						</article>

						<article className="section">
							<h4 className="section-title">Нашата история.</h4>
							<div className="section-text">
								<p>Много труд и ентусиазъм. </p>
								<p>Броени дни преди проектът, решен в Калeндар и Тефтер, да влезе в печатница, в
									откровен разговор:</p>
								<p> - Много е силен. Браво. Само за заглавието не съм сигурен. Колебая се.
									„Завещанието“?!
									- Какво ви притеснява?, попитах бързо аз като се сещате какво ми мина през главата и
									как за секунди се очести ритъма на сърцето ми. Визии, текстове, всичко е не
									еднократно мислено, работено и прочитано... да сменим заглавието ...на прага на
									края...
									- Ами... много е силно. Завещанието. Самата дума е силна.
									- Нали затова го кръстихме така?!, репликирах на момента аз. Какъв е смисълът да
									направим силен проект със слабо заглавие. И то само, защото ни е страх как ще го
									приемат хората. Нима забравихте как звучи „Завещанието“. Позволете ми да ви зачета:
									„Казват, че всички ние имаме два живота. Вторият започва когато осъзнаем, че
									всъщност имаме само един. Всеки ден е подарък. Всяка сутрин - благословия. Всяка
									вечер - вдъхновение. Много дребни неща надживях, много падах, много ставах...“
									Внезапно решителен мъжки глас ме прекъсна с думите: „Пускай го за печат.“
								</p>
							</div>
						</article>

						<article className="section">
							<h4 className="section-title">Детайлите. Малките детайли.</h4>
							<div className="section-text">
								<p>Soft touch на корицата на тефтера. Още при първия допир усещаш, че държиш нещо скъпо.
									И в прекия, и в преносния смисъл. Цветовата комбинация на крафт и черно носи дух и
									стил на нещо много, много истинско. Различният шрифт и големина на завещаните думи:
									<b>Самоувереност. Вяра. Ентусиазъм. Трезвеност. Страст. Свобода. Богатство. Любов.
										Уют. Сила. Самота. Магия. </b> те сграбчват за гърлото и без да се усетиш
									зачиташ написаното. После просто искаш да го имаш. Искаш да имаш Завещанието. За
									подсилен ефект на твоето желание страниците са ръчно боядисани, в черно по края.

								</p>
								<p>Ние от Addict обичаме детайлите. И най-малките детайли.</p>

							</div>
						</article>

						{/*<div className="buttons-container">*/}
						{/*<Link to={this.state.prevProjectId !== undefined ? this.state.prevProjectId : '/projects'}*/}
						{/*className={this.state.prevProjectId !== undefined ? 'btn btn-light' : 'btn btn-light disabled'}>*/}
						{/*<i className="fa fa-arrow-left" aria-hidden="true"/>*/}
						{/*</Link>*/}

						{/*<Link to={this.state.nextProjectId !== undefined ? this.state.nextProjectId : '/projects'}*/}
						{/*className={this.state.nextProjectId !== undefined ? 'btn btn-light' : 'btn btn-light disabled'}>*/}
						{/*<i className="fa fa-arrow-right" aria-hidden="true"/>*/}
						{/*</Link>*/}

						{/*</div>*/}
					</section>
				</div>


				<ImagesContainer className="project-gallery">
					{gallery}
				</ImagesContainer>


				{/*<h2 className="section-title">{USER_PAGES_TEXT.project[activeLanguage].otherProjects}</h2>*/}
				{/*<div className="projects-container">*/}
				{/*{randomProjects}*/}
				{/*</div>*/}
			</div>
		);
	}

}

Project.contextType = LanguageContext;

export default Project;