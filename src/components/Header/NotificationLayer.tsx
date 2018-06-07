import * as React from 'react'

import NotificationTile from './NotificationTile'

const example = [
  {
    type: 'personal',
    title: 'Achievement!',
    inner: 'You have reached 10 transactions',
    timeOfOccurance: 1527777829,
  },
  {
    type: 'price',
    title: 'Mooooooning!',
    inner: 'Price has reached $0.20',
    timeOfOccurance: 1527778829,
  },
  {
    type: 'cap',
    title: 'Market Cap!',
    inner: 'We reached a Market cap of 1bln.',
    timeOfOccurance: 1527773829,
  },
]

const NotificationLayer = (notifications: INotification[] = example) => (
  <div className="container">
    {notifications.map((notification, index) => (
      <NotificationTile
        key={`${notification.timeOfOccurance}#${notification.type}`}
        {...notification}
        first={index == 0}
      />
    ))}
  </div>
)

export default NotificationLayer
