import React from 'react'
import Dropzone from 'react-dropzone'
import {injectIntl} from "react-intl";
import {withStyles} from "@material-ui/core/styles/index";
import {profileGeneral} from "../styles/ThemeDefault";
import Button from "@material-ui/core/Button";
import axiosBackend from "../axios/axiosBackend";
import {GetBaseUrl, backendBaseURL} from "../Utils";
import {dlgUploadImageDialog} from "../actions/DlgUploadImageDialog";
import {alertErrApi} from "../actions/AlertErrApi";
import ButtonBorderPrimary from "./ButtonBorderPrimary";

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 400,
    height: 400,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
}

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

class DropzoneWithPreview extends React.Component {
    constructor() {
        super()
        this.state = {
            files: []
        };
    }

    onDrop(files) {
        this.setState({
            files: files.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        });
    }

    componentWillUnmount() {
        this.state.files.forEach(file => URL.revokeObjectURL(file.preview))
    }

    handleSubmit() {
        this.state.files.forEach(file => {
            var jsonFile = new FormData();
            jsonFile.append('file', file);
            jsonFile.append('name', file.name);
            axiosBackend.post('files',jsonFile, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(result => {
                    if(this.props.goSubmit){
                        this.props.goSubmit(result.data)
                    }
                })
                .catch((error) => {
                  if(this.props.goError){
                      if (error.response) {
                          if (error.response.data.errorCode) {
                              this.props.goError("API-" + error.response.data.errorCode, error.response.data.message)
                          } else {
                              this.props.goError("HTTP-" + error.response.status, "Network error2")
                          }
                      } else {
                          this.props.goError("HTTP-", "Network error", true)
                      }
                  }
                })
        })
    }

    handleCancel() {
        if(this.props.goCancel){
            this.props.goCancel()
        }
        this.state.files.forEach(file => URL.revokeObjectURL(file.preview))
    }

    render() {
        const {intl} = this.props;
        const {files} = this.state;

        const thumbs = files.map(file => (
            <div style={thumb} key={file.name}>
                <div style={thumbInner}>
                    <img
                        src={file.preview}
                        style={img}
                    />
                </div>
            </div>
        ));

        if(files && files.length>0){
            return (
                <section>
                    <aside style={thumbsContainer}>
                        {thumbs}
                    </aside>
                    <div style={{marginTop: 15, marginBottom: 15, textAlign: 'right'}}>
                    <ButtonBorderPrimary style={{width: 150}}
                                         onClick={this.handleCancel.bind(this)}>{intl.formatMessage({id: 'DropzoneWithPreview.cancel.label'})}</ButtonBorderPrimary>&nbsp;&nbsp;&nbsp;
                    <ButtonBorderPrimary style={{width: 150}} onClick={this.handleSubmit.bind(this)}
                                         disabled={(files && files.length > 0) ? false : true}>{intl.formatMessage({id: 'DropzoneWithPreview.save.label'})}</ButtonBorderPrimary>
                    </div>
                </section>
            )
        } else {
            return (
                <section>
                    <Dropzone
                        accept="image/*"
                        multiple={false}
                        onDrop={this.onDrop.bind(this)}
                    >
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps()}
                                 style={{width: 400, height: 400, position: 'relative', borderStyle: 'dashed'}}>
                                <input {...getInputProps()} />
                                <p style={{
                                    position: 'absolute',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '100%',
                                    textAlign: 'center'
                                }}>{intl.formatMessage({id: 'DropzoneWithPreview.upload.label'})}</p>
                            </div>
                        )}
                    </Dropzone>
                    <div style={{marginTop: 15, marginBottom: 15, textAlign: 'right'}}>
                    <ButtonBorderPrimary style={{width: 150}}
                                         onClick={this.handleCancel.bind(this)}>{intl.formatMessage({id: 'DropzoneWithPreview.cancel.label'})}</ButtonBorderPrimary>&nbsp;&nbsp;&nbsp;
                    <ButtonBorderPrimary style={{width: 150}} onClick={this.handleSubmit.bind(this)}
                                         disabled={(files && files.length > 0) ? false : true}>{intl.formatMessage({id: 'DropzoneWithPreview.save.label'})}</ButtonBorderPrimary>
                    </div>
                </section>
            )
        }
    }
}

export default injectIntl(withStyles(profileGeneral)(DropzoneWithPreview));
