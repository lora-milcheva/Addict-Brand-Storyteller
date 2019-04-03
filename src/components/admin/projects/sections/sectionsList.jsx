import React from 'react';
import { Link } from 'react-router-dom';

// Services
import sectionsService from '../../../../services/projects/sectionsService';

// Notifications
import Notifications from '../../../common/Notifications';

// Constants
import { ADMIN_PAGES_TEXT } from '../../../../constants/constants';


class sectionsList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			sections: [],

			loading: true
		};
	}

	componentDidMount () {

		sectionsService
			.loadAllSections()
			.then(res => {
				this.setState({
					sections: res,
					loading: false
				});
			})
			.catch(err => console.log(err));

	}

	render () {

		let sections;

		if (this.state.sections.length > 0) {
			sections = this.state.sections.map(e => {
					return (
						<Link key={e._id} to={'/admin/section-edit/' + e._id}>
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
					<h1 className="page-title">{ADMIN_PAGES_TEXT.section.bg.sections}</h1>
				</div>

				<div className="clients-container">
					{sections}
				</div>

			</div>
		);
	}
}

export default sectionsList;

