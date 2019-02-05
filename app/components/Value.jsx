import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {removeValue} from '../actions/Values';
import PropTypes from 'prop-types';
import {ValueInfoL} from "./ValueInfoL";

const Value = ({id, intId, vt, info, dispatch}) => (
    <div>
        <Link to={`/value/${id}`}>
            <h4>{id} ({intId})</h4>
        </Link>
        <p>Value type: {vt}</p>
        {info && <p>{info.get(0).name}</p>}
        <button onClick={() => {
            dispatch(removeValue({id}));
        }}>Remove
        </button>
    </div>
);

Value.propTypes = {
    id: PropTypes.string.isRequired,
    intId: PropTypes.string,
    vt: PropTypes.string.isRequired,
    info: PropTypes.arrayOf(PropTypes.instanceOf(ValueInfoL))

};

export default connect()(Value);