import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';

// Partials
import FormSelectField from '../../../../common/formComponents/FormSelectField';

// Services
import sectionsService from '../../../../../services/projects/sectionsService';

// Constants
import { BUTTONS, CREATE_PROJECT_INPUTS, NOTIFICATIONS } from '../../../../../constants/constants';

class TextSectionFrom extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			sectionId: '',
			textBG: '',
			textEN: '',

			sections: [],

			visible: false
		};
	}

	componentDidMount () {

		let {sectionId, textBG, textEN, sections, visible} = this.props;

		this.setState({
			sectionId: sectionId,
			textBG: textBG,
			textEN: textEN,
			sections: sections,
			visible: visible
		});
	}



	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	handleTextChangeBG = (value) => {
		this.setState({textBG: value});
	};

	handleTextChangeEN = (value) => {
		this.setState({textEN: value});
	};

	submitInfo = (e) => {
		e.preventDefault();

		let s = this.state;

		// Check info

		if (!this.state.sectionId) {
			this.props.notifications.showMessage(NOTIFICATIONS.bg.selectSectionName);
			return;
		}

		let data = {
			[s.sectionId]: {
				bg: s.textBG,
				en: s.textEN
			}
		};

		this.props.submit(data);
	};

	render () {

		if (this.state.loading) return (<div className="loader"/>);

		let isVisible = this.props.visible;

		return (
			<div className={isVisible ? 'visible' : ''}
			     onClick={this.hideMessage}
			     id="info-section-inputs">

				<div className="form form-control" >
					<div className="buttons-container">
						<a href="/admin/section-create" className="btn btn-default-light xs">
							{BUTTONS.bg.createSection}
						</a>
					</div>


					<FormSelectField name='sectionId'
					                 label={CREATE_PROJECT_INPUTS.bg.textSectionName}
					                 className='client-field'
					                 required={true}
					                 disabled={false}
						// selected={this.state.sections}
						             options={this.state.sections}
						             onChange={this.handleChange}/>

					<div className="form-group">
						<label>{CREATE_PROJECT_INPUTS.bg.textBG}</label>
						<ReactQuill value={this.state.textBG}
						            onChange={this.handleTextChangeBG}/>
					</div>


					<div className="form-group">
						<label>{CREATE_PROJECT_INPUTS.bg.textEN}</label>
						<ReactQuill value={this.state.textEN}
						            onChange={this.handleTextChangeEN}/>
					</div>


					<div className="buttons-container text-center">
						<button className="btn sm btn-default-light"
						        onClick={this.props.cancel}>{BUTTONS.bg.cancel}
						</button>
						<button className="btn sm btn-primary"
						        onClick={this.submitInfo}>{BUTTONS.bg.add}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default TextSectionFrom;

TextSectionFrom.propTypes = {
	sectionId: PropTypes.string,
	textBG: PropTypes.string,
	textEN: PropTypes.string,
	sections: PropTypes.array,
	visible: PropTypes.bool
};