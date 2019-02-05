import React from 'react'
import TopBarPublicFunc from '../containers/TopBarPublicFunc'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl"
import {GetElementById} from "../Utils";
import {pageDefault} from "../styles/ThemeDefault";
import BottomBarPublic from "./BottomBarPublic";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIconOpen from '@material-ui/icons/Add';
import ExpandMoreIconClose from '@material-ui/icons/Remove';
import TopicIcon from '@material-ui/icons/FiberManualRecord';
import Lightbox from 'react-images';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import IconButton from '@material-ui/core/IconButton';

class PanelResume extends React.Component {
    state = {
        expansionPanelOpen: false,
    }

    handleReset = () => {
        this.setState({
            expansionPanelOpen: false,
        });
    };
    handleEditCancel = () => {
        this.setState({
            expansionPanelOpen: false,
        });
    }

    render() {
        const {classes, intl, dataValue} = this.props;
        let myIcon
        if (this.state.expansionPanelOpen) {
            myIcon = (
                <ExpandMoreIconClose style={{color: '#D6002A'}} onClick={() => {
                    this.setState({
                        expansionPanelOpen: !this.state.expansionPanelOpen
                    });
                }}/>
            )
        } else {
            myIcon = (
                <ExpandMoreIconOpen style={{color: '#D6002A'}} onClick={() => {
                    this.setState({
                        expansionPanelOpen: !this.state.expansionPanelOpen
                    });
                }}/>
            )
        }
        return (
            <ExpansionPanel expanded={this.state.expansionPanelOpen}>
                <ExpansionPanelSummary expandIcon={myIcon} style={{backgroundColor: '#F7F7F7', fontSize: '18px'}}>
                    <div><b>{intl.formatMessage({id: 'ValuePagePublic.PanelResume.title'})}</b></div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div style={{fontSize: '12px'}}>
                        {dataValue.info[0].resume && dataValue.info[0].resume}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

class PanelPrevOwners extends React.Component {
    state = {
        expansionPanelOpen: false,
    }

    handleReset = () => {
        this.setState({
            expansionPanelOpen: false,
        });
    };
    handleEditCancel = () => {
        this.setState({
            expansionPanelOpen: false,
        });
    }

    showDataValue(dataValue) {
        if (dataValue.prevOwners) {
            return (
                <div>
                    <table>
                        <tbody>
                        {dataValue.prevOwners.map(dbOwnerStr => {
                            return (
                                <tr><td>
                                    <div style={{width: '100%', fontSize: '16px'}}>
                                        <b>{dbOwnerStr.name?dbOwnerStr.name[0].v:''} {dbOwnerStr.period?'('+dbOwnerStr.period+')':''}</b>
                                    </div>
                                    <div style={{width: '100%', fontSize: '12px'}}>
                                        {dbOwnerStr.info?dbOwnerStr.info[0].v:''}
                                    </div>
                                </td></tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <div/>
            )
        }
    }

    render() {
        const {classes, intl, dataValue} = this.props;
        let myIcon
        if (this.state.expansionPanelOpen) {
            myIcon = (
                <ExpandMoreIconClose style={{color: '#D6002A'}} onClick={() => {
                    this.setState({
                        expansionPanelOpen: !this.state.expansionPanelOpen
                    });
                }}/>
            )
        } else {
            myIcon = (
                <ExpandMoreIconOpen style={{color: '#D6002A'}} onClick={() => {
                    this.setState({
                        expansionPanelOpen: !this.state.expansionPanelOpen
                    });
                }}/>
            )
        }
        return (
            <ExpansionPanel expanded={this.state.expansionPanelOpen}>
                <ExpansionPanelSummary expandIcon={myIcon} style={{backgroundColor: '#F7F7F7', fontSize: '18px'}}>
                    <div><b>{intl.formatMessage({id: 'ValuePagePublic.PanelPrevOwners.title'})}</b></div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {this.showDataValue(dataValue)}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}


class PanelLinks extends React.Component {
    state = {
        expansionPanelOpen: false,
    }

    handleReset = () => {
        this.setState({
            expansionPanelOpen: false,
        });
    };
    handleEditCancel = () => {
        this.setState({
            expansionPanelOpen: false,
        });
    }

    showDataValue(dataValue) {
        if (dataValue.references) {
            return (
                <div>
                    <table>
                        <tbody>
                        {dataValue.references.map(dbReference => {
                            return (
                                <tr><td>
                                    <div style={{width: '100%', fontSize: '16px'}}>
                                    <b>{dbReference.title?dbReference.title[0].v:''}</b>
                                    </div>
                                    <div style={{width: '100%', textDecoration: 'underline', fontSize: '12px', color: '#000000'}}>
                                        <a href={dbReference.href} target="_blank">{dbReference.href}</a>
                                    </div>
                                </td></tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <div/>
            )
        }
    }

    render() {
        const {classes, intl, dataValue} = this.props;
        let myIcon
        if (this.state.expansionPanelOpen) {
            myIcon = (
                <ExpandMoreIconClose style={{color: '#D6002A'}} onClick={() => {
                    this.setState({
                        expansionPanelOpen: !this.state.expansionPanelOpen
                    });
                }}/>
            )
        } else {
            myIcon = (
                <ExpandMoreIconOpen style={{color: '#D6002A'}} onClick={() => {
                    this.setState({
                        expansionPanelOpen: !this.state.expansionPanelOpen
                    });
                }}/>
            )
        }
        return (
            <ExpansionPanel expanded={this.state.expansionPanelOpen}>
                <ExpansionPanelSummary expandIcon={myIcon} style={{backgroundColor: '#F7F7F7', fontSize: '18px'}}>
                    <div><b>{intl.formatMessage({id: 'ValuePagePublic.PanelLinks.title'})}</b></div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {this.showDataValue(dataValue)}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}


class ValuePagePublic extends React.Component {
    handleClick = (event, data) => {
        const {lang, goValueInfo} = this.props;
        console.log('data=', data)
    }

    constructor() {
        super();

        this.state = {
            lightboxIsOpen: false,
            currentImage: 0,
        };

        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoImage = this.gotoImage.bind(this);
        this.handleClickImage = this.handleClickImage.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
    }

    openLightbox(index, event) {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: true,
        });
    }

    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }

    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }

    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

    gotoImage(index) {
        this.setState({
            currentImage: index,
        });
    }

    handleClickImage() {
        if (this.state.currentImage === this.props.images.length - 1) return;

        this.gotoNext();
    }

    render() {
        const {classes, intl, goRegister, goLogin, lang, dbValues} = this.props;


        if (dbValues && dbValues.listPicture && dbValues.listPicture.length > 0) {
            const dbValue = dbValues.listValue[0]
            const dbPicture = dbValues.listPicture[0]
            const images = [
                {
                    src: dbPicture.attachments[0].href
                }
            ]
            const resumeShow = (dbPicture.resumeLimit && dbPicture.resumeLimit == 'on') ? false : true
            const prevOwnersShow = (dbPicture.prevOwnersLimit && dbPicture.prevOwnersLimit == 'on') ? false : true
            const referencesShow = (dbPicture.referencesLimit && dbPicture.referencesLimit == 'on') ? false : true
            return (
                <div className={classes.root}>
                    <TopBarPublicFunc visibleHome={true} goRegister={goRegister} goLogin={goLogin} lang={lang}/>
                    <div style={{backgroundColor: '#F7F7F7', padding: '40px 20px 40px 20px'}}>
                        <table style={{width: '95%'}}>
                            <tbody>
                            <tr>
                                <td style={{width: 600, verticalAlign: 'top'}}>
                                    <table style={{width: '100%'}}>
                                        <tbody>
                                        <tr>
                                            <td style={{backgroundColor: '#FFFFFF', padding: '20px'}}>
                                                <img src={dbPicture.attachments[0].href + '?imgsize=1000'}
                                                     style={{width: 570}} onClick={this.openLightbox}/>
                                                <IconButton style={{position: 'relative', left: 520}}
                                                            onClick={this.openLightbox}><ZoomOutMapIcon
                                                    style={{fontSize: '40px'}}/></IconButton>
                                                <Lightbox
                                                    currentImage={this.state.currentImage}
                                                    images={images}
                                                    isOpen={this.state.lightboxIsOpen}
                                                    onClickImage={this.handleClickImage}
                                                    onClickNext={this.gotoNext}
                                                    onClickPrev={this.gotoPrevious}
                                                    onClickThumbnail={this.gotoImage}
                                                    onClose={this.closeLightbox}
                                                    preventScroll={this.props.preventScroll}
                                                    showThumbnails={this.props.showThumbnails}
                                                    spinner={this.props.spinner}
                                                    spinnerColor={this.props.spinnerColor}
                                                    spinnerSize={this.props.spinnerSize}
                                                    theme={this.props.theme}
                                                />
                                            </td>
                                        </tr>
                                        {dbPicture.info[0].description && <tr>
                                            <td style={{fontSize: '18px', paddingTop: '20px', paddingBottom: '10px'}}>
                                                <b>{intl.formatMessage({id: 'ValuePagePublic.Description.label'})}</b></td>
                                        </tr>}
                                        {dbPicture.info[0].description && <tr>
                                            <td>{dbPicture.info[0].description}</td>
                                        </tr>}
                                        </tbody>
                                    </table>
                                </td>
                                <td style={{verticalAlign: 'top', paddingLeft: '20px'}}>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td style={{minWidth: 400, fontSize: '26px'}}>
                                                <b>{GetElementById(dbValues.listValue, dbPicture.valueId).info[0].name}</b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{paddingTop: '10px', paddingBottom: '20px', fontSize: '20px'}}>
                                                <b>{dbPicture.info[0].author}</b></td>
                                        </tr>
                                        <tr>
                                            <td style={{paddingBottom: '10px'}}><TopicIcon
                                                style={{fontSize: '12px', paddingRight: '10px'}}/> {intl.formatMessage({id: 'ValuePagePublic.Category.label'})}: <span
                                                style={{textDecoration: 'underline'}}>{intl.formatMessage({id: 'ValuePagePublic.Category.vt.'+dbValue.vt})}</span></td>
                                        </tr>
                                        {dbPicture.dateCreate && <tr>
                                            <td style={{paddingBottom: '10px'}}><TopicIcon
                                                style={{fontSize: '12px', paddingRight: '10px'}}/> {intl.formatMessage({id: 'ValuePagePublic.Year.label'})}: <span
                                                style={{textDecoration: 'underline'}}>{dbPicture.dateCreate}</span></td>
                                        </tr>}
                                        {dbPicture.info[0].creationTech && <tr>
                                            <td style={{paddingBottom: '10px'}}><TopicIcon
                                                style={{fontSize: '12px', paddingRight: '10px'}}/> {intl.formatMessage({id: 'ValuePagePublic.Technique.label'})}: <span
                                                style={{textDecoration: 'underline'}}>{dbPicture.info[0].creationTech}</span>
                                            </td>
                                        </tr>}
                                        {dbPicture.dimension && <tr>
                                            <td style={{whiteSpace: 'nowrap', paddingBottom: '10px'}}><TopicIcon
                                                style={{
                                                    fontSize: '12px',
                                                    paddingRight: '10px'
                                                }}/> {intl.formatMessage({id: 'ValuePagePublic.Size.label'})}: {dbPicture.dimension[0].w + ' x ' + dbPicture.dimension[0].h + ' ' + dbPicture.dimension[0].metric}
                                            </td>
                                        </tr>}
                                        {dbPicture.info[0].concept && <tr>
                                            <td><TopicIcon style={{
                                                fontSize: '12px',
                                                paddingRight: '10px'
                                            }}/> {dbPicture.info[0].concept}</td>
                                        </tr>}
                                        {resumeShow && <tr>
                                            <td style={{paddingTop: '40px'}}><PanelResume style={{width: '100%'}}
                                                                                          dataValue={dbPicture} intl={intl}/></td>
                                        </tr>}
                                        {prevOwnersShow && <tr>
                                            <td style={{paddingTop: '20px'}}><PanelPrevOwners style={{width: '100%'}}
                                                                                              dataValue={dbPicture}  intl={intl}/>
                                            </td>
                                        </tr>}
                                        {referencesShow && <tr>
                                            <td style={{paddingTop: '20px'}}><PanelLinks style={{width: '100%'}}
                                                                                         dataValue={dbPicture}  intl={intl}/></td>
                                        </tr>}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div style={{width: 20, height: 20}}></div>
                    </div>
                    <BottomBarPublic lang={lang}/>
                </div>
            );
        } else {
            return (
                <div className={classes.root}>
                    <TopBarPublicFunc visibleHome={true} goRegister={goRegister} goLogin={goLogin} lang={lang}/>
                    <div style={{backgroundColor: '#F7F7F7'}}>
                        <div style={{width: 20, height: 20}}></div>
                    </div>
                    <BottomBarPublic lang={lang}/>
                </div>
            );
        }

    }
}

ValuePagePublic.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

export default injectIntl(withStyles(pageDefault)(ValuePagePublic));