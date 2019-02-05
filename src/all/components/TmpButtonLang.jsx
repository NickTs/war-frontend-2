import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        width: 300,
        height: 50,
        backgroundColor: '#FFFFFF',
        color: '#000000',
        fontFamily: 'Noto Sans',
        fontSize: '24px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#ffffff',
            color: '#000000',
            fontFamily: 'Noto Sans Bold',
        },
    },
});

function TmpButtonLang(props) {
    const { classes, children, className, ...other } = props;

    return (
        <Button className={classNames(classes.root, className)} {...other}>
            {children}
        </Button>
    );
}

TmpButtonLang.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
};

export default withStyles(styles)(TmpButtonLang);