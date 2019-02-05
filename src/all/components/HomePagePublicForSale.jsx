import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/icons/Input';
import {homePagePublicForSale} from '../styles/ThemeDefault'
import {injectIntl} from "react-intl";
import ButtonBorderPrimary from "./ButtonBorderPrimary";
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';

const tileDataEn = [
    {
        label: 'step1',
        imgPath: '/static/tmp/picture01.jpg',
        valueName: 'Danse, bleu',
        valueCreator: 'Ewa Hauton'
    },
    {
        label: 'step2',
        imgPath: '/static/tmp/picture02.jpg',
        valueName: 'You may not recognize me today',
        valueCreator: 'Petra Kaindel'
    },
    {
        label: 'step3',
        imgPath: '/static/tmp/picture03.jpg',
        valueName: 'Sans titre',
        valueCreator: 'Nicola Bonessa'
    },
    {
        label: 'step4',
        imgPath: '/static/tmp/picture04.jpg',
        valueName: 'Going through gaps',
        valueCreator: 'Marittie De Villiers'
    },
    {
        label: 'step5',
        imgPath: '/static/tmp/picture05.jpg',
        valueName: 'Fluid Boundary',
        valueCreator: 'Peggy Cozzi'
    },
    {
        label: 'step6',
        imgPath: '/static/tmp/picture06.jpg',
        valueName: 'Dawning Awareness',
        valueCreator: 'Ford Smith'
    },
    {
        label: 'step7',
        imgPath: '/static/tmp/picture07.jpg',
        valueName: 'Visible silence',
        valueCreator: 'Dorel Dobocan'
    },
];

const tileDataRu = [
    {
        label: 'step1',
        imgPath: '/static/tmp/picture01.jpg',
        valueName: 'Танец, синий',
        valueCreator: 'Ева Хотон'
    },
    {
        label: 'step2',
        imgPath: '/static/tmp/picture02.jpg',
        valueName: 'Вы можете не узнать меня сегодня',
        valueCreator: 'Петра Кендель'
    },
    {
        label: 'step3',
        imgPath: '/static/tmp/picture03.jpg',
        valueName: 'Без названия',
        valueCreator: 'Николло Бонесса'
    },
    {
        label: 'step4',
        imgPath: '/static/tmp/picture04.jpg',
        valueName: 'Проходя через просторы',
        valueCreator: 'Маррита де Виллерс'
    },
    {
        label: 'step5',
        imgPath: '/static/tmp/picture05.jpg',
        valueName: 'Граница жидкости',
        valueCreator: 'Пегги Коззи'
    },
    {
        label: 'step6',
        imgPath: '/static/tmp/picture06.jpg',
        valueName: 'Заря осознания',
        valueCreator: 'Форд Смит'
    },
    {
        label: 'step7',
        imgPath: '/static/tmp/picture07.jpg',
        valueName: 'Видимая тишина',
        valueCreator: 'Дорель Добокан'
    },
];


class HomePagePublicForSale extends React.Component {
    render() {
        const {classes, lang, intl, goAllSales, goLogin} = this.props;
        let tileData;
        if(lang=='ru'){
            tileData = tileDataRu
        } else {
            tileData = tileDataEn
        }
        return (
            <div className={classes.gridRoot}>
                <div className={classes.title}>
                    {intl.formatMessage({id: 'HomePagePublicForSale.title'})}
                </div>
                <div className={classes.subtitle}>
                    {intl.formatMessage({id: 'HomePagePublicForSale.subtitle'})}
                </div>
                <GridList className={classes.gridList} cols={2}>
                    {tileData.map(tile => (
                        <GridListTile key={tile.label} style={{height: 'auto', width: 'auto'}}>
                            <table>
                                <tbody>
                                <tr>
                                    <td align="center" style={{padding: 10}}>
                                        <div style={{position: "relative"}}>
                                        <img src={tile.imgPath} alt={tile.valueName} style={{height: 290, width: 'auto'}}/>
                                        <IconButton className={classes.iconBuy} onClick={()=>goLogin(lang)}>
                                            <Input style={{width:50,height:50,color:"#ffffff"}}/>
                                        </IconButton>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style={{padding: 10}}><b>{tile.valueName}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style={{padding: 10}}>{tile.valueCreator}</td>
                                </tr>
                                </tbody>
                            </table>
                        </GridListTile>
                    ))}
                </GridList>
                <div className={classes.bottomPanel}>
                    <ButtonBorderPrimary style={{minWidth:350}} onClick={()=>goAllSales(lang)}>
                        {intl.formatMessage({id: 'HomePagePublicForSale.btnAll'})}
                        <ArrowRightAlt style={{paddingLeft:10}}/>
                    </ButtonBorderPrimary>
                </div>
            </div>
        );
    }
}

HomePagePublicForSale.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
};

export default injectIntl(withStyles(homePagePublicForSale)(HomePagePublicForSale));