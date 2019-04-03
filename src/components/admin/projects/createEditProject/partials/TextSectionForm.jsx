import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';

import { BUTTONS, CREATE_PROJECT_INPUTS} from '../../../../../constants/constants';



class TextSectionFrom extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			sectionTitle: '',
			textBG: '',
			textEN: ''
		};
	}

	componentDidMount () {

		let {sectionTitle, textBG, textEN} = this.props;

		this.setState({
			sectionTitle: sectionTitle,
			textBG: textBG,
			textEN: textEN
		})
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
			sectionTitle: s.sectionTitle,
			text: {
				bg: s.textBG,
				en: s.textEN
			}
		};

		this.props.submit(data);
	};

	render () {

		return (
			<div className="add-form-group">
				<label>{CREATE_PROJECT_INPUTS.bg.textSectionName}</label>

				<input className="form-control"
				       type="text"
				       onChange={this.handleChange}
				       name="sectionTitle"
				       value={this.state.sectionTitle}>
				</input>

				<ReactQuill value={this.state.textBG}
				            onChange={this.handleTextChangeBG}/>
				
				<ReactQuill value={this.state.textEN}
				            onChange={this.handleTextChangeEN}/>


				<button className="btn md btn-primary add-on-btn"
				        onClick={this.submitInfo}>{BUTTONS.bg.add}
				</button>
			</div>
		);
	}
}

export default TextSectionFrom;

TextSectionFrom.propTypes = {
	sectionTitle: PropTypes.string,
	textBG: PropTypes.string,
	textEN: PropTypes.string,
};