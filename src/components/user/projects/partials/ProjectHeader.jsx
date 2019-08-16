import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';

// Constants
import { USER_PAGES_TEXT } from '../../../../constants/constants';

const ListContainer = posed.ul({
	enter: {staggerChildren: 50},
	exit: {staggerChildren: 20, staggerDirection: -1}
});

const Item = posed.li({
	enter: {y: 0, opacity: 1},
	exit: {y: 50, opacity: 0}
});

class ProjectHeader extends React.Component {

	render () {

		let {activeLanguage, project, client} = this.props;

		return (

			<section id="project-header">

				<figure className="img-container">
					<img src={project.cover} className='img-fit' alt='page cover'/>
				</figure>


				<div className='container section-padding-top'>
					<ListContainer>

						<Item>
							<p className='project-name'>
								{USER_PAGES_TEXT.project[activeLanguage].project}{project.name[activeLanguage]}
							</p>
						</Item>


						<Item>
							{client !== '' &&
							<p className='client'>{USER_PAGES_TEXT.project[activeLanguage].client}{client} </p>
							}
						</Item>


						<Item>
							<h2 className="cliche">
								<span className="field">{USER_PAGES_TEXT.project[activeLanguage].cliche}</span>
								{project.description[activeLanguage]}
							</h2>
						</Item>

					</ListContainer>

				</div>


			</section>

		);
	}
}

export default ProjectHeader;

ProjectHeader.propTypes = {
	activeLanguage: PropTypes.string,
	project: PropTypes.object,
	client: PropTypes.string,
};