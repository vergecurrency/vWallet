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

* Language: Typescript + Javascript
* Frameworks: Electron, React, NodeJS
* communication standard: RPC / JSON HTTP Calls (internally handled)
  * For RPC:
     * port: 20102
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

## Manual Wallet Setup (development)

### Using Mockup Data
1. Rename the `dev-config.json.example` file inside the `/src` folder to `dev-config.json`

```bash
~/work/vWallet/src » mv dev-config.json.example dev-config.json && vim dev-config.json
```

### Using VERGEd (real wallet)
1.  Clone and build VERGE on your own by following the following guide: [VERGE Building Guide](https://github.com/vergecurrency/VERGE/blob/master/README.md)

2.  On finish building the VERGEd, you should be able to run the wallet by entering the following command inside the root of the cloned verge repository: `./src/VERGEd -rpcuser=kyon -rpcpassword=lolcat -printtoconsole -deamon`, this will start the verge deamon with the given userdata, which you now have to change inside the `dev-config.json.example`.

So ultimately:

```bash
~/work/VERGE » ./src/VERGEd -rpcuser=myusername -rpcpassword=mypassword -printtoconsole -deamon
~/work/vWallet/src » mv dev-config.json.example dev-config.json && vim dev-config.json
```

3. Edit the `dev-config.json` file and set the `clientDriver` value to `deamon`:

```json
{
  "rpcusername": "myusername",
  "rpcpassword": "mypassword",

  "clientDriver": "mock",
  
  ...
}
```

### Install The Wallet GUI

3.  Install `NodeJS` by following the [NodeJS Guide](https://nodejs.org/en/), make sure to pick the **LTS** Version!

> alternatively you can also try to use NVM, if you needed multiple versions of node on your development machine.

4.  After finishing the NodeJS installation, make sure that everything is installed. Execute the following commands:

```bash
➜  ~ node -v
v8.11.0
➜  ~ npm -v
5.6.0
```

> You should have similar outputs at this point. If not make sure everything is setup correctly and your `path` is also correct.
> the easiest way on mac is using [NVM (Node version manager)](https://github.com/creationix/nvm#installation)

5.  Afterwards you can install `yarn` by using npm: `npm i -g yarn`. This will install yarn globally by using npm.

6.  After installing the requirements, you can now clone the repository by executing this command in your preferred folder work folder: `git clone https://github.com/vergecurrency/vWallet.git`

7.  Afterwards you enter the directory: `cd vWallet`

8.  To install further dependencies and starting the wallet afterwards, you have to enter the following command: `yarn && yarn dev`

> This will install the dependencies first and will then start the wallet as local developement server. It also comes with hot module reload.
