import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {buttonBorderPrimary} from '../styles/ThemeDefault'


function ButtonBorderPrimary(props) {
    const { classes, children, className, ...other } = props;

    return (
        <Button variant="outlined" className={classNames(classes.root, className)} {...other}>
            {children}
        </Button>
    );
}

ButtonBorderPrimary.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
};

export default withStyles(buttonBorderPrimary)(ButtonBorderPrimary);