import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox';
import ButtonPrimary from './ButtonPrimary'
import {injectIntl} from "react-intl";
import ButtonBorderPrimary from "./ButtonBorderPrimary";

const styles = theme => ({
    bar: {
        backgroundColor: "#fff"
    },
    grow: {
        flexGrow: 1,
        color: '#6b6b6b'
    },
    info: {
        maxHeight: "50vh",
        overflow: "auto"
    }
});

const getTermsTextEN = (classes) => {
    return (
        <div className={classes.info}>
            <Typography variant="body2" className={classes.title}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit
                anim id est laborum.<br/>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem
                aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                explicabo.
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
                dolore
                magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
                suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit
                qui in
                ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
                nulla pariatur.<br/>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem
                aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                explicabo.
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                dolores eos qui ratione voluptatem sequi nesciunt.
            </Typography>
        </div>
    )
}

const getTermsTextRU = (classes) => {
    return (
        <div className={classes.info}>
            <Typography variant="body2" className={classes.title}>
                Lorem Ipsum боль сидеть Амет, consectetur adipiscing Элит, SED Tempor и жизнеспособность, так что труд и
                горе, некоторые важные вещи, чтобы сделать eiusmod. На протяжении многих лет я пришел, кто nostrud
                aliquip
                из нее преимущества упражнений, так что усилия по стимулированию, если школьный округ и долговечность.
                Хотите быть боль в cupidatat cillum была подвергнута критике в DUIs и др Dolore MAGNA бежать не
                производит
                результирующую удовольствие. Excepteur cupidatat чернокожие не excepteur, успокаивающее для души, то
                есть,
                они покинули общие обязанности тех, кто виноват в ваших проблемах.<br/>
                Ибо никто не отвергает, не любит, или избегает самого удовольствия, потому что это удовольствие, а
                потому,
                что они не знают, как проводить удовольствие рационально сталкиваются с последствиями, которые являются
                горестями тех, у кого есть. Загрузить информацию как визитную карточку Е, который мы когда-либо берет на
                себя трудоемкую физических упражнений, за исключением того, чтобы получить некоторое преимущество от
                него?<br/>
                Ибо никто не отвергает, не любит, или избегает самого удовольствия, потому что это удовольствие, а
                потому,
                что они не знают, как проводить удовольствие рационально сталкиваются с последствиями, которые являются
                горестями тех, у кого есть.<br/>

                Lorem Ipsum боль сидеть Амет, consectetur adipiscing Элит, SED Tempor и жизнеспособность, так что труд и
                горе, некоторые важные вещи, чтобы сделать eiusmod. На протяжении многих лет я пришел, кто nostrud
                aliquip
                из нее преимущества упражнений, так что усилия по стимулированию, если школьный округ и долговечность.
                Хотите быть боль в cupidatat cillum была подвергнута критике в DUIs и др Dolore MAGNA бежать не
                производит
                результирующую удовольствие. Excepteur cupidatat чернокожие не excepteur, успокаивающее для души, то
                есть,
                они покинули общие обязанности тех, кто виноват в ваших проблемах.<br/>
                Ибо никто не отвергает, не любит, или избегает самого удовольствия, потому что это удовольствие, а
                потому,
                что они не знают, как проводить удовольствие рационально сталкиваются с последствиями, которые являются
                горестями тех, у кого есть. Загрузить информацию как визитную карточку Е, который мы когда-либо берет на
                себя трудоемкую физических упражнений, за исключением того, чтобы получить некоторое преимущество от
                него?<br/>
                Ибо никто не отвергает, не любит, или избегает самого удовольствия, потому что это удовольствие, а
                потому,
                что они не знают, как проводить удовольствие рационально сталкиваются с последствиями, которые являются
                горестями тех, у кого есть.<br/>
                Lorem Ipsum боль сидеть Амет, consectetur adipiscing Элит, SED Tempor и жизнеспособность, так что труд и
                горе, некоторые важные вещи, чтобы сделать eiusmod. На протяжении многих лет я пришел, кто nostrud
                aliquip
                из нее преимущества упражнений, так что усилия по стимулированию, если школьный округ и долговечность.
                Хотите быть боль в cupidatat cillum была подвергнута критике в DUIs и др Dolore MAGNA бежать не
                производит
                результирующую удовольствие. Excepteur cupidatat чернокожие не excepteur, успокаивающее для души, то
                есть,
                они покинули общие обязанности тех, кто виноват в ваших проблемах.<br/>
                Ибо никто не отвергает, не любит, или избегает самого удовольствия, потому что это удовольствие, а
                потому,
                что они не знают, как проводить удовольствие рационально сталкиваются с последствиями, которые являются
                горестями тех, у кого есть. Загрузить информацию как визитную карточку Е, который мы когда-либо берет на
                себя трудоемкую физических упражнений, за исключением того, чтобы получить некоторое преимущество от
                него?<br/>
                Ибо никто не отвергает, не любит, или избегает самого удовольствия, потому что это удовольствие, а
                потому,
                что они не знают, как проводить удовольствие рационально сталкиваются с последствиями, которые являются
                горестями тех, у кого есть.<br/>
                Lorem Ipsum боль сидеть Амет, consectetur adipiscing Элит, SED Tempor и жизнеспособность, так что труд и
                горе, некоторые важные вещи, чтобы сделать eiusmod. На протяжении многих лет я пришел, кто nostrud
                aliquip
                из нее преимущества упражнений, так что усилия по стимулированию, если школьный округ и долговечность.
                Хотите быть боль в cupidatat cillum была подвергнута критике в DUIs и др Dolore MAGNA бежать не
                производит
                результирующую удовольствие. Excepteur cupidatat чернокожие не excepteur, успокаивающее для души, то
                есть,
                они покинули общие обязанности тех, кто виноват в ваших проблемах.<br/>
                Ибо никто не отвергает, не любит, или избегает самого удовольствия, потому что это удовольствие, а
                потому,
                что они не знают, как проводить удовольствие рационально сталкиваются с последствиями, которые являются
                горестями тех, у кого есть. Загрузить информацию как визитную карточку Е, который мы когда-либо берет на
                себя трудоемкую физических упражнений, за исключением того, чтобы получить некоторое преимущество от
                него?<br/>
                Ибо никто не отвергает, не любит, или избегает самого удовольствия, потому что это удовольствие, а
                потому,
                что они не знают, как проводить удовольствие рационально сталкиваются с последствиями, которые являются
                горестями тех, у кого есть.<br/>
            </Typography></div>
    )
}


const getTermsText = (lang, classes) => {
    switch (lang) {
        case 'ru':
            return getTermsTextRU(classes);
        default:
            return getTermsTextEN(classes);
    }
}

class RegisterTerms extends React.Component {
    state = {
        checkedA: false
    }
    handleChange = name => event => {
        this.setState({[name]: event.target.checked});
    }

    render() {
        const {classes, intl, lang, goCancel, goSubmit} = this.props;
        return (
            <table>
                <tbody>
                <tr>
                    <td colSpan={3}>
                        <Typography variant="h4" className={classes.title}>
                            <br/>
                            {intl.formatMessage({id: 'RegisterTerms.title'})}
                        </Typography>
                    </td>
                </tr>
                <tr>
                    <td colSpan={3}>
                        {getTermsText(lang, classes)}
                        <br/><br/>
                    </td>
                </tr>
                <tr>
                    <td style={{width: "100%"}}>
                        <div>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.checkedA}
                                    onChange={this.handleChange('checkedA')}
                                    value="checkedA"
                                    color="primary"
                                />
                            }
                                              label={intl.formatMessage({id: 'RegisterTerms.accept'})}
                            />
                        </div>
                    </td>
                    <td>
                        <ButtonBorderPrimary onClick={() => goCancel()} style={{width: 140}}>
                            {intl.formatMessage({id: 'RegisterTerms.cancel'})}
                        </ButtonBorderPrimary>
                    </td>
                    <td>
                        <ButtonBorderPrimary onClick={() => goSubmit()} style={{width: 140}}
                                       disabled={this.state.checkedA ? false : true}>
                            {intl.formatMessage({id: 'RegisterTerms.ok'})}
                        </ButtonBorderPrimary>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}

RegisterTerms.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    goCancel: PropTypes.func.isRequired,
    goSubmit: PropTypes.func.isRequired

};

export default injectIntl(withStyles(styles)(RegisterTerms));
