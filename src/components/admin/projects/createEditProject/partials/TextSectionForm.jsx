import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';

// Partials
import FormSelectField from '../../../../common/formComponents/FormSelectField';

// Services
import sectionsService from '../../../../../services/projects/sectionsService';

// Constants
import { BUTTONS, CREATE_PROJECT_INPUTS } from '../../../../../constants/constants';

class TextSectionFrom extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			sectionId: '',
			textBG: '',
			textEN: '',

			sections: []
		};
	}

	componentDidMount () {

		let {sectionId, textBG, textEN, sections} = this.props;

		this.setState({
			sectionId: sectionId,
			textBG: textBG,
			textEN: textEN,
			sections: sections
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

		return (
			<div className="section">

				<FormSelectField name='sectionId'
				                 label={CREATE_PROJECT_INPUTS.bg.textSectionName}
				                 className='client-field'
				                 required={true}
				                 disabled={false}
					// selected={this.state.sections}
					             options={this.state.sections}
					             onChange={this.handleChange}/>

				<ReactQuill value={this.state.textBG}
				            onChange={this.handleTextChangeBG}/>

				<ReactQuill value={this.state.textEN}
				            onChange={this.handleTextChangeEN}/>


				<button className="btn md btn-primary"
				        onClick={this.submitInfo}>{BUTTONS.bg.add}
				</button>
			</div>
		);
	}
}

export default TextSectionFrom;

TextSectionFrom.propTypes = {
	sectionId: PropTypes.string,
	textBG: PropTypes.string,
	textEN: PropTypes.string,
	sections: PropTypes.array
};