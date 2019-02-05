import React from 'react';
import { connect } from 'react-redux';
import Value from './Value';

const ValueList = (props) => (
    <div>Value
        Value List:
        <ul>
            {props.values.map(value => {
                return (
                    <li key={value.id}>
                        <Book {...book} />
                    </li>
                );
            })}
        </ul>

    </div>
);

const mapStateToProps = (state) => {
    return {
        values: state
    };
}

export default connect(mapStateToProps)(ValueList);