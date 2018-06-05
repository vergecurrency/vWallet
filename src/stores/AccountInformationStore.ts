import { computed, decorate, observable } from 'mobx';

import { Client } from 'verge-node-typescript';
import { WalletInfo } from 'verge-node-typescript/dist/WalletInfo';
import electronLog from 'electron-log';

const vergeClient = new Client({ user: 'kyon', pass: 'lolcat' });

const getAccountInfo = () =>
  vergeClient
    .getInfo()
    .then(info =>
      vergeClient.getPeerInfo().then(peers => {
        const highestBlock = Math.max(
          ...peers.map(peer => peer.startingheight),
        );
        return vergeClient
          .unlockWallet('a')
          .then(() => ({ ...info, highestBlock, unlocked: true }))
          .catch(e => {
            return {
              ...info,
              highestBlock,
              unlocked: e.includes('already unlocked'),
            };
          });
      }),
    )
    .catch(electronLog.error);

interface Info extends WalletInfo {
  highestBlock: number;
  unlocked?: boolean;
}

class AccountInformationStore {
  info: Info;

  constructor() {
    setInterval(() => {
      getAccountInfo()
        .then(info => {
          this.info = { ...this.info, ...info };
        })
        .catch(electronLog.error);
    }, 1000);
  }

  sendTransaction(vergeAddress, amount) {
    return vergeClient.sendToAddress(vergeAddress, amount);
  }

  unlockWallet(password) {
    return vergeClient.unlockWallet(password);
  }

  lockWallet() {
    return vergeClient.walletLock();
  }

  get getUpdatedInfo() {
    return this.info;
  }

  get getBalance() {
    return this.info.balance;
  }

  get unlocked() {
    return this.info.unlocked;
  }
}

decorate(AccountInformationStore, {
  info: observable.struct,
  getUpdatedInfo: computed,
  getBalance: computed,
  unlocked: computed,
});

const store = new AccountInformationStore();
export default store;
