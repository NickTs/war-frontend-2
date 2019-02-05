import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowForward from '@material-ui/icons/ArrowForward'


const styles = theme => ({
    root: {
        borderRadius: "30px",
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#000000',
        backgroundColor: '#ffffff',
        color: '#000000',
        padding: '6px 22px',
        fontSize: '16px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#BF0025',
            borderColor: '#BF0025',
            color: '#ffffff',
        },
    },
});

function TmpButton2(props) {
    const { classes, children, className, ...other } = props;
    return (
        <Button className={classNames(classes.root, className)} {...other} >
            {children}&nbsp;&nbsp;<ArrowForward/>
        </Button>
    );
}

TmpButton2.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
};

export default withStyles(styles)(TmpButton2);