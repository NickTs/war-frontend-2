import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {getDictLangs} from '../dict/Dicts'
import MenuItem from '@material-ui/core/MenuItem';
import {languageSelect} from "../styles/ThemeDefault";

class LanguageSelect extends React.Component {
    changeLang = event => {
        document.location.href = "/public/" + event.target.value
    }

    render() {
        const {classes, lang} = this.props;
        return (
            <div className={classes.root}>
                <FormControl className={classes.formControl}>
                    <Select value={lang} name="lang" onChange={this.changeLang} disableUnderline inputProps={{
                        classes: {
                            root: classes.selectRoot,
                            icon: classes.selectIcon,
                        },
                    }}>
                        {getDictLangs().map(langData => {
                            return (<MenuItem key={langData.key} value={langData.key}
                                              disabled={langData.active ? false : true}>{langData.label}</MenuItem>)
                        })}
                    </Select>
                </FormControl>
            </div>
        );
    }
}

LanguageSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired
};

export default withStyles(languageSelect)(LanguageSelect);