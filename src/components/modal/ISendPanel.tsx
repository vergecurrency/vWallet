import * as React from 'react'
import { AccountInformationStore } from '../../stores/AccountInformationStore'
import SendState from '../../utils/SendState'

export default abstract class ISendPanel<
  P extends ISendPanelProps,
  S extends ISendPanelState
> extends React.Component<P, S> {
  sendTransaction(
    address: string,
    amount: number,
    accountStore: AccountInformationStore,
  ) {
    this.setState({ status: SendState.SENDING, error: null })
    setTimeout(() => {
      accountStore
        .sendTransaction(address, amount)
        .then(() => {
          setTimeout(() => {
            this.setState({ status: SendState.DONE })
            setTimeout(() => {
              this.props.toggle()
              this.setState({
                amount: 0,
                address: '',
                label: '',
                status: SendState.OPEN,
              })
            }, 1000)
          }, 500)
        })
        .catch(e => {
          this.setState({
            status: SendState.ERROR,
            error: e,
          })
          setTimeout(() => {
            this.setState({
              status: SendState.OPEN,
              error: null,
            })
          }, 2500)
        })
    }, 1000)
  }
}

export interface ISendPanelState {
  amount: number
  address: string
  label: string
  status: SendState
  error: string | null
}

export interface ISendPanelProps {
  toggle: () => void
}
