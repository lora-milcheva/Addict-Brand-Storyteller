import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { BUTTONS } from '../../../constants/constants';

class ConfirmDialog extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			visible: false,
			message: '',
			function: ''
		};
	}

	componentDidMount () {
		this.props.onRef(this);
	}

	componentWillUnmount () {
		this.props.onRef(undefined);
	}

	showMessage = (message, callback) => {
		this.setState({
			visible: true,
			message: message,
			function: callback
		});
	};

	confirm = () => {
		this.state.function();
	};

	hideMessage = () => {
		this.setState({
			visible: false,
			message: ''
		});
	};

	render () {

		let isVisible = this.state.visible;

		let language = this.props.language;

		return (
			<div id="confirm-dialog"
			     className={isVisible ? 'visible' : ''}
			     onClick={this.hideMessage}>
				<div className="notification">
					<p className="notification-text">{this.state.message}</p>

					<button className="btn btn-default-light md" aria-label={BUTTONS[language].cancel} onClick={this.hideMessage}>{BUTTONS[language].cancel}</button>
					<button className="btn btn-default md" aria-label={BUTTONS[language].confirm} onClick={this.confirm}>{BUTTONS[language].confirm}</button>
				</div>

			</div>
		);
	}
}

export default ConfirmDialog;

ConfirmDialog.propTypes = {
	language: PropTypes.string,
};
