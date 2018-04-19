import React from 'react';
import moment from 'moment';

export default ({
  account,
  address,
  amount,
  blockhassh,
  category,
  confirmation,
  time,
  timereceived,
  txid
}) => (
  <div className="container">
    <div className="row">
      <h5>{moment.unix(timereceived).format('MM/DD/YYYY  hh:mm')}</h5>
    </div>
    <div className="row">
      <div className="col-md-2" style={{ color: 'white', fontWeight: 'bold' }}>
        Category:
      </div>
      {category.includes('receive') ? `Received from ${account}` : `Sent to ${address}`}
    </div>
    <div className="row">
      {' '}
      <div className="col-md-2" style={{ color: 'white', fontWeight: 'bold' }}>
        TXID:
      </div>{' '}
      {txid}
    </div>
  </div>
);
