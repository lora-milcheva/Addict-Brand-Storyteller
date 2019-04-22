import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { BUTTONS } from '../../../constants/constants';

class AudioPlayer extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
		};
	}



	render () {

		let language = this.props.language;

		return (
			<div className='audio-layer'>
				<audio id="player" src="images/Éblouie_Par_La_Nuit.m4a"></audio>
				<div id="player-controls">
					<div className="player-scale"><span className="player-fill"></span></div>
					<button id="play-btn" className="btn btn-light xs"><img src="images/play-01.svg" alt='play'/></button>
					<button id="pause-btn" className="btn btn-light xs"><img src="images/pause-01.svg" alt='pause'/></button>
					<button id="stop-btn" className="btn btn-light xs"><img src="images/stop-01.svg" alt='stop'/></button>
					<button id="vol-up" className="btn btn-light xs"><img src="images/vol_up-01-01.svg" alt='volume up'/></button>
					<button id="vol-down" className="btn btn-light xs"><img src="images/vol_down-01-01.svg" alt='volume down'/></button>
				</div>
			</div>
		);
	}
}

export default AudioPlayer;

AudioPlayer.propTypes = {
	language: PropTypes.string,
};
