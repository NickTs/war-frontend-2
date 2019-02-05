import {getCountries as getCountriesEn} from './assets/en'
import {getCountries as getCountriesRu} from './assets/ru'
import {getNationIdTypes as getNationIdTypesEn} from './assets/en'
import {getNationIdTypes as getNationIdTypesRu} from './assets/ru'
import {getPictureCreationTech as getPictureCreationTechEn} from './assets/en'
import {getPictureCreationTech as getPictureCreationTechRu} from './assets/ru'
import {getMetricLengthTypes as getMetricLengthTypesEn} from './assets/en'
import {getMetricLengthTypes as getMetricLengthTypesRu} from './assets/ru'


export const getDictLangs = () => {
    return [
        {
            "key": "en",
            "label": "English",
            "active": true
        },
        {
            "key": "zn",
            "label": "中文",
            "active": false
        },
        {
            "key": "ja",
            "label": "日本語",
            "active": false
        },
        {
            "key": "ar",
            "label": "العَرَبِيَّة",
            "active": false
        },
        {
            "key": "ko",
            "label": "한국어",
            "active": false
        },
        {
            "key": "de",
            "label": "Deutsch",
            "active": false
        },
        {
            "key": "fr",
            "label": "Français",
            "active": false
        },
        {
            "key": "ru",
            "label": "Русский",
            "active": true
        },        {
            "key": "es",
            "label": "Español",
            "active": false
        },
        {
            "key": "it",
            "label": "Italiano",
            "active": false
        }

    ]
}

export const getDictLangsLabel = (key) => {
    let res = key
    {getDictLangs().map(langData => {
        if(langData.key==key) {
            res = langData.label
        }
    })}
    return res
}

export const getElementByLang = (arr, lang) => {
    if(arr && arr.length>0){
        for(var i=0; i< arr.length; i++){
            if(arr[i].l==lang) return arr[i]
        }
        if(lang!='en'){
            for(var i=0; i< arr.length; i++){
                if(arr[i].l=='en') return arr[i]
            }
        }
        return arr[0]
    } else {
        return undefined;
    }
}

export const getDictCountries = (lang) => {
    if(lang){
        if(lang=='ru'){
            return getCountriesRu()
        } else {
            return getCountriesEn()
        }
    } else {
        return getCountriesEn()
    }
}

export const getDictCountryLabel = (lang, key) => {
    if(!key) return undefined
    let arr = getDictCountries(lang)
    for(var i=0; i<arr.length;i++){
        if(arr[i].key==key) return arr[i].label
    }
    return key
}

export const getDictNationIdTypes = (lang) => {
    if(lang){
        if(lang=='ru'){
            return getNationIdTypesRu()
        } else {
            return getNationIdTypesEn()
        }
    } else {
        return getNationIdTypesEn()
    }
}

export const getDictNationIdTypeLabel = (lang, key) => {
    if(!key) return undefined
    let arr = getDictNationIdTypes(lang)
    for(var i=0; i<arr.length;i++){
        if(arr[i].key==key) return arr[i].label
    }
    return key
}

export const getPictureCreationTechTypes = (lang) => {
    if(lang){
        if(lang=='ru'){
            return getPictureCreationTechRu()
        } else {
            return getPictureCreationTechEn()
        }
    } else {
        return getPictureCreationTechEn()
    }
}

export const getPictureCreationTechLabel = (lang, key) => {
    if(!key) return undefined
    let arr = getPictureCreationTechTypes(lang)
    for(var i=0; i<arr.length;i++){
        if(arr[i].key==key) return arr[i].label
    }
    return key
}

export const getPictureCreationTechKey = (lang, label) => {
    if(!label) return undefined
    let arr = getPictureCreationTechTypes(lang)
    for(var i=0; i<arr.length;i++){
        if(arr[i].label==label) return arr[i].key
    }
    return label
}

export const getMetricLengthTypes = (lang) => {
    if(lang){
        if(lang=='ru'){
            return getMetricLengthTypesRu()
        } else {
            return getMetricLengthTypesEn()
        }
    } else {
        return getMetricLengthTypesEn()
    }
}

export const getMetricLengthLabel = (lang, key) => {
    if(!key) return undefined
    let arr = getMetricLengthTypes(lang)
    for(var i=0; i<arr.length;i++){
        if(arr[i].key==key) return arr[i].label
    }
    return key
}

