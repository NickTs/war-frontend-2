import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ReactDOM from "react-dom";
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'


const styles = () => ({
    select1: {
        padding: '3px 25px',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        border: '1px solid',
    },
    select2: {
        padding: '3px 25px',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        border: '2px solid',
    }
});

class TmpSelectField extends React.Component {
    render() {
        const {classes, input, meta, children} = this.props;
        return (
            <div>
                <FormControl variant="outlined" fullWidth={true}>
                    <Select
                        id={input.name+"-sel"}
                        className={meta.active?classes.select2:classes.select1}
                        children={children}
                        input={
                            <Input id={input.name}
                                           {...input} />
                        }
                        disableUnderline
                    />
                    <FormHelperText id={input.name + "err"} style={{textAlign: 'right', fontFamily: 'Noto Sans',
                        fontSize: '12px', color: '#D6002A'}}>{meta.error}</FormHelperText>
                </FormControl>
            </div>
        )
    }
}

TmpSelectField.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
};

export default withStyles(styles)(TmpSelectField);