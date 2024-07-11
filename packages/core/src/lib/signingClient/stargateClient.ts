import { AminoTypes, SigningStargateClient, SigningStargateClientOptions, StargateClient, StargateClientOptions, defaultRegistryTypes } from '@cosmjs/stargate';
import { OfflineSigner, Registry } from '@cosmjs/proto-signing';
import {
	cosmosAminoConverters,
	cosmwasmAminoConverters,
	cosmwasmProtoRegistry,
	ibcAminoConverters,
	seiprotocolProtoRegistry,
	seiprotocolAminoConverters
} from '@crownfi/sei-js-proto';
import { CometClient } from '@cosmjs/tendermint-rpc';

/**
 * Creates a Registry object that maps CosmWasm and Sei protobuf type identifiers to their actual implementations.
 *
 * @example
 * ```tsx
 * import { Registry } from "@cosmjs/proto-signing";
 * import { defaultRegistryTypes } from "@cosmjs/stargate";
 * import { getSigningStargateClient } from '@crownfi/sei-js-core';
 * import { seiprotocol, seiprotocolProtoRegistry } from "@crownfi/sei-js-proto";
 *
 * ...
 *
 * // Set up Sei proto registry
 * const registry = new Registry([
 *   ...defaultRegistryTypes,
 *   ...seiprotocolProtoRegistry,
 * ]);
 *
 * // Create a client with registry
 * const signingClient = await getSigningStargateClient(RPC_URL, offlineSigner, { registry });
 * ```
 *
 * @returns A Registry object that maps CosmWasm and Sei protobuf type identifiers to their actual implementations.
 * @category Config
 */
export const createSeiRegistry = (): Registry => {
	return new Registry([...defaultRegistryTypes, ...cosmwasmProtoRegistry, ...seiprotocolProtoRegistry]);
};

/**
 * Creates a mapping of stargate message types to Sei Amino types.
 *
 * @example
 * ```tsx
 * import { Registry } from "@cosmjs/proto-signing";
 * import { defaultRegistryTypes } from "@cosmjs/stargate";
 * import { getSigningStargateClient } from '@crownfi/sei-js-core';
 * import { seiprotocol, seiprotocolProtoRegistry } from "@crownfi/sei-js-proto";
 *
 * ...
 *
 * // Set up Sei proto registry
 * const registry = new Registry([
 *   ...defaultRegistryTypes,
 *   ...seiprotocolProtoRegistry,
 * ]);
 *
 * // Create a client with registry
 * const signingClient = await getSigningStargateClient(RPC_URL, offlineSigner, { registry });
 * ```
 *
 * @returns A mapping of stargate message types to Sei Amino types.
 * @category Config
 */
export const createSeiAminoTypes = (): AminoTypes => {
	const types = {
		...cosmosAminoConverters,
		...cosmwasmAminoConverters,
		...ibcAminoConverters,
		...seiprotocolAminoConverters
	};
	return new AminoTypes(types);
};

/**
 * Returns a basic Sei client with no extensions
 * @param rpcEndpoint The url of the RPC Endpoint used to connect to the Sei chain.
 * @param options A StargateClient object from @cosmjs/stargate containing options to configure the signing client.
 * @returns 
 */
export function getStargateClient(
	rpcEndpoint: string | CometClient,
	options?: StargateClientOptions
): Promise<StargateClient> {
	if (typeof rpcEndpoint == "string") {
		return StargateClient.connect(rpcEndpoint, options);
	} else {
		return StargateClient.create(rpcEndpoint, options);
	}
};

import {restoreWallet, generateWallet, SeiWallet} from "../wallet/index.js";
/**
 * Returns a basic Sei client with no extensions
 * @param rpcEndpoint The url of the RPC Endpoint used to connect to the Sei chain.
 * @param signer An OfflineAminoSigner or OfflineDirectSigner from @cosmjs/amino containing info about the signer. You
 * would usually get this from {@link restoreWallet}, {@link generateWallet}, or {@link SeiWallet.getOfflineSigner}.
 * @param options A StargateClient object from @cosmjs/stargate containing options to configure the signing client.
 * @returns 
 */
export function getSigningClient(
	rpcEndpoint: string | CometClient,
	signer: OfflineSigner,
	options: SigningStargateClientOptions = {}
): Promise<SigningStargateClient> {
	const registry = createSeiRegistry();
	const aminoTypes = createSeiAminoTypes();
	if (typeof rpcEndpoint == "string") {
		return SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
			registry,
			aminoTypes,
			...options
		});
	} else {
		return SigningStargateClient.createWithSigner(rpcEndpoint, signer, {
			registry,
			aminoTypes,
			...options
		})
	}
};
