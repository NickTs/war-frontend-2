import React from 'react';
import TopBar from '../all/components/TopBar';
import BottomBar from '../all/components/BottomBar';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        backgroundImage: 'url("/static/bg.jpg")',
        backgroundPosition: 'absolute, 0px, 0px',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
    },
    title: {},
    resume: {
        width: '50vw'
    },
    button: {},
    info: {
        display: 'flex',
        overflow: 'hidden',
        textAlign: 'left',
        height: '100vh'
    },
    infoCenter: {
        marginLeft: '20px',
        marginTop: 'auto',
        marginBottom: 'auto',
    }
});



class App extends React.Component {
    state = {
        l: 'ru',
    };
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <TopBar/>
                <div className={classes.info}>
                    <div className={classes.infoCenter}>
                        <Typography variant="h1" color="inherit" className={classes.title}>
                            World Art Registry2
                        </Typography>
                        <Typography variant="h4" color="inherit" className={classes.resume}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore
                            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi
                            ut
                            aliquip
                        </Typography>
                        <Button variant="contained" color="primary" className={classes.button}>Learn more</Button>
                    </div>
                </div>
                <BottomBar/>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

