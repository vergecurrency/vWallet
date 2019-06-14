import * as React from 'react'

export default ({ name, keyName, usage }) => (
  <div className="row setting-keymap">
    <div className="col-md-4 setting-label">{name}</div>
    <div className="col-md-2 setting-keymap-command">{keyName}</div>
    <div className="col-md-6 setting-description">{usage}</div>
  </div>
)
