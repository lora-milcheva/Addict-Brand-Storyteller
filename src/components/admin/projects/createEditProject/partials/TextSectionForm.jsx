import React from 'react';
import PropTypes from 'prop-types';

// Notifications
import Notifications from '../../../../common/notifications/Notifications';

// Partials
import FormSelectField from '../../../../common/formComponents/FormSelectField';
import FormInputField from '../../../../common/formComponents/FormInput';
import TextEditor from './TextEditor';
import Uploading from "../../../common/Uploading";


// Constants
import {BUTTONS, CREATE_PROJECT_INPUTS, NOTIFICATIONS} from '../../../../../constants/constants';
import fileService from '../../../../../services/projects/fileService';

class TextSectionFrom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stateProp: '',

            mediaId: '',
            sectionId: '',

            textBG: '',
            textEN: '',
            image: '',

            sections: [],

            visible: false,
        };
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    loadData = (data) => {

        this.setState({
            stateProp: data.stateProp,

            mediaId: data.mediaId,
            sectionId: data.sectionId,

            textBG: data.textBG,
            textEN: data.textEN,
            image: data.image,

            sections: data.sections,

            visible: true,
            uploading: false
        });
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleTextChangeBG = (value) => {
        this.setState({textBG: value});
    };

    handleTextChangeEN = (value) => {
        this.setState({textEN: value});
    };


    uploadImage = (e) => {

        const files = Array.from(e.target.files);

        let projectFolder = this.props.projectFolder;

        if (!projectFolder) {
            this.notifications.showMessage(NOTIFICATIONS.bg.noProjectFolder);
            return;
        }

        this.setState({uploading: true});

        if (this.state.image) {
            fileService
                .deleteFile(this.state.image)
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        }


        let data = new FormData();

        files.forEach((file, index) => {
            data.append(projectFolder + '/file_' + index, file);
        });


        fileService
            .uploadFiles(data)
            .then(res => {
                this.setState({uploading: false});

                let image = '/projectsData/' + projectFolder + '/' + JSON.parse(res['addedFiles'])[0];

                this.setState({
                    image: image,
                    uploading: false
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({uploading: false});
                this.notifications.showMessage(NOTIFICATIONS.bg.messageError);
            });
    };

    removeImage = (e) => {

        e.preventDefault();


        if (this.state.image) {
            fileService
                .deleteFile(this.state.image)
                .then(res => {
                    console.log(res);
                    this.setState({image: ''});
                })
                .catch(err => {
                    console.log(err);
                    this.notifications.showMessage(NOTIFICATIONS.bg.messageError)
                });
        }
    };

    submitInfo = (e) => {
        e.preventDefault();

        let s = this.state;

        // Check info
        if (!this.state.sectionId) {
            this.notifications.showMessage(NOTIFICATIONS.bg.selectSectionName);
            return;
        }

        let data = {
            [s.sectionId]: {
                bg: s.textBG,
                en: s.textEN,
                image: s.image
            }
        };

        if (this.state.stateProp === 'info') data[s.sectionId].image = s.image;

        this.state.stateProp === 'info'
            ? this.props.addTextSection(data, this.state.stateProp)
            : this.props.addMediaInfo(data, this.state.stateProp, this.state.mediaId);

        this.close();  // To close modal
    };

    close = () => {
        this.setState({
            stateProp: '',
            mediaId: '',
            sectionId: '',
            textBG: '',
            textEN: '',
            image: '',

            sections: [],

            visible: false
        });
    };

    render() {

        let isVisible = this.state.visible;

        // To prevent mounting of text editor with empty values
        if (!this.state.visible) return (<div className={'loader'}/>);

        return (
            <div className={isVisible ? 'visible' : ''}
                 id="info-section-inputs">

                <Notifications onRef={ref => (this.notifications = ref)} language='bg'/>
                <Uploading visible={this.state.uploading} onRef={ref => (this.uploading = ref)}/>

                <div className="form">

                    {this.state.image &&
                    <figure className="image">
                        <img src={this.state.image} alt="project cover" className="img-fit"/>
                        <button className="btn btn-primary xs del-btn"
                                name='cover'
                                onClick={this.removeImage}>{BUTTONS.en.clear}
                        </button>
                    </figure>}

                    <div className={'form-group input-wrapper btn btn-default sm'}>
                        <input type='file' name='image' className={'file-input'} onChange={this.uploadImage}
                               value={''}/>
                    </div>

                    <FormSelectField name='sectionId'
                                     label={CREATE_PROJECT_INPUTS.bg.textSectionName}
                                     className='client-field'
                                     required={true}
                                     disabled={false}
                                     defaultValue={this.state.sectionId}
                                     options={this.state.sections}
                                     onChange={this.handleChange}/>

                    <div className="form-group">
                        <label>{CREATE_PROJECT_INPUTS.bg.textBG}</label>

                        {this.state.visible !== '' &&
                        <TextEditor
                            value={this.state.textBG}
                            data-target-name={'textBG'}
                            onChange={this.handleTextChangeBG}/>
                        }
                    </div>


                    <div className="form-group">
                        <label>{CREATE_PROJECT_INPUTS.bg.textEN}</label>

                        {this.state.visible !== '' &&
                        <TextEditor
                            value={this.state.textEN}
                            onChange={this.handleTextChangeEN}/>
                        }
                    </div>


                    <div className="buttons-container text-center">
                        <button className="btn sm btn-default-light"
                                onClick={this.close}>{BUTTONS.bg.cancel}
                        </button>
                        <button className="btn sm btn-primary"
                                name={this.state.stateProp}
                                onClick={this.submitInfo}>{BUTTONS.bg.ok}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TextSectionFrom;

TextSectionFrom.propTypes = {
    projectFolder: PropTypes.string
};
