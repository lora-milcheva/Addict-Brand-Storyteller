import React from 'react';
import { LanguageContext } from '../../../common/languagesContext/LanguageContext';

// Partials import from user folder
import OurAim from '../../../user/home/partials/OurAim';
import OurPhilosophy from '../../../user/home/partials/OurPhilosophy';
import Services from '../../../user/home/partials/Services';
import Projects from '../../../user/home/partials/Projects';
import AboutUs from '../../../user/home/partials/AboutUs';

import PageHeader from '../../../user/common/headers/PageHeader';
import BlockQuote from '../../../user/common/articlePartials/BlockQuote';
import HomeProjectCard from '../../../user/common/projects/HomeProjectCard';


// Services
import projectsService from '../../../../services/projects/projectsService';

//Constants
import { BUTTONS } from '../../../../constants/constants';


class previewHome extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			projects: [],

			clients: [],
			categories: [],

			loading: true,

			videoMuted: true
		};

		this.video = React.createRef();
		this.unmuteBtn = React.createRef();
	}

	componentDidMount () {
		this.loadStarProjects();
	}

	loadStarProjects = () => {

		let query = '?query={"isStar":true}';

		projectsService
			.loadAllProjects(query)
			.then(res => {
				res.sort((a, b) => Number(a.orderNumber) - Number(b.orderNumber));
				this.setState({projects: res});
			})
			.catch(err => {
				this.notifications.showMessage(err.responseJSON.description);
			});
	};

	toggleVideoControls = () => {
		let video = this.video.current;

		video.controls = true;
		this.unmuteBtn.current.classList.add('invisible');

		this.setState({videoMuted: !this.state.videoMuted});
	};

	render () {

		let activeLanguage = this.context.language;

		let projects = Object.assign([], this.state.projects);

		let accentProject = projects.shift();

		return (
			<div id="home" className='container-fluid'>

				<PageHeader language={activeLanguage} pageName='home'/>

				<section id='video' className='container'>

					<video loop
					       autoPlay
					       muted={this.state.videoMuted}
					       controls={false}
					       controlsList="nodownload"
					       className='carousel-video'
					       ref={this.video}>
						<source src='/videos/home/video.mp4' type="video/mp4"/>
					</video>

					<button id='unmute-btn'
					        ref={this.unmuteBtn}
					        aria-label={BUTTONS[activeLanguage].playWithAudio}
					        onClick={this.toggleVideoControls}>
						{BUTTONS[activeLanguage].playWithAudio}

						<span className="slider"/>

					</button>
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

				<div className="buttons-container text-center">
					<button className='btn btn-default'
					        onClick={() => this.props.history.go(-1)}>{BUTTONS.bg.back}
					</button>
				</div>

			</div>

		);
	}
}

previewHome.contextType = LanguageContext;

export default previewHome;