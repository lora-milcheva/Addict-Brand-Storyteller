import React from 'react';
import {LanguageContext} from '../../../common/languagesContext/LanguageContext';

// Partials
import PageHeader from '../../common/headers/PageHeader';
import ProjectCard from '../../common/projects/ProjectCard';

// Services
import projectsService from '../../../../services/projects/projectsService';
import authService from '../../../../services/auth/authService';

// Notifications
import Notifications from '../../../common/notifications/Notifications';

//Constants
import {PROJECTS} from "../../../../constants/projects";

class ProjectList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            loading: true
        };
    }

    componentDidMount() {

        // Log anonymous user if storage is empty
        // if (sessionStorage.getItem('authtoken') === null) {
        // 	authService
        // 		.loginAnonymousUser()
        // 		.then(res => {
        // 			authService.saveSession(res);
        // 			this.loadProjects();
        // 		})
        // 		.catch(err => this.notifications.showMessage(err.responseJSON.description));
        //
        // 	return;
        // }

        this.loadProjects();
    }

    loadProjects = () => {

        this.setState({
        })

        this.setState({
            projects: PROJECTS.filter(e => !e.isBlocked).sort((a, b) => Number(a.orderNumber) - Number(b.orderNumber)),
			loading: false
        })

        // let query = '?query={"isBlocked":false}';
		//
        // projectsService
        //     .loadAllProjects(query)
        //     .then(res => {
        //             res.sort((a, b) => Number(a.orderNumber) - Number(b.orderNumber))
        //             this.setState({projects: res, loading: false});
        //         }
        //     )
        //     .catch(err => {
        //         this.notifications.showMessage(err.responseJSON.description);
        //     });
    };

    render() {

        let activeLanguage = this.context.language;

        let projects = this.state.projects.map((e, i) => {
            return (
                <ProjectCard key={e._id + i}
                             project={e}
                             activeLanguage={activeLanguage}/>
            );
        });

        return (

            <div id="projects-list">

                <Notifications onRef={ref => (this.notifications = ref)} language={activeLanguage}/>

                <PageHeader language={activeLanguage} pageName='projects'/>

                {this.state.loading &&
                <div className="lds-dual-ring"/>}

                {!this.state.loading &&
                <section className="projects-container container section-padding-bottom">
                    {projects}
                </section>
                }

            </div>
        );
    }
}

ProjectList.contextType = LanguageContext;

export default ProjectList;