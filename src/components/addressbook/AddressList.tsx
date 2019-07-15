import * as React from 'react'
import ProfileListItem from './ProfileListItem'
import { translate, Trans } from 'react-i18next'
import { inject, observer } from 'mobx-react'
import { ContactStore } from '../../stores/addressbook/ContactStore'
import ProfileDetails from './ProfileDetails'
import IContact from '../../stores/addressbook/IContact'
import Contact from '../../stores/addressbook/Contact'

class AddressList extends React.Component<{
  ContactStore?: ContactStore
  t: (text: string) => string
}> {
  state: {
    selection: IContact | null
    editing: boolean
  } = { selection: null, editing: false }

  toggleContact(id: string) {
    return () => {
      this.setState({
        selection: this.props.ContactStore!.getContactById(id),
        editing: false,
      })
    }
  }

  isContactSelection(contact: IContact) {
    if (this.state.selection) {
      return contact.id === this.state.selection.id
    }

    return false
  }

  addNewContact() {
    const newContact: IContact = new Contact('', '')
    this.props.ContactStore!.addContact(newContact)
    this.toggleContact(newContact.id)()
    this.setState({ editing: true })
  }

  filterContacts(e: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = e.target.value
    this.props.ContactStore!.setSearchTerm(searchTerm)
  }

  render() {
    return (
      <div className="addressbook h-100">
        <div className="row h-100">
          <div className="col-3">
            <div className="h-100 d-flex flex-column">
              <div className="row divider-bottom header justify-content-between">
                <div></div>
                <span>
                  <Trans i18nKey={'addressPanel.contacts'} />
                </span>
                <div className="add-button pr-3" onClick={this.addNewContact.bind(this)}>
                  +
                    </div>
              </div>
              <div className="row w-100 p-0 m-0">
                <input
                  className="search-input"
                  type="text"
                  placeholder={this.props.t('addressPanel.searchContact')}
                  value={this.props.ContactStore!.filterTerm}
                  onChange={this.filterContacts.bind(this)}
                />
              </div>
              <div className="row  p-0 m-0 flex-grow-1">
                <div className="profile-list w-100">
                  {this.props.ContactStore!.allContacts.map(contact => (
                    <ProfileListItem
                      contact={contact}
                      toggle={this.toggleContact.bind(this)}
                      key={contact.id}
                      selection={this.isContactSelection(contact)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-9 p-0 m-0 details-view">
            <div className="h-100 d-flex flex-column">
              <div className="header divider-bottom justify-content-center">
                <button
                  disabled={this.state.selection == null}
                  onClick={() => {
                    this.setState({ editing: !this.state.editing })
                  }}
                  className="left-edit"
                >
                  {this.state.editing ? (
                    <Trans i18nKey={'addressPanel.save'} />
                  ) : (
                      <Trans i18nKey={'addressPanel.edit'} />
                    )}
                </button>
                <button
                  disabled={this.state.selection == null}
                  onClick={() => {
                    if (this.state.selection) {
                      this.props.ContactStore!.removeContact(this.state.selection)
                      this.setState({ selection: null })
                    }
                  }}
                  className="left-edit"
                >
                  <Trans i18nKey={'addressPanel.delete'} />
                </button>
              </div>
              <div className="gap"></div>
              {this.state.selection ? (
                <div className="flex-grow-1">
                  <ProfileDetails cla
                    editing={this.state.editing}
                    contact={this.state.selection}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default translate('translations')(
  inject('ContactStore')(observer(AddressList)),
)
