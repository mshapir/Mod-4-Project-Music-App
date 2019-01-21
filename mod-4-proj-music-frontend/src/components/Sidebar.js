import React from 'react';
import { slide as Menu } from 'react-burger-menu';

const Sidebar = props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/playlist">
        My Playlists
      </a>

      <a className="menu-item" href="/popular">
        Top Hits
      </a>

      <a className="menu-item" href="/random">
        Random Songs
      </a>

      <a className="menu-item" href="/login">
        Login
      </a>

      <a className="menu-item" href="/signup">
        Signup
      </a>
    </Menu>
  );
};
export default Sidebar
