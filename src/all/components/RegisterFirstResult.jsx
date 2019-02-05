import React from 'react'
import {withStyles} from "@material-ui/core/styles/index";
import PropTypes from 'prop-types';

const styles = theme => ({
    root:{

    },
});

function RegisterFirstResult(props) {
    const {classes} = props;
    return (
       <div>Successful</div>
    )
}

RegisterFirstResult.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterFirstResult);