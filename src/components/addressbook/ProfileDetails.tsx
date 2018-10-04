import * as React from 'react'
import IContact from '../../stores/addressbook/IContact'
import Avatar from 'react-avatar'
import { translate, Trans } from 'react-i18next'
import { observer, inject } from 'mobx-react'
import { TransactionStore } from '../../stores/TransactionStore'
import Transaction from '../transaction/Transaction'
import Copy from '../../icons/Copy'
import Send from '../../icons/Send'

class ProfileDetails extends React.Component<{
  contact: IContact
  editing: boolean
  TransactionStore?: TransactionStore
  t: (text: string) => string
}> {
  headerProfile(edit: boolean = false) {}

  callToAction() {}

  render() {
    if (this.props.editing) {
      return (
        <div>
          <div className="profile-view">
            <Avatar
              className="avatar"
              name={this.props.contact.getShortenedName()}
              size="75"
              round={true}
            />
            <div className={this.props.editing ? 'edit-profile' : ''}>
              <input
                className={this.props.editing ? 'name edit' : ''}
                value={this.props.contact.name}
                onChange={e => this.props.contact.setName(e.target.value)}
                placeholder={this.props.t('addressPanel.contactName')}
              />
              <br />
              <input
                className="address"
                value={this.props.contact.address}
                placeholder={this.props.t('addressPanel.contactAddress')}
                onChange={e => this.props.contact.setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="transactions">
            <Trans
              className="lastest-transactions"
              i18nKey={'addressPanel.latestTransactions'}
            />
            <div className="transaction-items">
              {this.props.TransactionStore!.lastTenTransaction.map(
                transaction => (
                  <div
                    className="row transaction-list-item"
                    key={`${transaction.txid}#${transaction.category}#${
                      transaction.address
                    }#${transaction.timereceived}`}
                  >
                    <Transaction {...transaction} />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="profile-view">
          <Avatar
            className="avatar"
            name={this.props.contact.getShortenedName()}
            size="75"
            round={true}
          />
          <div className="text-container">
            <h2 className="name-detail">{this.props.contact.name}</h2>{' '}
            <p className="address">{this.props.contact.address}</p>
            {this.props.contact.address !== '' ? (
              <div className="quick-action">
                <div className="quick-action-item">
                  <Send width={16} height={16} fill={'#fff'} />{' '}
                  <span className="action-item">
                    <Trans i18nKey={'addressPanel.sendMoney'} />
                  </span>
                </div>
                <div className="quick-action-item next">
                  <Copy width={16} height={16} fill={'#fff'} />{' '}
                  <span className="action-item">
                    <Trans i18nKey={'addressPanel.copyAddress'} />
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="transactions">
          <p className="lastest-transactions">
            <Trans i18nKey={'addressPanel.latestTransactions'} />
          </p>
          <div className="transaction-items">
            {this.props.TransactionStore!.lastTenTransaction.map(
              transaction => (
                <div
                  className="row transaction-list-item"
                  key={`${transaction.txid}#${transaction.category}#${
                    transaction.address
                  }#${transaction.timereceived}`}
                >
                  <Transaction {...transaction} />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default translate('translations')(
  inject('TransactionStore')(observer(ProfileDetails)),
)
