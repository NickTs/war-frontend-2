import React from 'react'
import TopBarPublicFunc from '../containers/TopBarPublicFunc'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl"
import {GetElementByHref, GetElementById, GetRequestParam} from "../Utils";
import {pageDefault} from "../styles/ThemeDefault";
import BottomBarPublic from "./BottomBarPublic";
import Gallery from "react-photo-gallery"
import PhotoUserValues from "./PhotoUserValues";
import Typography from '@material-ui/core/Typography';


function columns(containerWidth) {
    let columns = 1;
    if (containerWidth >= 800) columns = 2;
    if (containerWidth >= 1100) columns = 3;
    return columns;
}


class CatalogPagePublic extends React.Component {

    handleClick = (event, data) => {
        const {lang, goValueInfo} = this.props;
        //document.location.href = "/public/"+lang+"/value?valueid="+data.photo.valueId
    }

    render() {
        const {classes, intl, goRegister, goLogin, lang, dbValues} = this.props;

        const photos = []

        if (dbValues && dbValues.listPicture) {
            dbValues.listPicture.map(dbPicture => {
                let title = GetElementById(dbValues.listValue, dbPicture.valueId).info[0].name + " (" + dbPicture.dateCreate + ")"
                let imgInfo = GetElementByHref(dbValues.listImgInfo, dbPicture.attachments[0].href)
                photos.push({
                    src: dbPicture.attachments[0].href+'?imgsize=1000',
                    title: title,
                    author: dbPicture.info[0].author,
                    width: imgInfo?imgInfo.ws:1,
                    height: imgInfo?imgInfo.hs:1,
                    valueId: dbPicture.valueId,
                    vt: 'pict',
                    goto: "/public/"+lang+"/value/?valueid="+dbPicture.valueId
                })
            })
        }

        return (
            <div className={classes.root}>
                <TopBarPublicFunc visibleHome={true} goRegister={goRegister} goLogin={goLogin} lang={lang}/>
                <div style={{backgroundColor: '#F7F7F7'}}>

                    <table style={{width: '95%'}}>
                        <tbody>
                        <tr>
                            <td>
                                <Typography variant="h4" className={classes.title}
                                            style={{marginLeft: 30, marginTop: 20, marginBottom: 10}}>
                                    {intl.formatMessage({id: 'CatalogPagePublic.title'})}
                                </Typography>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div style={{width: '95%'}}>
                        {photos.length>0?<Gallery photos={photos} direction={"column"} margin={20} columns={columns} ImageComponent={PhotoUserValues} onClick={this.handleClick}/>:<div style={{height:'80%'}}/>}
                    </div>

                    <div style={{width: 20, height: 20}}></div>
                </div>
                <BottomBarPublic lang={lang}/>
            </div>
        );
    }
}

CatalogPagePublic.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

export default injectIntl(withStyles(pageDefault)(CatalogPagePublic));