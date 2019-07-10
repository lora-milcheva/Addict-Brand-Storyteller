import React from 'react';
import { Link } from 'react-router-dom';

import { BUTTONS } from '../../../../constants/constants';


class AccentProject extends React.Component {

	render () {

		let activeLanguage = this.props.language;
		let project = this.props.project;

		if (project === undefined) {
			return <div className={'loader'}/>
		}

		return (

			<section id="accent-project">

				<figure className="img-container">
					<img className="img-fit" src={project.thumbnail} alt={project.name[activeLanguage]}/>
				</figure>

				<div className="project-info">
					<div>
						<p className='project-name'>{project.name[activeLanguage]}</p>
						<p className='cliche'>{project.description[activeLanguage]}</p>
					</div>
					<Link to={'projects/' + project._id} className="btn btn-default-light lg">{BUTTONS[activeLanguage].seeProject}</Link>
				</div>
			</section>
		);
	}
}

export default AccentProject;