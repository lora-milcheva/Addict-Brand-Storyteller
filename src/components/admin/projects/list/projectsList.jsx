import React from 'react';


// Services
import projectsService from '../../../../services/projects/projectsService';

// Notifications
import Messages from '../../../common/Messages';

// Utils
import Utils from '../../../../utils/utils';

// Constants
import { LANGUAGES, CREATE_PROJECT_INPUTS, BUTTONS, CATEGORIES } from '../../../../constants/constants';

class projectsList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			projects: []
		};
	}

	componentDidMount () {

		projectsService
			.loadAllProjects()
			.then(res => {
				console.log(res);
				this.setState({projects: res})
			})
			.catch(err => console.log(err));

	}



	render () {



		return (
			<div id="projects-list" className="container">

				<Messages onRef={ref => (this.messages = ref)}/>

				<h1 className="page-title">Проекти</h1>


			</div>
		);
	}
}

export default projectsList;

