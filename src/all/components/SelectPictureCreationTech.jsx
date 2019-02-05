import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {emphasize} from '@material-ui/core/styles/colorManipulator';
import {getPictureCreationTechTypes} from "../dict/Dicts"
import {injectIntl} from "react-intl";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({inputRef, ...props}) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

class SelectPictureCreationTech extends React.Component {
    state = {
        selValue: null,
        suggestions: {}
    };


    componentDidMount() {
        const {lang, defValue} = this.props;
        let suggestionsValue = getPictureCreationTechTypes(lang).map(arrElement => ({
            value: arrElement.key,
            label: arrElement.label,
        }))
        this.setState({
            suggestions: suggestionsValue,
            selValue: defValue
        })
    }

    handleChange = (value) => {
        const {selChange} = this.props;
        this.setState({
            selValue: value,
        });
        selChange(value)
    };

    handleBlur = (value) => {
        const {selBlur} = this.props;
        selBlur(this.state.selValue)
    }

    render() {
        const {classes, intl, input} = this.props;
        const selectStyles = {
            input: base => ({
                ...base,
                color: classes.root.textPrimary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        return (
            <div className={classes.root}>
                <NoSsr>
                    <Select
                        classes={classes}
                        styles={selectStyles}
                        options={this.state.suggestions}
                        components={components}
                        value={this.state.selValue}
                        placeholder={intl.formatMessage({id: 'SelectPictureCreationTech.placeholder'})}
                        isClearable
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                    />
                </NoSsr>
            </div>
        );
    }
}

SelectPictureCreationTech.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default injectIntl(withStyles(styles, {withTheme: true})(SelectPictureCreationTech));