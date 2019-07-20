import React from 'react';
import { Link } from 'react-router-dom';

// Partials
import Buttons from '../common/Buttons'

// Services
import clientsService from '../../../services/clients/clientsService';

// Notifications
import Notifications from '../../common/Notifications';

// Constants
import { ADMIN_PAGES_TEXT } from '../../../constants/constants';


class categoriesList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			clients: [],

			loading: true
		};
	}

	componentDidMount () {

		clientsService
			.loadAllClients()
			.then(res => {
				this.setState({
					clients: res,
					loading: false
				});
			})
			.catch(err => console.log(err));

	}

	render () {

		let clients;

		if (this.state.clients.length > 0) {
			clients = this.state.clients.map(e => {
					return (
						<Link key={e._id} to={'/admin/client-edit/' + e._id}>
						<span  className="category-label">
							{e.name.bg}
						</span>
						</Link>
					);
				}
			);
		}

		if (this.state.loading) {
			return (<div className="lds-dual-ring"/> );
		}

		return (
			<div id="admin-clients-list" className="container">

				<Notifications onRef={ref => (this.notifications = ref)} language='bg'/>

				<div className="page-header">
					<h1 className="page-title">{ADMIN_PAGES_TEXT.client.bg.clients}</h1>
				</div>

				<Buttons />

				<div className="clients-container">
					{clients}
				</div>

			</div>
		);
	}
}

export default categoriesList;

