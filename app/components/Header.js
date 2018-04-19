import React from 'react';
import Switch from 'rc-switch';

export default () => (
  <nav
    className="navbar navbar-default navbar-fixed-top"
    style={{
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      height: '75px',
      paddingBottom: '20px'
    }}
  >
    <div className="container">
      <a href="#">
        <img
          src="resources/assets/menu.png"
          style={{ maxHeight: '20px', marginLeft: '25px' }}
          alt="menu button"
        />
      </a>

      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
          <a href="#">D8dhMzcYseHWw1WzTg2Yexd7kyvc7HyyMb</a>
        </ul>
      </div>

      <a className="navbar-brand" href="#" style={{ margin: '0 auto' }}>
        <img src="resources/assets/logo.png" style={{ maxHeight: '40px' }} alt="verge logo" />
      </a>
      {/* <ul className="nav navbar-nav navbar-right">
        <Switch checkedChildren="Wrait activated" unCheckedChildren="Wrait activated" />
</ul> */}
    </div>
  </nav>
);
