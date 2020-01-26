import React from 'react';

// Partials
import Buttons from '../../common/Buttons';
import SortableList from './partials/SortableList';

// Services
import projectsService from '../../../../services/projects/projectsService';

// Notifications
import Notifications from '../../../common/notifications/Notifications';

// Constants
import { ADMIN_PAGES_TEXT, NOTIFICATIONS, BUTTONS } from '../../../../constants/constants';

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

				res.sort((a, b) => Number(a.orderNumber) - Number(b.orderNumber));

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
					this.notifications.showMessage(NOTIFICATIONS.bg.messageError);
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

				<div className="admin-page-header">
					<h1 className="page-title">{ADMIN_PAGES_TEXT.project.bg.projects}</h1>
				</div>

				<Buttons />

				<SortableList name={'projects'}
				              elements={this.state.projects}
				              onChange={this.handleNewOrder}/>

				<div className='buttons-container text-center'>
					<button className='btn btn-default md'
					        onClick={this.saveOrder}>
						<i className="fa fa-check" aria-hidden="true"/>
						&nbsp; {BUTTONS.bg.saveOrder}
					</button>
				</div>

			</div>
		);
	}
}

export default projectsList;

