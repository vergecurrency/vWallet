import * as React from 'react'

import NotificationTile from './NotificationTile'
// import BellOffIcon from 'react-material-icon-svg/dist/BellOffIcon'
import MessageProcessingIcon from 'react-material-icon-svg/dist/MessageProcessingIcon'

const NotificationLayer = ({
  notifications,
}: {
  notifications: INotification[],
}) => (
  <div className="notifications-list">
    {notifications.map((notification) => (
      <NotificationTile
        key={`${notification.timeOfOccurance}#${notification.type}`}
        {...notification}
      />
    ))}
    {notifications.length === 0 && (
      <div className="notifications-list-empty">
        <div className="notifications-list-empty-icon">
          <MessageProcessingIcon
            width={100}
            height={100}
            fill="#d6dee2"
          />
        </div>
        <div className="notifications-list-empty-description">No notifications</div>
      </div>
    )}
  </div>
)

export default NotificationLayer
