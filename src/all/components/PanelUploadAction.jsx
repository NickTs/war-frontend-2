import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from "react-intl"
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {panelEditAction} from '../styles/ThemeDefault'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';


function PanelUploadAction(props) {
    const { classes, intl, goCancel, goUpload, disabledSave} = props;
    return (
        <ExpansionPanelActions className={classes.root}>
            <Button className={classes.btn} onClick={goCancel}>{intl.formatMessage({id: 'PanelEditAction.cancel.label'})}</Button>
            <Button className={classes.btn} onClick={goUpload} disabled={disabledSave}>{intl.formatMessage({id: 'PanelEditAction.loadNew.label'})}</Button>
        </ExpansionPanelActions>
    );
}

PanelUploadAction.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default injectIntl(withStyles(panelEditAction)(PanelUploadAction));