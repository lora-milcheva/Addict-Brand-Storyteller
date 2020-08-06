import React from 'react';
import {LanguageContext} from '../../common/languagesContext/LanguageContext';

// SEO
import SEO_MetaTags from "../common/SEO_MetaTags";

// Partials
import OurAim from './partials/OurAim';
import OurPhilosophy from './partials/OurPhilosophy';
import Services from './partials/Services';
import Projects from './partials/Projects';
import AboutUs from './partials/AboutUs';
import BlockQuote from '../common/articlePartials/BlockQuote';
import HomeProjectCard from '../common/projects/HomeProjectCard';
import PageHeader from '../common/headers/PageHeader';

// Services
import authService from '../../../services/auth/authService';
import projectsService from '../../../services/projects/projectsService';

//Constants
import {BUTTONS} from '../../../constants/constants';
import {PROJECTS} from "../../../constants/projects";



class Home extends React.Component {
    constructor(props) {
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

    componentDidMount() {

        // Log anonymous user if storage is empty
        // if (sessionStorage.getItem('authtoken') === null) {
        // 	authService
        // 		.loginAnonymousUser()
        // 		.then(res => {
        // 			authService.saveSession(res);
        // 			this.loadStarProjects();
        // 		})
        // 		.catch(err => this.notifications.showMessage(err.responseJSON.description));
        //
        // 	return;
        // }

        this.loadStarProjects();
    }

    loadStarProjects = () => {

        this.setState({
            // projects: PROJECTS.filter(e => e.isStar && !e.isBlocked).sort((a, b) => Number(a.orderNumber) - Number(b.orderNumber))
            projects: PROJECTS.filter(e => e.isStar && !e.isBlocked)
        })

        // let query = '?query={"isStar":true,"isBlocked":false}';
        //
        // projectsService
        // 	.loadAllProjects(query)
        // 	.then(res => {
        // 		res.sort((a, b) => Number(a.orderNumber) - Number(b.orderNumber));
        // 		this.setState({projects: res});
        // 	})
        // 	.catch(err => {
        // 		this.notifications.showMessage(err.responseJSON.description);
        // 	});
    };

    toggleVideoControls = () => {
        let video = this.video.current;

        video.controls = true;
        this.unmuteBtn.current.classList.add('invisible');

        this.setState({videoMuted: !this.state.videoMuted});
    };

    render() {

        let activeLanguage = this.context.language;

        let urlPath = this.props.location.pathname;

        let projects = Object.assign([], this.state.projects); // Split projects

        let accentProject = projects.shift(); // Split projects

        return (
            <div id="home" className='container-fluid'>

                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <SEO_MetaTags activeLanguage={activeLanguage} pageName={'home'} url={urlPath}/>

                <PageHeader language={activeLanguage} pageName='home'/>

                <section id='video' className='container'>

                    <video loop
                           autoPlay
                           muted={this.state.videoMuted}
                           controls={false}
                           controlsList="nodownload"
                           className='carousel-video'
                           ref={this.video}>
                        <source src='videos/home/video.mp4' type="video/mp4"/>
                    </video>

                    <button id='unmute-btn'
                            ref={this.unmuteBtn}
                            aria-label={BUTTONS[activeLanguage].playWithAudio}
                            onClick={this.toggleVideoControls}>
                        {/*{this.state.videoMuted && <i className="fa fa-volume-up" aria-hidden="true"/>}*/}
                        {/*{!this.state.videoMuted && <i className="fa fa-volume-off" aria-hidden="true"/>}*/}
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

            </div>

        );
    }
}

Home.contextType = LanguageContext;

export default Home;