import { observable, computed } from "mobx";
import { Client } from "verge-node-typescript";
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
    .catch(console.error);

class AccountInformationStore {
  @observable
  info = {
    balance: 0
  };

  constructor() {
    setInterval(() => {
      getAccountInfo()
        .then(info => {
          this.info = { ...this.info, ...info };
        })
        .catch(console.error);
    }, 5000);
  }

  @computed
  get getUpdatedInfo() {
    return this.info;
  }

  get getBalance() {
    return this.info.balance;
  }
}

const store = new AccountInformationStore();
export default store;
