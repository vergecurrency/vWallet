import * as React from 'react'

import Achievement from '../../icons/Achievement'
import Moment from 'react-moment'
import PriceChart from '../../icons/PriceChart'
import PriceTag from '../../icons/PriceTag'
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon'
import NotificationStore from '../../stores/NotificationStore'

const perStep = 360 / 3
const getColor = (type: string) => {
  if (type === 'price') return String((perStep + 25) * 2)
  if (type === 'cap') return String((perStep + 25) * 4)
  if (type === 'personal') return String((perStep + 25) * 6)

  return ''
}

const getIcon = type => {
  switch (type) {
    case 'price':
      return <PriceTag width={20} height={20} style={{ fill: '#fff' }} />
    case 'cap':
      return <PriceChart width={20} height={20} style={{ fill: '#fff' }} />
    case 'personal':
      return <Achievement width={20} height={20} style={{ fill: '#fff' }} />
    default:
      return null
  }
}

class NotificationTile extends React.Component<INotification> {
  render() {
    return (
      <div className="notification-item">
        <div className="notification-item-icon-wrapper">
          <div
            className="notification-item-icon"
            style={{
              background: `linear-gradient(
            hsla(${ getColor(this.props.type) }, 55%, 45%, 1),
            hsla(${ getColor(this.props.type) }, 75%, 65%, 1)
          )`,
            }}
          >
            {getIcon(this.props.type)}
          </div>
        </div>
        <div className="notification-item-body">
          <div className="notification-item-title">{this.props.title}</div>
          <div className="notification-item-description">{this.props.inner}</div>
          <div className="notification-item-meta">
            <Moment unix fromNow>
              {this.props.timeOfOccurance}
            </Moment>
          </div>
        </div>
        <div className="notification-item-remove">
          <CloseIcon
            onClick={() => NotificationStore.removeNotification(this.props)}
            style={{ fill: '#6c9dbf' }}
            width={18}
            height={18}
          />
        </div>
      </div>
    )
  }
}

export default NotificationTile
