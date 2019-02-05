import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        borderRadius: "30px",
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#000000',
        backgroundColor: '#ffffff',
        color: '#000000',
        padding: '6px 22px',
        fontFamily: 'Noto Sans Semibold',
        fontSize: '14px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#BF0025',
            borderColor: '#BF0025',
            color: '#ffffff',
            borderStyle: 'none',
        },
    },
});

function TmpButton(props) {
    const { classes, children, className, ...other } = props;

    return (
        <Button className={classNames(classes.root, className)} {...other}>
            {children}
        </Button>
    );
}

TmpButton.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
};

export default withStyles(styles)(TmpButton);