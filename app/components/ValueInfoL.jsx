import React from 'react';
import PropTypes from 'prop-types';

const ValueInfoL = ({l,name}) => (
   <div>
       <p>{name}</p>
   </div>
);

ValueInfoL.propTypes = {
    l: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default  ValueInfoL;