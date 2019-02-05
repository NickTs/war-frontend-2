import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    rootEnabled: {
        backgroundColor: '#6b6b6b',
        color: '#fff',
        margin: theme.spacing.unit,
        '&:hover': {
            backgroundColor: '#cbcbcb',
            color: '#4b4b4b',
        },
    },
    rootDisabled: {
        backgroundColor: '#ebebeb',
        color: '#fff',
        margin: theme.spacing.unit,
        '&:hover': {
            backgroundColor: '#ebebeb',
            color: '#fff',
        },
    },
});

function ButtonPrimary(props) {
    const { classes, children, className, disabled, ...other } = props;
    if(disabled){
        return (
        <Button className={classNames(classes.rootDisabled, className)} {...other}>
            {children}
        </Button>
    )
    } else {
        return (
        <Button className={classNames(classes.rootEnabled, className)} {...other}>
            {children}
        </Button>
        )
    }
}

ButtonPrimary.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
};

export default withStyles(styles)(ButtonPrimary);