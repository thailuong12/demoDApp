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

Compiling .\contracts\Migrations.sol...
Compiling .\contracts\RealEstate.sol...
Writing artifacts to .\build\contracts
```

The contracts will be compiled and the ABIs will be imported into a new  build/contracts folder

## Migrate the Contract

Remember to start the Test Net first by launching Ganache or using other Test Net.

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

Run the following command to migrate the contract into the network:
```bash
truffle migrate

Using network 'development'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x2864201247ee0247914e66ab2f9449242b0e66c021ce34391ec7d73bc725a21e
  Migrations: 0x8cdaf0cd259887258bc13a92c0a6da92698644c0
Saving successful migration to network...
  ... 0xd7bc86d31bee32fa3988f1c1eabce403a1b5d570340a3a9cdba53a472ee8c956
Saving artifacts...
Running migration: 2_initial_realestate.js
  Deploying RealEstate...
  ... 0xd2a7ea19fdd5931f67f032962c926c990a815831d23a7cc80d956189fefe62f5
  RealEstate: 0x345ca3e014aaf5dca488057592ee47305d9b3e10
Saving successful migration to network...
  ... 0xf36163615f41ef7ed8f4a8f192149a0bf633fe1a2398ce001bf44c43dc7bdda0
Saving artifacts...
```

## Testing

All test cases are saved in test folder. Run:

```bash
truffle test

Using network 'development'.



  Contract: RealEstate
{ tx: '0x44bd4cf5bec31482f147971e1f13f4fb4aa4643d3f1d3d5fc86c277491ff3830',
  receipt:
   { transactionHash: '0x44bd4cf5bec31482f147971e1f13f4fb4aa4643d3f1d3d5fc86c277491ff3830',
     transactionIndex: 0,
     blockHash: '0xc7d4b962ece27d9bfde47dc70cc9a3d1b70fecbbb0f01843dc66663c8af58baf',
     blockNumber: 13,
     gasUsed: 43183,
     cumulativeGasUsed: 43183,
     contractAddress: null,
     logs: [],
     status: 1 },
  logs: [] }
    √ Test buy function (129ms)


  1 passing (149ms)
```

## Start the dApp

Change directory to the src folder.

Run:

```bash
npm install
```

Start the application by running:

```bash
npm run dev
```