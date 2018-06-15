# VERGE Electron Wallet

## The new verge prototype wallet build with electron ❤️

_This wallet has no connection to the original **electrum** wallet, it is exclusively designed and developed for VERGE currency. Still it's open source._

[![VergeCurrency](https://raw.githubusercontent.com/vergecurrency/vergecurrency.com/master/static/img/verge-github-badge.png)](https://github.com/vergecurrency/vergecurrency.com)

#### Testing/Coverage Development: 

 _soon to be implemented_

#### Development Status:

[![Build Status](https://travis-ci.org/vergecurrency/vWallet.svg?branch=develop)](https://travis-ci.org/vergecurrency/vWallet)

#### Release Status:

[![Build Status](https://travis-ci.org/vergecurrency/vWallet.svg?branch=master)](https://travis-ci.org/vergecurrency/vWallet)

## Specifications

* Language: Javascript
* Frameworks: Electron, React, NodeJS
* communication standard: RPC (local)
  * port: 20102 (standard RPC)
  * limited to: 127.0.0.1
* Mining is not and will not be supported by this wallet!
* No `Test-Net connection` support at the moment

### Community

* [Telegram](https://t.me/VERGExvg)
* [Discord](https://discord.gg/vergecurrency)
* [Twitter](https://www.twitter.com/vergecurrency)
* [Facebook](https://www.facebook.com/VERGEcurrency/)
* [Reddit](https://www.reddit.com/r/vergecurrency/)

## Wallet Installation Guide

> ... coming soon!

## Manual Wallet Setup (developement)

1.  Creating a `VERGE.conf` in your VERGE application path:

MacOS: `~/Library/Application Support/VERGE`
Windows: `%appdata%/VERGE`
Linux: `~/.VERGE`

```conf
rpcuser=mylocaluser # your connection password
rpcpassword=mypasswordwhichIwillChange # your connection password
rpcallowip=127.0.0.1 #limit access to localhost only!
rpcport=20102 #use the standard RPC port
```

2.  After saving the configuration make sure to restart your wallet (**QT Wallet**) completely! No need to use the full wallet, you can also utilize the deamon, if you don't need the graphical user interface.

3.  Install `NodeJS` by following the [NodeJS Guide](https://nodejs.org/en/), make sure to pick the **LTS** Version!

4.  After finishing the NodeJS installation, make sure that everything is installed. Execute the following commands:

```bash
➜  ~ node -v
v8.11.0
➜  ~ npm -v
5.6.0
```

> You should have similar outputs at this point. If not make sure everything is setup correctly and your `Path` is also correct.

5.  Now you can install `yarn` by using npm: `npm i -g yarn`. This will install yarn with npm globally.

6.  After installing the requirements, you can now clone the repository by executing this command in your preferred folder: `git clone https://github.com/marpme/verge-wallet.git`

7.  Afterwards you can enter the directory: `cd verge-wallet`

8.  To install further dependencies and starting the wallet afterwards, you have to enter the following command: `yarn && yarn dev`

> This will install the dependencies first and will then start the wallet as local developement server. It also comes with hot module reload.

### Have fun developing, every help is welcome!
