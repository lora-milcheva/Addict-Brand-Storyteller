import React from 'react';
import PropTypes from 'prop-types';

class Messages extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			visible: this.props.visible,
			message: this.props.message
		};
	}

	componentDidMount () {
		this.props.onRef(this);
	}

	componentWillUnmount () {
		this.props.onRef(undefined);
	}

	showMessage = (message) => {
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

	render () {

		let isVisible = this.state.visible;

		return (
			<div id="messages"
			     className={isVisible ? 'visible' : ''}
			     onClick={this.hideMessage}>
				<div className="message">
					<p className="message-text">{this.state.message}</p>

					<button className="btn btn-primary" onClick={this.hideMessage}>Close</button>
				</div>

			</div>
		);
	}
}

export default Messages;

