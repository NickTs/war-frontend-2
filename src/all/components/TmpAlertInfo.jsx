import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ButtonPrimary from "./ButtonPrimary";
import {FormattedHTMLMessage, injectIntl} from "react-intl";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: 'auto',
        backgroundColor: '#fbfbfb',
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    infoBtnPanel: {
        display: 'flex',
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },
});

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    return (
        <SnackbarContent
            message={message}
            action={[
                <IconButton
                    key="close"
                    onClick={onClose}
                >
                    <CloseIcon style={{color: '#FFFFFF'}}/>
                </IconButton>,
            ]}
            {...other}
            style={{borderRadius: '30px'}}
        />
    );
}

class TmpAlertInfo extends React.Component {
    handleClose = () => {
        const {alertData, goClose} = this.props
        if(alertData && alertData.show){
            goClose()
        }
    }

    getMessage() {
        return (
            <span id="message-id">
                {this.props.alertData.msg}
            </span>
        )
    }
    getAction(){
        return (
            <IconButton
                key="close"
                onClick={this.handleClose}
            >
                <CloseIcon />
            </IconButton>
        )
    }
    render() {
        const {goClose, alertData} = this.props
        if (alertData && alertData.show) {
            return (
                <Snackbar open={true} onClose={() => goClose()} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                >
                    <MySnackbarContent
                        onClose={this.handleClose}
                        message={this.getMessage()}
                    />
                </Snackbar>
            )
        } else {
            return (
                <Snackbar open={false} onClose={goClose} />
            )
        }
    }
}

export default injectIntl(withStyles(styles)(TmpAlertInfo));