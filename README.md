# SeiJS

SeiJS is a monorepo that contains multiple NPM libraries for writing applications that interact with the Sei network.

## Documentation

Please check [our documentation](https://docs.seinetwork.io/front-end-development/javascript-tutorial) for notes on how to get up and running. The tutorial has examples on how to connect to a Sei wallet, query an RPC endpoint, transfer tokens, IBC transfer, and interact with contracts.

### Examples

- [sei-protocol/js-examples](https://github.com/sei-protocol/js-examples) - An example repo demonstrating how to use various typescript functions from SeiJS

## Packages

SeiJS consists of smaller NPM packages within the @sei-js namespace. For more detailed documentation on each package, please refer to the table below.

| Package                         | Description                                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [@sei-js/core](packages/core)   | TypeScript library containing helper functions for wallet connection, transaction signing, and RPC querying. |
| [@sei-js/react](packages/react) | ReactJS specific library with helpful hooks for wallet connections, transaction signing, and RPC querying.   |
| [@sei-js/proto](packages/proto) | TypeScript library for Sei protobufs generated using [Telescope](https://github.com/osmosis-labs/telescope)  |
