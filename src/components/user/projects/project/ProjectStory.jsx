import React from 'react';
import {LanguageContext} from '../../../common/languagesContext/LanguageContext';

// SEO
import SEO_MetaTags_Dynamic from "../../common/SEO_MetaTags_Dynamic";

// Partials
import ProjectHeader from './partials/ProjectHeader';
import ProjectInfo from './partials/ProjectInfo';
import ImagePreview from './partials/ImagePreview';
import ImageGallery from './partials/ImageGallery';
import VideoGallery from './partials/VideoGallery';

import RandomProjects from '../../common/projects/RandomProjects';
import SectionHeader from '../../common/headers/SectionHeader';

// Services
import projectsService from '../../../../services/projects/projectsService';
import sectionsService from '../../../../services/projects/sectionsService';
import clientsService from '../../../../services/clients/clientsService';
import authService from '../../../../services/auth/authService';

// Constants
import {PROJECTS} from "../../../../constants/projects";
import {INFO_SECTIONS, CLIENTS} from "../../../../constants/infoSectionsAndClients";


class ProjectStory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            project: {},

            clientName: '',

            selectedImage: '',

            allSections: [],

            direction: '',

            loading: true
        };

        this.image = React.createRef();
    }

    projectId = this.props.match.params.id;

    componentDidMount() {

        document.addEventListener('keydown', this.handleKeyPress);

        // Log anonymous user if storage is empty
        // if (sessionStorage.getItem('authtoken') === null) {
        // 	authService
        // 		.loginAnonymousUser()
        // 		.then(res => {
        // 			authService.saveSession(res);
        // 			this.loadProject();
        // 		})
        // 		.catch(err => this.notifications.showMessage(err.responseJSON.description));
        // } else {
        // 	this.loadProject();
        // }

        this.loadProject();
    }

    componentWillReceiveProps(nextProps, nextContext) {

        // To reload page when select different project

        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.setState({loading: true});

            this.projectId = nextProps.match.params.id;

            this.loadProject();
        }
    }

    componentWillUnmount() {
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

        let project = PROJECTS.filter(p => p.url === this.projectId)[0]

        this.setState({
                project: project,
                allSections: INFO_SECTIONS,
                clientName: CLIENTS[project.clientId] || '',
                loading: false
            }
        )

        // projectsService
        //     .loadProjectData(this.projectId)
        //     .then(res => {
        //         this.setState({project: res});
        //
        //         sectionsService
        //             .loadAllSections()
        //             .then(res => {
        //                 this.setState({allSections: res});
        //
        //                 if (this.state.project.clientId) {
        //                     clientsService
        //                         .loadAllClients()
        //                         .then(res => {
        //                             let client = res.filter(e => e._id === this.state.project.clientId);
        //                             this.setState({clientName: client[0], loading: false});
        //                         });
        //                 } else {
        //                     this.setState({loading: false});
        //                 }
        //             });
        //     })
        //     .catch(err => {
        //         this.notifications.showMessage(err.responseJSON.description);
        //     });
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

    render() {

        if (this.state.loading) return (<div className="lds-dual-ring"/>);

        let activeLanguage = this.context.language;

        let urlPath = this.props.location.pathname;

        let project = this.state.project;

        let sections = this.state.allSections;


        return (
            <div id="project-story" className="container-fluid">

                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <SEO_MetaTags_Dynamic activeLanguage={activeLanguage} pageName={'single-project'} projectName={project.name} url={urlPath} />

                {this.state.selectedImage !== '' &&
                <ImagePreview image={this.state.selectedImage}
                              projectFolder={project.projectFolder}
                              allImages={project.images}
                              activeLanguage={activeLanguage}
                              onClose={this.hidePreview}/>
                }


                <ProjectHeader activeLanguage={activeLanguage} project={project} client={this.state.clientName[activeLanguage]}/>


                <ProjectInfo activeLanguage={activeLanguage} project={project} sections={sections}/>

                {this.state.project.videos.length > 0 &&
                <VideoGallery videos={project.videos}
                              projectFolder={project.projectFolder}
                              sections={sections}
                              direction={this.state.direction}
                              language={activeLanguage}
                              changeState={this.changeState}/>
                }


                {this.state.project.images.length > 0 &&
                <ImageGallery images={project.images}
                              projectFolder={project.projectFolder}
                              sections={sections}
                              showPreview={this.showPreview}
                              direction={this.state.direction}
                              language={activeLanguage}
                              changeState={this.changeState}/>
                }


                <section id='other-projects' className='section-padding-top-bottom bg-light'>
                    <SectionHeader pageName='project' language={activeLanguage} sectionName='otherProjects'/>

                    <RandomProjects language={activeLanguage} currentProjectId={this.projectId}/>
                </section>

            </div>
        );
    }

}

ProjectStory.contextType = LanguageContext;

export default ProjectStory;

