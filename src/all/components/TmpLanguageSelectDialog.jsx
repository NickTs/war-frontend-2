import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {injectIntl} from "react-intl";
import {stdDialog} from '../styles/ThemeDefault'
import TmpButtonLang from "./TmpButtonLang";
import {getDictLangsLabel} from '../dict/Dicts'


class TmpLanguageSelectDialog extends React.Component {
    handleClose = () => {
        const {lang, dlgData, goCancel} = this.props
        if (dlgData && dlgData.show) {
            goCancel(lang)
        }
    }

    componentDidMount() {
        const {lang} = this.props;
    }

    handleLang(newLang) {
        document.location.href = "/public/" + newLang
    }

    render() {
        const {classes, lang, intl, dlgData} = this.props;
        if (dlgData && dlgData.show) {
            return (
                <Dialog onClose={this.handleClose} open={true} fullScreen={true} style={{opacity: '0.95'}}>
                    <DialogContent style={{width: '1366px', height: '768px', margin: 0, padding: 0}}>
                    <div   style={{position: 'absolute', width: '1366px', height: '768px', backgroundColor: '#FFFFFF'}}>
                            <IconButton  onClick={this.handleClose} style={{
                                position: "absolute",
                                left: '95.68%',
                                right: '2.71%',
                                top: '5.08%',
                                bottom: '92.06%',
                                padding: 0,
                                margin: 0
                            }}>
                                <CloseIcon/>
                            </IconButton>
                        <div style={{
                            position: "absolute",
                            left: '33.09%',
                            right: '33.02%',
                            top: 'calc(50% - 40px/2 - 84px)',
                            height: '40px',
                            fontFamily: 'Noto Sans Bold',
                            lineHeight: '65px',
                            textAlign: 'center',
                            fontSize: '40px'
                        }}>
                            {intl.formatMessage({id: 'tmp.TmpLanguageSelectDialog.title'})}
                        </div>
                        <TmpButtonLang style={{position: 'absolute', left: '223px', top: '361px'}} onClick={() => this.handleLang('en')}>{getDictLangsLabel('en')}</TmpButtonLang>
                        <TmpButtonLang style={{position: 'absolute', left: '533px', top: '361px'}} disabled>{getDictLangsLabel('zn')}</TmpButtonLang>
                        <TmpButtonLang style={{position: 'absolute', left: '843px', top: '361px'}} disabled>{getDictLangsLabel('ja')}</TmpButtonLang>
                        <TmpButtonLang style={{position: 'absolute', left: '223px', top: '442px'}} disabled>{getDictLangsLabel('ar')}</TmpButtonLang>
                        <TmpButtonLang style={{position: 'absolute', left: '533px', top: '442px'}} disabled>{getDictLangsLabel('ko')}</TmpButtonLang>
                        <TmpButtonLang style={{position: 'absolute', left: '843px', top: '442px'}} disabled>{getDictLangsLabel('de')}</TmpButtonLang>
                        <TmpButtonLang style={{position: 'absolute', left: '223px', top: '522px'}} disabled>{getDictLangsLabel('fr')}</TmpButtonLang>
                        <TmpButtonLang style={{position: 'absolute', left: '533px', top: '522px'}} onClick={() => this.handleLang('ru')}>{getDictLangsLabel('ru')}</TmpButtonLang>
                        <TmpButtonLang style={{position: 'absolute', left: '843px', top: '522px '}} disabled>{getDictLangsLabel('es')}</TmpButtonLang>
                    </div>
                    </DialogContent>
                </Dialog>
            )
        } else {
            return (
                <Dialog onClose={this.handleClose} open={false}>
                    <div  style={{position: 'absolute', width: '1366px', height: '768px',  backgroundColor: '#0000FF'}}/>
                </Dialog>
            )
        }
    }
}


export default injectIntl(withStyles(stdDialog)(TmpLanguageSelectDialog));