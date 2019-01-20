import React from 'react';
import { Link } from 'react-router-dom';

// Services
import clientsService from '../../../services/clients/clientsService';

// Notifications
import Notifications from '../../common/Notifications';


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
						<Link to={'/admin/client-edit/' + e._id}>
						<span key={e._id} className="category-label">
							{e.name.bg}
						</span>
						</Link>
					);
				}
			);
		}

		if (this.state.projectLoading) {
			return (<div className="lds-dual-ring"/> );
		}

		return (
			<div id="admin-clients-list" className="container">

				<Notifications onRef={ref => (this.notifications = ref)} lang='bg'/>

				<div className="page-header">
					<h1 className="page-title">Клиенти</h1>
				</div>

				<div className="clients-container">
					{clients}
				</div>

			</div>
		);
	}
}

export default categoriesList;

