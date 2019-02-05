import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';


const styles = theme => ({
    root:{

    },
    grow:{
        flexGrow: 1,
        color: '#6b6b6b'
    },
    button:{

    }
});


function BottomBar(props) {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <Drawer anchor="bottom" variant="permanent">
                <Toolbar>
                    <Typography variant="body2" className={classes.grow}>
                        © 2018 World Art Registry. All rights reserved.
                    </Typography>
                    <IconButton color="primary" className={classes.button}>
                        <Icon>
                            <img src="/static/instagram.png" alt="" width="14" height="14" />
                        </Icon>
                    </IconButton>
                    <IconButton color="primary" className={classes.button}>
                        <Icon>
                            <img src="/static/twitter.png" alt="" width="16" height="12" />
                        </Icon>
                    </IconButton>
                    <IconButton color="primary" className={classes.button}>
                        <Icon>
                            <img src="/static/facebook.png" alt="" width="7" height="14" />
                        </Icon>
                    </IconButton>
                </Toolbar>
            </Drawer>
        </div>
    );
}

BottomBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomBar);