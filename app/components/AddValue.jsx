import React from 'react';
import ValueForm from './ValueForm';
import { connect } from 'react-redux';
import { addBook } from '../actions/Values';

const AddValue = (props) => (
    <div>
        <h3>Set Value information:</h3>
        <BookForm
            onSubmitBook={(value) => {
                props.dispatch(addValue(value));
                props.history.push('/');
            }}
        />
    </div>
);

export default connect()(AddValue);