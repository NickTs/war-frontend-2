import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        borderRadius: "20px",
        backgroundColor: '#cbcbcb',
        color: '#6b6b6b',
        '&:hover': {
            backgroundColor: '#8b8b8b',
            color: '#cbcbcb',
        },
    },
});

function ButtonInverse(props) {
    const { classes, children, className, ...other } = props;

    return (
        <Button className={classNames(classes.root, className)} {...other}>
            {children}
        </Button>
    );
}

ButtonInverse.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
};

export default withStyles(styles)(ButtonInverse);