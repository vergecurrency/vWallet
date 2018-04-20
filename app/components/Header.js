import React from 'react';
import Switch from 'rc-switch';
import WifiIcon from 'react-material-icon-svg/dist/WifiIcon';
import WifiOffIcon from 'react-material-icon-svg/dist/WifiOffIcon';
import LoadingIcon from './LoadingIcon';

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
      <div className="col-md-4">
        <a href="#">
          <img
            src="resources/assets/menu.png"
            style={{ maxHeight: '20px', marginLeft: '25px' }}
            alt="menu button"
          />
        </a>
      </div>

      {/*     <div className="col-md-2">
        <font color="white">Your address: D8dhMzcYseHWw1WzTg2Yexd7kyvc7HyyMb</font>
  </div> */}
      <div className="col-md-4">
        <img
          src="resources/assets/logo.png"
          style={{
            display: 'block',
            margin: 'auto',
            maxHeight: '40px'
          }}
          alt="verge logo"
        />
      </div>
      <div
        className="col-md-1"
        style={{
          textAlign: 'center',
          display: 'block',
          margin: 'auto'
        }}
      >
        <span
          style={{
            paddingTop: '10px',
            display: 'block',
            margin: 'auto'
          }}
        >
          <WifiIcon style={{ color: 'white', fill: 'white' }} />
        </span>
        <font color="white" style={{ fontSize: '10px' }}>
          Connection
        </font>
      </div>
      <div
        className="col-md-1"
        style={{
          textAlign: 'center',
          display: 'block',
          margin: 'auto'
        }}
      >
        <span
          style={{
            paddingTop: '10px',
            display: 'block',
            margin: 'auto'
          }}
        >
          <LoadingIcon />
        </span>
        <font color="white" style={{ fontSize: '10px' }}>
          Syncing
        </font>
      </div>
    </div>
  </nav>
);
