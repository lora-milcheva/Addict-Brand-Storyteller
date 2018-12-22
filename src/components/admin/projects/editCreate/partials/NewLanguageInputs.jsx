import React from 'react';

import FormInput from '../../../../common/formComponents/FormInput';
import Textarea from '../../../../common/formComponents/TextArea';

import { CREATE_PROJECT_INPUTS } from '../../../../../constants/constants';

class NewLanguageInputs extends React.Component {

	render () {

		const {language, nameValue, descriptionValue, clientValue} = this.props;

		console.log(nameValue, descriptionValue, clientValue);


		return (
			<div className="inputs-holder">
				<FormInput type='text'
				           name='name'
				           value={nameValue}
				           id={'name-' + language}
				           placeholder=''
				           label={CREATE_PROJECT_INPUTS[language].name}
				           className='name-field'
				           required={true}
				           disabled={false}
				           onChange={this.props.onChange}/>

				<FormInput type='text'
				           name='client'
				           value={clientValue}
				           id={'client-' + language}
				           placeholder=''
				           label={CREATE_PROJECT_INPUTS[language].client}
				           className='client-field'
				           required={false}
				           disabled={false}
				           onChange={this.props.onChange}/>

				<Textarea name='description'
				          value={descriptionValue}
				          id={'description-' + language}
				          placeholder=''
				          label={CREATE_PROJECT_INPUTS[language].description}
				          className='description-field'
				          required={false}
				          onChange={this.props.onChange}/>
			</div>
		);
	}
}

export default NewLanguageInputs;
