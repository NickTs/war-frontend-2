export const themeSpacingUnit = 5

export const colorPrimary = '#69000C';
export const colorPrimaryDefault = '#D6002A'
export const colorPrimaryActive = '#BF0025'
export const colorBasicNormal = '#000000'
export const colorBasicInverse = '#FFFFFF'
export const colorSecondaryLight = '#F7F7F7'
export const colorSecondaryNormal = '#B9B9B9'
export const colorSecondaryDark = '#A6A6A6'
export const colorErrorDefault = colorPrimaryDefault;
export const colorPageBackground = '#FFFFFF';
export const colorTopBarBackground = colorPrimary;
export const colorPrimaryInverse = '#FFFFFF';
export const colorInfoTitleBackground = 'rgba(105,0,12,1)';
export const colorInfoBodyBackground = 'rgba(105,0,12,0.7)';

export const fontHead1 = {
    fontSize: '70px',
    fontWeight: '900'
}

export const fontHead2 = {
    fontSize: '40px',
    fontWeight: 'bold'
}

export const fontHead3 = {
    fontSize: '26px',
    fontWeight: '600'
}

export const fontHead4 = {
    fontSize: '24px',
    fontWeight: 'normal'
}

export const fontHead5 = {
    fontSize: '18px',
    fontWeight: '500'
}

export const fontHead6 = {
    fontSize: '16px',
    fontWeight: '600'
}

export const paragraphDefault1 = {
    fontSize: '14px',
    fontWeight: '300',
    lineHeight: '1.5'
}

export const paragraphLeadText1 = {
    fontSize: '18px',
    fontWeight: 'normal',
    lineHeight: '1.6'
}

export const paragraphLeadText2 = {
    fontSize: '16px',
    fontWeight: 'normal',
    lineHeight: '1.6',
    wordSpacing: '10px'
}

export const errorText1 = {
    fontSize: '12px',
    fontWeight: 'normal',
    color:  colorErrorDefault
}


export const pageDefault = () => ({
    root: {
        backgroundColor: colorPageBackground,
        width: '100vw',
    },
    title: titleStyle,
    resume: {
        color: '#ffffff',
        width: '50vw'
    },
    info: {
        backgroundColor: '#6b6b6b',
        display: 'flex',
        textAlign: 'left',
        height: '80vh'
    },
    infoCenter: {
        backgroundColor: '#6b6b6b',
        marginLeft: '50px',
        marginTop: 'auto',
        marginBottom: 'auto',
    }
});


export const topBarPublic = () => ({
    bar: {
        backgroundColor: '#FFFFFF',
        paddingTop: 5,
        paddingBottom: 5,
        border: '1px solid #cbcbcb'
    },
    menuButton: {
        color: '#000000',
        textTransform: 'none',
        ...fontHead5
    },
    iconButton: {
        color: '#000000',
    },
    icon: {
        fontSize: '30px'
    }
});

export const topBarPrivate = () => ({
    bar: {
        backgroundColor: '#FFFFFF',
        paddingTop: 5,
        paddingBottom: 5,
        border: '1px solid #cbcbcb'
    },
    menuButton: {
        color: '#000000',
        textTransform: 'none',
        ...fontHead5
    },
    iconButton: {
        color: '#000000',
    },
    icon: {
        fontSize: '30px'
    }
});

export const bottomBarPublic = () => ({
    bar: {
        backgroundColor: '#FFFFFF',

    },
    labelCopyright: {
        flexGrow: 1,
        color: '#7B7B7B',
        textTransform: 'none',
        ...paragraphDefault1
    },
    btnSocial: {
        color: '#7B7B7B',
    },
});

export const bottomBarPrivate = () => ({
    bar: {
        backgroundColor: '#FFFFFF',

    },
    labelCopyright: {
        flexGrow: 1,
        color: '#7B7B7B',
        textTransform: 'none',
        ...paragraphDefault1
    },
    btnSocial: {
        color: '#7B7B7B',
    },
});

export const languageSelect = () => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: 3
    },
    formControl: {

    },
    selectRoot: {
        color: '#000000',
        ...fontHead5,
    },
    selectIcon: {
        color: '#000000',
        fontSize: fontHead5.fontSize
    },

});

export const buttonBorderPrimary = () => ({
    root: {
        backgroundColor: '#ffffff',
        borderColor: colorSecondaryDark,
        color: '#000000',
        '&:hover': {
            backgroundColor: colorPrimary,
            color: '#ffffff',
        },
    },
});

export const panelEditAction = () => ({
    root: {
        backgroundColor: '#ffffff',
        borderColor: colorSecondaryDark,
    },
    btn: {
        ...buttonBorderPrimary.root
    },
});


export const outlinedInputDefault = () => ({
    input: {
        padding: '8.5px 7px',
    },
});

export const homePagePublicInfo = () => ({
    root: {
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: 5 * 4,
        backgroundColor: colorPageBackground,
    },
    divParent: {
        position: 'relative'
    },
    img: {
        display: 'block',
        overflow: 'hidden',
        width: '100%',
    },
    block: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        marginLeft: '-200px',
        width: '400px',
        color: colorPrimaryInverse,
        backgroundColor: colorInfoBodyBackground,
        padding: '30px',
        ...fontHead4
    },
    spanTitle: {
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: colorInfoTitleBackground,
        width: '50%',
        marginTop: '-45px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        ...paragraphDefault1
    },
    btnMore: {
        paddingLeft: 40,
        paddingRight: 40,
        color: colorPrimaryInverse,
        backgroundColor: colorInfoTitleBackground,
        '&:hover': {
            backgroundColor: colorPrimaryActive,
        },
        textTransform: 'none',
    }
});

export const homePagePublicBlock = () => ({
    gridRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: colorSecondaryLight,
        padding: 20,
    },
    title: {
        flexGrow: 1,
        width: '100%',
        paddingTop: 40,
        textAlign: 'center',
        ...fontHead2
    },
    subtitle: {
        flexGrow: 1,
        textAlign: 'center',
        width: '100%',
        ...fontHead5
    },
    bottomPanel: {
        paddingTop: '30px',
        paddingBottom: '30px',
    }
})

export const homePagePublicForSale = () => ({
    gridRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: colorSecondaryLight,
        padding: 20,
    },
    title: {
        flexGrow: 1,
        width: '100%',
        paddingTop: 40,
        textAlign: 'center',
        ...fontHead2
    },
    subtitle: {
        flexGrow: 1,
        textAlign: 'center',
        width: '100%',
        ...fontHead5
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    gridTitle: {
        color: colorTopBarBackground,
    },
    gridTitleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    iconBuy: {
        position: 'absolute',
        bottom: '0',
        left: '50%',
        marginLeft: '-25px',
        marginBottom: '20px',
        width: '50px',
        height: '50px'
    },
    bottomPanel: {
        paddingTop: '30px',
        paddingBottom: '30px',
    }
});

export const homePagePublicArtists= () => ({
    gridRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        padding: 20,
    },
    title: {
        flexGrow: 1,
        width: '100%',
        paddingTop: 40,
        textAlign: 'center',
        ...fontHead2
    },
    subtitle: {
        flexGrow: 1,
        paddingLeft: 60,
        width: '100%',
        ...fontHead5
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    gridTitle: {
        color: colorTopBarBackground,
    },
    gridTitleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    artistName: {
        color: '#ffffff',
        width: '100%',
        textAlign: 'center',
        position: 'absolute',
        bottom: '0',
        marginBottom: '40px',
    },
    artistCountry: {
        color: '#ffffff',
        width: '100%',
        textAlign: 'center',
        position: 'absolute',
        bottom: '0',
        marginBottom: '20px',
    },
    bottomPanel: {
        paddingTop: '30px',
        paddingBottom: '30px',
    },

});



export const stdDialog = () => ({
    titleRoot: {
        backgroundColor: colorTopBarBackground,
        borderBottom: `1px solid ${colorPrimaryActive}`,
        margin: 0,
        padding: themeSpacingUnit * 2,
        textAlign: 'center'
    },
    titleLabel:{
        color: colorPrimaryInverse,
        ...fontHead5
    },
    titleCloseButton: {
        position: 'absolute',
        right: themeSpacingUnit,
        top: 0,
        color: colorPrimaryInverse,
    },
    contentRoot: {
        margin: themeSpacingUnit * 4,
        padding: themeSpacingUnit * 2,
    },
    actionsRoot: {
        borderTop: `1px solid ${colorPrimaryActive}`,
        margin: 0,
        padding: themeSpacingUnit,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paperField: {
        padding: themeSpacingUnit,
    },
    textField: {
        marginLeft: themeSpacingUnit,
        marginRight: themeSpacingUnit,
    },
});


export const loginDialog = () => ({
    ...stdDialog()
});

export const registerDialog1 = () => ({
    ...stdDialog()
});

export const registerDialog2 = () => ({
    ...stdDialog()
});

export const registerDialog2Ok = () => ({
    ...stdDialog()
});

export const registerDialog3 = () => ({
    ...stdDialog()
});





export const profileGeneral = () => ({
});

















const colorRed = '#00ff00'

const titleStyle = {
    color: colorBasicNormal,
    fontWeight: 'bold'
}

export const styles2 = () => ({
    root: {
        backgroundColor: '#6b6b6b',
        width: '100vw',
        height: '100vh',
    },
    title: titleStyle,
    resume: {
        color: '#ffffff',
        width: '50vw'
    },
    info: {
        backgroundColor: '#6b6b6b',
        display: 'flex',
        textAlign: 'left',
        height: '80vh'
    },
    infoCenter: {
        backgroundColor: '#6b6b6b',
        marginLeft: '50px',
        marginTop: 'auto',
        marginBottom: 'auto',
    }
});