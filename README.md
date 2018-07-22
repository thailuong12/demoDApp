# Simple Demo of Ethereum decentralized application

This is a contract example code for a real estate dApp. It may contain a lot of bugs so please don't use it in real life.

## Setup

Install Truffle framework:

```bash
npm install -g truffle 
```

For Test Net, you can use Ganache, you can download it at: https://truffleframework.com/ganache

## Compile the Contract

Clone the code from this repository and change the directory to the contracts folder, then run:

```bash
truffle compile
```

The contracts will be compiled and the ABIs will be imported into a new  build/contracts folder

## Migrate the Contract

Remember to start the Test Net first.

You can also configure the setting for contract migration in the truffle.js file:

```json
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    }
  }
};
```