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

			let section = this.state.allSectionIds.filter(s => s._id === e)[0];
			let text = this.state.info[e];

			console.log(e)

			return (
				<div key={e} className="info-text">

					<div className="section-header">
						<h3 className="title">{section.name.bg}&nbsp;&nbsp;| </h3>
						<button className="btn btn-default xs"
						        data-state-prop={this.state.stateProp}
						        data-el-id={this.state.id}
						        data-section-name={e}
						        onClick={this.props.loadTextSectionForm}>{BUTTONS.bg.edit}
						</button>
						<button className="btn btn-default xs"
						        name={e}
						        data-state-prop={this.state.stateProp}
						        data-el-id={this.state.id}
						        data-section-name={e}
						        onClick={this.props.deleteSection}>{BUTTONS.bg.delete}
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
						        data-el-id={this.state.id}
						        data-section-name={null}
						        onClick={this.props.loadTextSectionForm}>{BUTTONS.bg.addSection}
						</button>
					</div>

					{info}

					<div className="buttons-container text-center">
						<button className="btn sm btn-default-light"
						        onClick={this.cancel}>{BUTTONS.bg.close}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default MediaInfo;
