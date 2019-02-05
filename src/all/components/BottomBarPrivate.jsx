import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {injectIntl} from "react-intl";
import {bottomBarPrivate} from "../styles/ThemeDefault";


function BottomBarPrivate(props) {
    const {classes} = props;
    return (
        <div className={classes.bar}>
            <Toolbar>
                <Typography variant="body2" className={classes.labelCopyright}>
                    © 2018 World Art Registry. All rights reserved.
                </Typography>
                <IconButton className={classes.btnSocial}>
                    <Icon>
                        <img src="/static/instagram.png" alt="" width="14" height="14"/>
                    </Icon>
                </IconButton>
                <IconButton className={classes.btnSocial}>
                    <Icon>
                        <img src="/static/twitter.png" alt="" width="16" height="12"/>
                    </Icon>
                </IconButton>
                <IconButton className={classes.btnSocial}>
                    <Icon>
                        <img src="/static/facebook.png" alt="" width="7" height="14"/>
                    </Icon>
                </IconButton>
            </Toolbar>
        </div>
    );
}

BottomBarPrivate.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
};

export default injectIntl(withStyles(bottomBarPrivate)(BottomBarPrivate));