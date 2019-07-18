import React from 'react';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Partials
import PageHeader from '../common/headers/PageHeader';
import OurAim from './partials/OurAim';
import OurPhilosophy from './partials/OurPhilosophy';
import Services from './partials/Services';
import Projects from './partials/Projects';
import AboutUs from './partials/AboutUs';
import BlockQuote from '../common/articlePartials/BlockQuote';

// Services
import authService from '../../../services/auth/authService';
import projectsService from '../../../services/projects/projectsService';
import clientsService from '../../../services/clients/clientsService';
import categoriesService from '../../../services/categories/categoriesService';
import HomeProjectCard from '../common/projects/HomeProjectCard';

class Home extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			projects: [],

			clients: [],
			categories: [],

			btnVisible: false,

			loading: true
		};

	}

	componentDidMount () {

		document.addEventListener('scroll', this.showHideBtn);

		// Clear filtered by category projects
		sessionStorage.removeItem('filteredProjects');

		// Log anonymous user if storage is empty
		if (sessionStorage.getItem('authtoken') === null) {
			authService
				.loginAnonymousUser()
				.then(res => {
					authService.saveSession(res);
					this.loadStarProjects();
				})
				.catch(err => this.notifications.showMessage(err.responseJSON.description));

			return;
		}

		this.loadStarProjects();
	}

	componentWillUnmount () {
		document.removeEventListener('scroll', this.showHideBtn);
	}

	showHideBtn = () => {

		if (!this.state.btnVisible) {
			if (window.scrollY > window.innerHeight - 500) {
				this.setState({btnVisible: true});
			}
		} else {
			if (window.scrollY < window.innerHeight - 500) {
				this.setState({btnVisible: false});
			}
		}
	};

	loadStarProjects = () => {

		let query = '?query={"isStar":true}';

		projectsService
			.loadAllProjects(query)
			.then(res => {

				res.sort((a, b) => Number(a.orderNumber) - Number(b.orderNumber));

				this.setState({projects: res});

				clientsService
					.loadAllClients()
					.then(res => {

						this.setState({sections: res});

						this.state.projects.forEach(p => {
							p.clientName = this.state.sections.filter(c => c._id === p.clientId)[0].name;
						});

						categoriesService
							.loadAllCategories()
							.then(res => {
								this.setState({categories: res, loading: false});
							})
							.catch(err => {
								this.notifications.showMessage(err.responseJSON.description);
							});

					})
					.catch(err => {
						this.notifications.showMessage(err.responseJSON.description);
					});

			})
			.catch(err => {
				this.notifications.showMessage(err.responseJSON.description);
			});
	};

	scrollTop = () => {
		window.scroll(0, 0);
	};

	render () {

		let activeLanguage = this.context.language;

		let projects = Object.assign([], this.state.projects);

		let accentProject = projects.shift();

		let btnStyle = this.state.btnVisible ? 'btn btn-default visible' : 'btn btn-default';

		return (
			<div id="home" className='container-fluid'>

				<button id='go-to-top-btn'
				        className={btnStyle}
				        onClick={this.scrollTop}>Top
				</button>

				<PageHeader language={activeLanguage} pageName='home'/>

				<section className='container section-padding-bottom'>
					<video autoPlay={true}
					       loop={true}
					       className='carousel-video'
					       controls={false}>
						<source src='videos/home/stories_02.mp4' type="video/mp4"/>
					</video>
				</section>

				<OurAim language={activeLanguage}/>

				<HomeProjectCard activeLanguage={activeLanguage} project={accentProject}/>

				<OurPhilosophy language={activeLanguage}/>

				<Projects projects={projects} language={activeLanguage}/>

				<Services language={activeLanguage}/>

				<BlockQuote language={activeLanguage}
				            pageName='home'
				            sectionName='quote'/>

				<AboutUs language={activeLanguage}/>

			</div>

		);
	}
}

Home.contextType = LanguageContext;

export default Home;