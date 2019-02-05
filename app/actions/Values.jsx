import axios from '../axios/axios';
import {GET_VALUES, ADD_VALUE} from './ValueType';

const _getValues = (values) => ({
    type: GET_VALUES,
    values
});

export const getValues = () => {
    return (dispatch) => {
        return axios.get('values').then(result => {
            const values = [];
            result.data.forEach(item => {
                values.push(item);
            });
            dispatch(_getValues(values));
        });
    };
};

const _addValue = (value) => ({
    type: ADD_VALUE,
    value
});


export const addValue = (valueData = {
    vt: '',
    info: []
}) => {
    return (dispatch) => {
        const value = {
            vt: valueData.vt,
            info: valueData.info
        };
        return axios.post('values', value).then(result => {
            dispatch(_addValue(result.data));
        });
    };
};

