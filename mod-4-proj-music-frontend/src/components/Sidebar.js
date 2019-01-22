import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import {Link} from 'react-router-dom'

const Sidebar = props => {

  return (
    <Menu>

    <Link to={"/home"} >
      <p className="menu-item">Home</p>
    </Link>

    <Link to={"/profile"} >
      <p className="menu-item">My Profile</p>
    </Link>

    <Link to={"/playlist"} >
      <p className="menu-item">My Playlists</p>
    </Link>

    <Link to={"/popular"} >
      <p className="menu-item">Top Hits</p>
    </Link>

    <Link to={"/random"} >
      <p className="menu-item">Random Songs</p>
    </Link>

    {props.login ? (
      <Link to={"/home"} >
      <p className="menu-item" onClick={props.logout}>Logout</p>
    </Link>
    ) : (
      <React.Fragment>
        <Link to={"/login"} >
          <p className="menu-item">Login</p>
        </Link>

        <Link to={"/signup"} >
          <p className="menu-item">Signup</p>
        </Link>
      </React.Fragment>
    )}


    </Menu>
  );
};
export default Sidebar;
