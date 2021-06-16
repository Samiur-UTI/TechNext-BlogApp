import React from 'react';
import {NavLink} from 'react-router-dom';
import './nav.styles.scss';
export default function Nav() {
    return (
        <div className="nav-container">
            <NavLink to="/" activeClassName="selected">
                HOME
            </NavLink>
            <NavLink to="/profile" activeClassName="selected">
                MY PROFILE
            </NavLink>
            <NavLink to="/users" activeClassName="selected">
                USERS
            </NavLink>
        </div>
    )
}
