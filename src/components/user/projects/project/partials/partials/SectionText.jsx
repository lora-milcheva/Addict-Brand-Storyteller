import React from 'react';
import PropTypes from 'prop-types';

// HOC
import AnimateOnScroll from '../../../../HOC/AnimateOnScroll';


class SectionText extends React.Component {

	render () {

		let { sectionName, sectionText} = this.props;

		return (

			<article className="info-section container section-padding-top">
				<div className="section-header">
					<h2 className="section-title">{sectionName}</h2>
				</div>
				<div className='section-text' style={{color: 'inherit'}}
				     dangerouslySetInnerHTML={{__html: sectionText}}/>
			</article>
		);
	}
}

const WrappedComponent = AnimateOnScroll(SectionText, 'fadeIn', 200, 2);

export default WrappedComponent;

SectionText.propTypes = {
	sectionName: PropTypes.string,
	sectionText: PropTypes.string
};