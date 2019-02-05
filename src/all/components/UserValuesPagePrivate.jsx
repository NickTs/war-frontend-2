import React from 'react'
import TopBarPrivateFunc from '../containers/TopBarPrivateFunc'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl"
import {GetElementByHref, GetElementById} from "../Utils";
import {pageDefault} from "../styles/ThemeDefault";
import BottomBarPrivate from "./BottomBarPrivate";
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Gallery from "react-photo-gallery"
import PhotoUserValues from "./PhotoUserValues";
import ButtonBorderPrimary from "./ButtonBorderPrimary";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const tileData = [
    {
        img: '/static/tmp/picture01.jpg',
        title: 'Breakfast',
        author: 'jill111',
        cols: 2,
        featured: true,
    },
    {
        img: '/static/tmp/picture02.jpg',
        title: 'Tasty burger',
        author: 'director90',
    },
    {
        img: '/static/tmp/picture03.jpg',
        title: 'Camera',
        author: 'Danson67',
    },
]


function columns(containerWidth) {
    let columns = 1;
    if (containerWidth >= 800) columns = 2;
    if (containerWidth >= 1100) columns = 3;
    return columns;
}


class UserValuesPagePrivate extends React.Component {
    state = {
        anchorMenuNewValue: null,
    }

    handleMenuNewValueOpen = event => {
        this.setState({anchorMenuNewValue: event.currentTarget});
    };

    handleMenuNewValueClose = () => {
        this.setState({anchorMenuNewValue: null});
    }

    handleMenuNewValuePicture = () => {
        const {lang, user, goPictureNew} = this.props;
        this.setState({anchorMenuNewValue: null});
        goPictureNew(lang, user);
    }

    handleMenuNewValueSculpture = () => {
        const {lang, user, goPictureNew} = this.props;
        this.setState({anchorMenuNewValue: null});
        goPictureNew(lang, user);
    }

    handleMenuNewValueInstallation = () => {
        const {lang, user, goPictureNew} = this.props;
        this.setState({anchorMenuNewValue: null});
        goPictureNew(lang, user);
    }

    handleClick = (event, data) => {
        const {lang, user, goValueInfo} = this.props;
        //document.location.href = "/private/"+lang+"/uservalue/?valueid="+data.photo.valueId
    }


    componentDidMount() {
        const {lang} = this.props;
    }

    render() {
        const {classes, intl, lang, dbValues} = this.props;

        const photos = []

        if (dbValues && dbValues.listPicture) {
            dbValues.listPicture.map(dbPicture => {
                let title = GetElementById(dbValues.listValue, dbPicture.valueId).info[0].name
                if(dbPicture.dateCreate){
                    title = title +  " (" + dbPicture.dateCreate + ")"
                }
                let imgInfo = GetElementByHref(dbValues.listImgInfo, dbPicture.attachments[0].href)
                photos.push({
                    src: dbPicture.attachments[0].href,
                    title: title,
                    author: dbPicture.info[0].author,
                    width: imgInfo?imgInfo.ws:1,
                    height: imgInfo?imgInfo.hs:1,
                    valueId: dbPicture.valueId,
                    vt: 'pict',
                    goto: "/private/"+lang+"/uservalue/?valueid="+dbPicture.valueId
                })
            })
        }

        console.log('photos=', photos)

        return (
            <div className={classes.root}>
                <TopBarPrivateFunc visibleHome={true} lang={lang}/>
                <div style={{backgroundColor: '#F7F7F7'}}>

                <table style={{width: '95%'}}>
                    <tbody>
                    <tr>
                        <td>
                            <Typography variant="h4" className={classes.title}
                                        style={{marginLeft: 30, marginTop: 20, marginBottom: 10}}>
                                {intl.formatMessage({id: 'UserValuesPagePrivate.title'})}
                            </Typography>
                        </td>
                        <td style={{textAlign: 'right'}}>
                            <ButtonBorderPrimary onClick={this.handleMenuNewValueOpen}>
                                <AddIcon style={{paddingRight: 10}}/>
                                {intl.formatMessage({id: 'UserValuesPagePrivate.btnNewValue.label'})}
                            </ButtonBorderPrimary>
                            <Menu
                                id="newvalue-menu"
                                anchorEl={this.state.anchorMenuNewValue}
                                open={Boolean(this.state.anchorMenuNewValue)}
                                onClose={this.handleMenuNewValueClose}
                            >
                                <MenuItem onClick={this.handleMenuNewValuePicture}>
                                    <ListItemIcon className={classes.icon}>
                                        <img src="/static/picture24.png"/>
                                    </ListItemIcon>
                                    <ListItemText classes={{primary: classes.primary}} inset
                                                  primary={intl.formatMessage({id: 'UserValuesPagePrivate.btnNewValue.picture'})}/>
                                </MenuItem>
                                <MenuItem onClick={this.handleMenuNewValueSculpture}>
                                    <ListItemIcon className={classes.icon}>
                                        <img src="/static/sculpture24.png"/>
                                    </ListItemIcon>
                                    <ListItemText classes={{primary: classes.primary}} inset
                                                  primary={intl.formatMessage({id: 'UserValuesPagePrivate.btnNewValue.sculpture'})}/>
                                </MenuItem>
                                <MenuItem onClick={this.handleMenuNewValueInstallation}>
                                    <ListItemIcon className={classes.icon}>
                                        <img src="/static/installation24.png"/>
                                    </ListItemIcon>
                                    <ListItemText classes={{primary: classes.primary}} inset
                                                  primary={intl.formatMessage({id: 'UserValuesPagePrivate.btnNewValue.installation'})}/>
                                </MenuItem>
                            </Menu>
                        </td>
                    </tr>
                    </tbody>
                </table>

                    <div style={{width: '95%'}}>
                        {photos.length>0?<Gallery photos={photos} direction={"column"} margin={20} columns={columns} ImageComponent={PhotoUserValues} onClick={this.handleClick}/>:<div style={{height:'80%'}}/>}
                    </div>

                    <div style={{width: 20, height: 20}}></div>
                </div>
                <BottomBarPrivate lang={lang}/>
            </div>
        );
    }
}

UserValuesPagePrivate.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

export default injectIntl(withStyles(pageDefault)(UserValuesPagePrivate));