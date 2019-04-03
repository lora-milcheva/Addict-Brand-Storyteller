import React from 'react';
import { Link } from 'react-router-dom';

// Services
import categoriesService from '../../../services/categories/categoriesService';

// Notifications
import Notifications from '../../common/Notifications';

// Constants
import { ADMIN_PAGES_TEXT } from '../../../constants/constants';



class categoriesList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			categories: [],

			loading: true
		};
	}

	componentDidMount () {

		categoriesService
			.loadAllCategories()
			.then(res => {
				this.setState({
					categories: res,
					loading: false
				});
			})
			.catch(err => console.log(err));

	}

	render () {

		let categories;

		if (this.state.categories.length > 0) {
			categories = this.state.categories.map(e => {
					return (
						<Link key={e._id} to={'/admin/category-edit/' + e._id}>
						<span className="category-label">
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
			<div id="admin-categories-list" className="container">

				<Notifications onRef={ref => (this.notifications = ref)} language='bg'/>

				<div className="page-header">
					<h1 className="page-title">{ADMIN_PAGES_TEXT.category.bg.categories}</h1>
				</div>

				<div className="categories-container">
					{categories}
				</div>

			</div>
		);
	}
}

export default categoriesList;

