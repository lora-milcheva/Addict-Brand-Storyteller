import React from 'react';

// Constants
import { BUTTONS } from '../../constants/constants';

class Notifications extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			visible: false,
			message: ''
		};
	}

	componentDidMount () {
		this.props.onRef(this);
	}

	componentWillUnmount () {
		this.props.onRef(undefined);
	}


	showMessage = (message) => {

		document.addEventListener('keypress', this.handleKeyPress);

		this.setState({
			visible: true,
			message: message
		});
	};

	hideMessage = () => {
		this.setState({
			visible: false,
			message: ''
		});
	};

	handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			this.hideMessage();
			document.removeEventListener('keypress', this.handleKeyPress);
		}
	};

	render () {

		let isVisible = this.state.visible;

		return (
			<div id="messages"
			     className={isVisible ? 'visible' : ''}
			     onClick={this.hideMessage}>
				<div className="message">
					<p className="message-text">{this.state.message}</p>

					<button className="btn btn-primary" onClick={this.hideMessage}>{BUTTONS.BG.close}</button>
				</div>

			</div>
		);
	}
}

export default Notifications;

