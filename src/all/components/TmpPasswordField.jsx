import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ReactDOM from "react-dom";
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import TextField from '@material-ui/core/TextField'


const styles = theme => ({
    root: {
        borderRadius: "30px",
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#000000',
        backgroundColor: '#ffffff',
        color: '#000000',
        padding: '6px 22px',
        fontFamily: 'Noto Sans Bold',
        fontSize: '16px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#BF0025',
            borderColor: '#BF0025',
            color: '#ffffff',
        },
    },
});

class TmpTextField extends React.Component {
    render() {
        const {input, meta} = this.props;
        console.log('props=',this.props)
        if(meta && meta.active){
            return (
                <div>
                    <FormControl variant="outlined" fullWidth={true}>
                        <TextField id={input.name} InputProps={{disableUnderline: true}}
                                   type = "password"
                                   style={{
                                       padding: '3px 25px',
                                       backgroundColor: '#FFFFFF',
                                       borderRadius: 30,
                                       border: '2px solid',
                                       borderColor: '#000000',
                                       fontFamily: 'Noto Sans',
                                       fontSize: '16px'
                                   }} {...input} />
                        <FormHelperText id={input.name + "err"} style={{textAlign: 'right', fontFamily: 'Noto Sans',
                            fontSize: '12px', color: '#D6002A'}}>{meta.error}</FormHelperText>
                    </FormControl>
                </div>
            )
        } else {
            return (
                <div>
                    <FormControl variant="outlined" fullWidth={true}>
                        <TextField id={input.name} InputProps={{disableUnderline: true}}
                                   type = "password"
                                   style={{
                                       padding: '3px 25px',
                                       backgroundColor: '#FFFFFF',
                                       borderRadius: 30,
                                       border: '1px solid',
                                       borderColor: '#000000',
                                       fontFamily: 'Noto Sans',
                                       fontSize: '16px'
                                   }} {...input} />
                        <FormHelperText id={input.name + "err"} style={{textAlign: 'right', fontFamily: 'Noto Sans',
                            fontSize: '12px', color: '#D6002A'}}>{meta.error}</FormHelperText>
                    </FormControl>
                </div>
            )
        }
    }
}

TmpTextField.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
};

export default withStyles(styles)(TmpTextField);