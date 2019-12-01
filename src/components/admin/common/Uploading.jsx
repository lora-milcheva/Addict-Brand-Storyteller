import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { BUTTONS } from '../../../constants/constants';


class Uploading extends React.Component {

    render () {

        let style = this.props.visible ? 'visible' : '';

        return (

            <div id='uploader' className={style}>
                <div className="lds-dual-ring"/>
                <p>{BUTTONS.bg.uploading}</p>
            </div>

        );
    }
}

export default Uploading;

Uploading.propTypes = {
    visible: PropTypes.bool
};