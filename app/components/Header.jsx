import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <h2>World Art Registry</h2>
        <h4>Value Management</h4>
        <div className='header__nav'>
            <NavLink to='/' activeClassName='activeNav' exact={true}>Dashboard</NavLink>
            <NavLink to='/add' activeClassName='activeNav'>Add Value</NavLink>
        </div>
    </header>
);

export default Header;