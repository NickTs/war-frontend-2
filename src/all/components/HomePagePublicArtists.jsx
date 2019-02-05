import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {homePagePublicArtists} from '../styles/ThemeDefault'
import {injectIntl} from "react-intl";
import ButtonBorderPrimary from "./ButtonBorderPrimary";
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';

const tileDataEn = [
    {
        label: 'step1',
        imgPath: '/static/tmp/artist01.jpg',
        artistName: 'Lezzueck Coosemans',
        artistCountry: 'Germany'
    },
    {
        label: 'step2',
        imgPath: '/static/tmp/artist02.jpg',
        artistName: 'Sylvia Baldeva',
        artistCountry: 'France'
    },
    {
        label: 'step3',
        imgPath: '/static/tmp/artist03.jpg',
        artistName: 'Barbara Mydlak',
        artistCountry: 'Poland'
    },
    {
        label: 'step4',
        imgPath: '/static/tmp/artist04.jpg',
        artistName: 'David Gery',
        artistCountry: 'France'
    },
    {
        label: 'step5',
        imgPath: '/static/tmp/artist05.jpg',
        artistName: 'Chelsea Davine',
        artistCountry: 'United Kingdom'
    },
    {
        label: 'step6',
        imgPath: '/static/tmp/artist06.jpg',
        artistName: 'Dagmar Vogt',
        artistCountry: 'Germany'
    },
];

const tileDataRu = [
    {
        label: 'step1',
        imgPath: '/static/tmp/artist01.jpg',
        artistName: 'Лезуек Куземанс',
        artistCountry: 'Германия'
    },
    {
        label: 'step2',
        imgPath: '/static/tmp/artist02.jpg',
        artistName: 'Сильвия Балдева',
        artistCountry: 'Франция'
    },
    {
        label: 'step3',
        imgPath: '/static/tmp/artist03.jpg',
        artistName: 'Барабара Мидлак',
        artistCountry: 'Польша'
    },
    {
        label: 'step4',
        imgPath: '/static/tmp/artist04.jpg',
        artistName: 'Дэвид Джерри',
        artistCountry: 'Франция'
    },
    {
        label: 'step5',
        imgPath: '/static/tmp/artist05.jpg',
        artistName: 'Челси Дэвин',
        artistCountry: 'Великобритания'
    },
    {
        label: 'step6',
        imgPath: '/static/tmp/artist06.jpg',
        artistName: 'Дагмар Волт',
        artistCountry: 'Германия'
    },
];


class HomePagePublicArtists extends React.Component {
    render() {
        const {classes, lang, intl, goArtists} = this.props;
        let tileData;
        if(lang=='ru'){
            tileData = tileDataRu
        } else {
            tileData = tileDataEn
        }
        return (
            <div className={classes.gridRoot}>
                <div className={classes.title}>
                    {intl.formatMessage({id: 'HomePagePublicArtists.title'})}
                </div>
                <GridList className={classes.gridList} cols={2}>
                    {tileData.map(tile => (
                        <GridListTile key={tile.label} style={{height: 'auto', width: 'auto'}}>
                            <div align="center" style={{padding: 10}}>
                                <div style={{position: "relative"}}>
                                    <img src={tile.imgPath} alt={tile.artistName} style={{height: 290, width: 'auto'}}/>
                                    <div className={classes.artistName}>
                                        {tile.artistName}
                                    </div>
                                    <div className={classes.artistCountry}>
                                        {tile.artistCountry}
                                    </div>
                                </div>
                            </div>
                        </GridListTile>
                    ))}
                </GridList>
                <div className={classes.bottomPanel}>
                    <ButtonBorderPrimary style={{minWidth: 350}} onClick={()=>goArtists(lang)}>
                        {intl.formatMessage({id: 'HomePagePublicArtists.btnAll'})}
                        <ArrowRightAlt style={{paddingLeft: 10}}/>
                    </ButtonBorderPrimary>
                </div>
            </div>
        );
    }
}

HomePagePublicArtists.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
};

export default injectIntl(withStyles(homePagePublicArtists)(HomePagePublicArtists));