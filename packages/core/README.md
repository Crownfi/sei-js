# @sei-js/core

A library for Sei written in Typescript.

## Installation

```shell
npm install @crownfi/sei-js-core
```

## Getting Started

### Basic queries

```ts
import { getRpcQueryClient } from '@crownfi/sei-js-core';

const queryClient = await getRpcQueryClient(RPC_URL);
const seiBalance = await queryClient.bank.balance(USER_SEI_ADDRESS, "usei");
const userEvmAddress = (await queryclient.evm.eVMAddressBySeiAddress({seiAddress: USER_SEI_ADDRESS})).evmAddress;

```

### Connecting to a wallet

In order to interact with a Sei node, you'll need a wallet to sign transactions. The wallet extensions that are currently supported can be found using the `SeiWallet` class.

```ts
import { SeiWallet } from '@crownfi/sei-js-core';

const discoveredWallets = SeiWallet.discoveredWalletList();
const seiWallet = new SeiWallet(discoveredWallets[0]); // Just pick the first one
```

### Fully interacting with the chain

```ts
import { connectComet } from '@cosmjs/tendermint-rpc';
import { getRpcQueryClient, SeiWallet } from '@crownfi/sei-js-core';

const discoveredWallets = SeiWallet.discoveredWalletList();
const seiWallet = new SeiWallet(discoveredWallets[0]); // Just pick the first one

const baseClient = await connectComet(RPC_URL);
const seiQueryClient = await getRpcQueryClient(baseClient);
const signingClient = await getSigningClient(baseClient, await seiWallet.getOfflineSigner());

// Do stuff!
```

We also have [@crownfi/sei-utils](https://developer.crownfi.io/npm/@crownfi/sei-utils/) which makes things slightly easier to use
