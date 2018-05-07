import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';


class Menu extends PureComponent {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    );
  }
}


export default Menu;
