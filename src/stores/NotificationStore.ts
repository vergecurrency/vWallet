import { decorate, observable } from 'mobx'

export class NotificationStore {
  notifications: INotification[] = [
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

  transationTier: number[] = [
    10,
    30,
    60,
    100,
    250,
    500,
    1000,
    10000,
    100000,
    1000000,
  ]

  pricePercentDifference24h: number = 40

  marketCapTier: number[] = [
    500000000,
    1000000000,
    2500000000,
    5000000000,
    10000000000,
    25000000000,
    75000000000,
    100000000000,
    // Well thats then 🤪
  ]

  /**
   * Get all notifications.
   *
   * @returns {INotification[]}
   */
  public getNotifications(): INotification[] {
    return this.notifications
  }

  /**
   * Remove the notification from the list.
   *
   * @param {INotification} notification
   * @returns void
   */
  public removeNotification(notification: INotification) {
    this.notifications = this.notifications.filter(not => not.title !== notification.title)
  }
}

decorate(NotificationStore, {
  notifications: observable,
})

const store = new NotificationStore()

export default observable(store)
