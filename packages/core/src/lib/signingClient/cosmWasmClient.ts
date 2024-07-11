import { CosmWasmClient, SigningCosmWasmClient, SigningCosmWasmClientOptions } from '@cosmjs/cosmwasm-stargate';
import { OfflineSigner } from '@cosmjs/proto-signing';
import { createSeiAminoTypes, createSeiRegistry } from './stargateClient.js';
import { CometClient } from '@cosmjs/tendermint-rpc';

/**
 * Returns a interface used to interact with the CosmWASM Contracts on chain.
 * `getCosmWasmClient` contains helper functions to get a `CosmWasmClient`. This should be used for querying smart contracts only. If you need to call a contracts execute msg, see the `SigningCosmWasmClient` below.
 *
 * @example Getting a Client
 * ```ts
 * import { getCosmWasmClient } from "@crownfi/sei-js-core";
 *
 * // Create a CosmWasmClient
 * const cosmWasmClient = await getCosmWasmClient(RPC_URL);
 * ```
 *
 * @example Querying a Contract
 * Build the `queryMsg` according to the contracts specific query specifications. Each contract will define its own queryable state, so check the contract documentation for the correct query message format by examining the contract source code or documentation.
 * ```tsx
 * // Create the query msg json based on contract specific query specifications
 * const queryMsg = {
 *     tokens: {
 *         owner: address,
 *     },
 * };
 *
 * // Query a smart contract state
 * const queryResponse = cosmWasmClient.queryContractSmart(CONTRACT_ADDR, queryMsg);
 * ```
 *
 * @param rpcEndpoint The url of the RPC Endpoint used to connect to the Sei chain.
 * @returns A CosmWasmClient used to interact with the Sei chain.
 * @category Clients
 */
export const getCosmWasmClient = async (rpcEndpoint: string | CometClient): Promise<CosmWasmClient> => {
	if (typeof rpcEndpoint == "string") {
		return CosmWasmClient.connect(rpcEndpoint);
	} else {
		return CosmWasmClient.create(rpcEndpoint);
	}
};

/**
 * Returns an interface used to sign transactions on the Sei chain.
 * This package contains helper functions to get a `SigningCosmWasmClient` with Sei registry and amino types from @sei-js/proto used for smart contract execute messages.
 * 
 * 
 * 
 * @example Getting a client
 * ```tsx
 * import { getSigningCosmWasmClient } from "@crownfi/sei-js-core";
 *
 *
 * // Create a CosmWasmClient
 * const signingCosmWasmClient = await getSigningCosmWasmClient(RPC_URL, offlineSigner);
 * ```
 *
 * @example Execute Example: Mint an NFT
 * ```tsx
 * import { getSigningCosmWasmClient } from "@crownfi/sei-js-core";
 * import { calculateFee } from "@cosmjs/stargate";
 *
 * // Create a CosmWasmClient
 * const signingCosmWasmClient = await getSigningCosmWasmClient(RPC_URL, offlineSigner);
 *
 * // Execute a message on a smart contract
 * const fee = calculateFee(150000, "0.1usei");
 * const msg = { mint: {} };
 *
 * const result = await signingCosmWasmClient.execute(SENDER_ADDRESS, CONTRACT_ADDRESS, msg, fee);
 * ```
 *
 * @param rpcEndpoint The url of the RPC Endpoint used to connect to the Sei chain.
 * @param signer An OfflineAminoSigner or OfflineDirectSigner from @cosmjs/amino containing info about the signer. You
 * would usually get this from {@link restoreWallet}, {@link generateWallet}, or {@link SeiWallet.getOfflineSigner}.
 * @param options A SigningCosmWasmClientOptions object from @cosmjs/cosmwasm-stargate containing options to configure the signing client.
 * @returns A client that can be used to sign CosmWasm transactions on the Sei chain.
 * @category Clients
 */
export const getSigningCosmWasmClient = async (
	rpcEndpoint: string,
	signer: OfflineSigner,
	options: SigningCosmWasmClientOptions = {}
): Promise<SigningCosmWasmClient> => {
	const registry = createSeiRegistry();
	const aminoTypes = createSeiAminoTypes();
	if (typeof rpcEndpoint == "string") {
		return SigningCosmWasmClient.connectWithSigner(rpcEndpoint, signer, {
			registry,
			aminoTypes,
			...options
		});
	} else {
		return SigningCosmWasmClient.createWithSigner(rpcEndpoint, signer, {
			registry,
			aminoTypes,
			...options
		})
	}
};
