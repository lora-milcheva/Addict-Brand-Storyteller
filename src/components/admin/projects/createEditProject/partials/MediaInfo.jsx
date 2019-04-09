import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { BUTTONS, NOTIFICATIONS } from '../../../../../constants/constants';

class MediaInfo extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			stateProp: '',
			id: '',
			info: {},

			allSectionIds: [],
			visible: false
		};
	}

	componentDidMount () {
		this.props.onRef(this);
	}

	componentWillUnmount () {
		this.props.onRef(undefined);
	}

	loadData = (data) => {
		this.setState({
			stateProp: data.stateProp,
			id: data.id,
			info: data.info,

			allSectionIds: data.sections,
			visible: true
		});
	};

	handleChange = (e) => {
		this.setState({sectionId: e.target.value});
	};

	submitInfo = (e) => {
		e.preventDefault();
	};

	cancel = () => {
		this.setState({
			stateProp: '',
			id: '',
			info: {},

			allSectionIds: [],
			visible: false
		});
	};

	render () {

		let isVisible = this.state.visible;

		let info = Object.keys(this.state.info).map(e => {

			let section = this.state.allInfoSectionIds.filter(s => s._id === e)[0];
			let text = this.state.info[e];

			return (
				<div key={e} className="info-text">

					<div className="section-header">
						<h3 className="title">{section.name.bg}&nbsp;&nbsp;| </h3>
						<button className="btn btn-default xs"
						        data-state-prop={'info'}
						        name={e}
						        onClick={this.loadTextSectionForm}>{BUTTONS.bg.edit}
						</button>
						<button className="btn btn-default xs"
						        name={e}
						        data-state-prop={'info'}
						        onClick={this.removeInfoSection}>{BUTTONS.bg.delete}
						</button>
					</div>

					<span className="label">BG</span>
					<div dangerouslySetInnerHTML={{__html: text.bg}}
					     className="text"/>

					<span className="label">EN</span>
					<div dangerouslySetInnerHTML={{__html: text.en}}
					     className="text"/>
				</div>
			);
		});

		return (
			<div className={isVisible ? 'visible' : ''}
			     onClick={this.hideMessage}
			     id="media-info">

				<div className='info'>

					<div className="buttons-container text-center">
						<button className="btn sm btn-default-light"
						        data-state-prop={this.state.stateProp}
						        name={this.state.id}
						        onClick={this.props.loadTextSectionForm}>{BUTTONS.bg.addSection}
						</button>
					</div>

					{info}

					<div className="buttons-container text-center">
						<button className="btn sm btn-default-light"
						        onClick={this.cancel}>{BUTTONS.bg.cancel}
						</button>
						<button className="btn sm btn-primary"
						        name={this.state.stateProp}
						        onClick={this.submitInfo}>{BUTTONS.bg.add}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default MediaInfo;
