import React from 'react';
import { Link } from 'react-router-dom';

// Constants
import { BUTTONS } from '../../../constants/constants';

class Buttons extends React.Component {

	render () {

		return (

			<div className="buttons-container">
				<Link to="/admin/project-create" className="btn btn-default sm">{BUTTONS.bg.createProject}</Link>
				<Link to="/admin/client-create" className="btn btn-default-light sm">{BUTTONS.bg.createClient}</Link>
				<Link to="/admin/category-create" className="btn btn-default-light sm">{BUTTONS.bg.createCategory}</Link>
				<Link to="/admin/section-create" className="btn btn-default-light sm">{BUTTONS.bg.createSection}</Link>
			</div>

		);
	}
}

export default Buttons;

