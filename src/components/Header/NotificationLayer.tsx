import * as React from 'react'

import NotificationTile from './NotificationTile'

const NotificationLayer = ({
  notifications,
}: {
  notifications: INotification[]
}) => (
  <div className="container">
    {notifications.map((notification, index) => (
      <NotificationTile
        key={`${notification.timeOfOccurance}#${notification.type}`}
        {...notification}
        first={index === 0}
      />
    ))}
  </div>
)

export default NotificationLayer
