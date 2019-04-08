import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Constants
import {BUTTONS} from '../../../constants/constants';


class HomeProjectCard extends React.Component {

	render () {

		let project = this.props.project;

		let activeLanguage = this.context.language;

		return (
			<article className="project-card">
				<div className="img-container">
					<img className="img-fit" src={project.thumbnail} alt={project.name[activeLanguage]}/>
				</div>


				<Link to={'/projects/all/' + project._id} className="hover">
					<div className="info">
						{/*<p className="project-client">{project.clientName[activeLanguage]}</p>*/}
						<p>{project.name[activeLanguage]}&nbsp;&#8212;&nbsp;{project.year}</p>
						{/*<button className="btn btn-default sm">{BUTTONS[activeLanguage].view}</button>*/}
					</div>
				</Link>
			</article>
		);
	}
}

HomeProjectCard.contextType = LanguageContext;

export default HomeProjectCard;

HomeProjectCard.propTypes = {
	project: PropTypes.object,
	activeLanguage: PropTypes.string,
};