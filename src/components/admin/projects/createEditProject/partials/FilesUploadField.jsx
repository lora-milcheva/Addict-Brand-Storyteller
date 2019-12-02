import React from 'react';
import DropToUpload from 'react-drop-to-upload';
import PropTypes from 'prop-types';

// Partials
import Uploading from "../../../common/Uploading";

// Services
import fileService from '../../../../../services/projects/fileService';

// Notifications
import Notifications from '../../../../common/notifications/Notifications';

// Constants
import {NOTIFICATIONS} from "../../../../../constants/constants";


class FilesUploadField extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            uploading: false
        };
    }

    handleDrop = (files) => {

        this.uploadFiles(files);

    };

    handleInputFiles = (e) => {

        const files = Array.from(e.target.files);

        this.uploadFiles(files);
    };

    uploadFiles = (files) => {

        let projectFolder = this.props.projectFolder;

        if (!projectFolder) {
            this.notifications.showMessage(NOTIFICATIONS.bg.noProjectFolder);
            return;
        }

        this.setState({uploading: true});

        let data = new FormData();


        files.forEach((file, index) => {
            data.append(projectFolder + '/file_' + index, file);
        });

        let stateProp = this.props.stateProp;

        fileService
            .uploadFiles(data)
            .then(res => {
                this.setState({uploading: false});
                this.props.addFiles(stateProp, JSON.parse(res['addedFiles']));
            })
            .catch(err => {
                console.log(err);
                this.setState({uploading: false});
                this.notifications.showMessage(NOTIFICATIONS.bg.messageError);
            });
    };

    render() {

        let multiple = this.props.multiple;

        return (
            <div>
                <Notifications onRef={ref => (this.notifications = ref)} language='bg'/>
                <Uploading visible={this.state.uploading} onRef={ref => (this.uploading = ref)}/>

                {multiple &&
                <DropToUpload onDrop={this.handleDrop} id='files-upload-field'>
                    Drop files here to upload
                </DropToUpload>
                }

                <div className={'form-group input-wrapper btn btn-default-light sm'}>
                    <input type='file'  className={'file-input'} multiple={multiple} onChange={this.handleInputFiles} value={''}/>
                </div>
            </div>

        );
    }
}

export default FilesUploadField;

FilesUploadField.propTypes = {
    addFiles: PropTypes.func,
    projectFolder: PropTypes.string,
    stateProp: PropTypes.string,
    multiple: PropTypes.bool
};