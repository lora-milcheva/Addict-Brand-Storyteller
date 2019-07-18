import React from 'react';
import { Link } from 'react-router-dom';

// Partials
import ProjectCard from './partials/ProjectCard';
import SortableList from './partials/SortableList';

// Services
import projectsService from '../../../../services/projects/projectsService';

// Notifications
import Notifications from '../../../common/Notifications';

// Constants
import { BUTTONS, ADMIN_PAGES_TEXT, NOTIFICATIONS } from '../../../../constants/constants';

class projectsList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			projects: [],

			loading: true
		};
	}

	componentDidMount () {

		if (sessionStorage.length === 0) {
			this.props.history.push('/');
		}

		projectsService
			.loadAllProjects()
			.then(res => {

				res.sort((a, b) =>  Number(a.orderNumber) - Number(b.orderNumber))

				this.setState({
					projects: res,
					loading: false
				});
			})
			.catch(err => console.log(err));

	}


	saveOrder = () => {
		this.state.projects.forEach((p, i) => {
			p.orderNumber = i;

			projectsService
				.editProject(p._id, p)
				.then(res => {
					this.notifications.showMessage(NOTIFICATIONS.bg.successEdit);
				})
				.catch(err => {
					console.log(err);
					this.notifications.showMessage(NOTIFICATIONS.bg.messageError)
				});
		});
	};

	handleNewOrder = (stateProp, reorderedElements) => {
		this.setState({[stateProp]: reorderedElements});
	};

	render () {

		if (this.state.loading) return <div className="lds-dual-ring"/>;


		return (
			<div id="admin-projects-list" className="container">

				<Notifications onRef={ref => (this.notifications = ref)} language='bg'/>

				<div className="page-header">
					<h1 className="page-title">{ADMIN_PAGES_TEXT.project.bg.allProjects}</h1>
				</div>

				<div className="buttons-container">
					<Link to="/admin/project-create" className="btn btn-primary sm">{BUTTONS.bg.createProject}</Link>
					<Link to="/admin/client-create" className="btn btn-primary sm">{BUTTONS.bg.createClient}</Link>
					<Link to="/admin/category-create" className="btn btn-primary sm">{BUTTONS.bg.createCategory}</Link>
					<Link to="/admin/section-create" className="btn btn-primary sm">{BUTTONS.bg.createSection}</Link>
				</div>


				<div className="projects-container">

					<SortableList name={'projects'}
					              elements={this.state.projects}
					              onChange={this.handleNewOrder}/>
				</div>

				<div className='buttons-container'>
					<button className='btn btn-primary sm'
					        onClick={this.saveOrder}>Save
					</button>
				</div>

			</div>
		);
	}
}

export default projectsList;

