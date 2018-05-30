import { computed, decorate, observable } from "mobx";

import { Client } from "verge-node-typescript";
import log from "electron-log";

const vergeClient = new Client({ user: "kyon", pass: "lolcat" });

const getAccountInfo = () =>
  vergeClient
    .getInfo()
    .then(info =>
      vergeClient.getPeerInfo().then(peers => {
        const highestBlock = Math.max(
          ...peers.map(peer => peer.startingheight)
        );
        return { ...info, highestBlock };
      })
    )
    .catch(log.error);

class AccountInformationStore {
  constructor() {
    this.info = {
      balance: 0
    };
    setInterval(() => {
      getAccountInfo()
        .then(info => {
          this.info = { ...this.info, ...info };
        })
        .catch(log.error);
    }, 5000);
  }

  sendTransaction(vergeAddress, amount) {
    return vergeClient.sendToAddress(vergeAddress, amount);
  }

  get getUpdatedInfo() {
    return this.info;
  }

  get getBalance() {
    return this.info.balance;
  }
}

decorate(AccountInformationStore, {
  info: observable.struct,
  getUpdatedInfo: computed,
  getBalance: computed
});

const store = new AccountInformationStore();
export default store;
