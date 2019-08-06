import React from 'react';
import PropTypes from 'prop-types';



class InfoSection extends React.Component {

	render () {

		let {image, sectionName, sectionText} = this.props;

		return (

			<section>

				{image !== '' &&
				<img src={image} className='section-image' alt='section image'/>
				}

				<article className="info-section container section-padding-top">
					<div className="section-header">
						<h2 className="section-title">{sectionName}</h2>
					</div>
					<div className='section-text' style={{color: 'inherit'}}
					     dangerouslySetInnerHTML={{__html: sectionText}}/>
				</article>

			</section>

		);
	}
}

export default InfoSection;

InfoSection.propTypes = {
	image: PropTypes.string,
	sectionName: PropTypes.string,
	sectionText: PropTypes.string,
};