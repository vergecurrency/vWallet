import * as React from 'react'
import Avatar from 'react-avatar'
import IContact from '../../stores/addressbook/IContact'

export default class ProfileListItem extends React.Component<{
  contact: IContact
  toggle: (id: string) => () => void
  selection: boolean
}> {
  render() {
    return (
      <div
        className={`row profile-item ${this.props.selection ? 'selected' : ''}`}
        onClick={this.props.toggle(this.props.contact.id)}
      >
        <div className="col-md-3">
          <Avatar name={this.props.contact.name} size="35" round={true} />
        </div>
        <div className="col-md-9">
          <span className="firstname">{this.props.contact.name}</span>
        </div>
      </div>
    )
  }
}
