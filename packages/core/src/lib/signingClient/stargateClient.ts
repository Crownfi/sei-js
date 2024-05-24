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

/**
 * Creates a Registry object that maps CosmWasm and Sei protobuf type identifiers to their actual implementations.
 *
 * @example
 * ```tsx
 * import { Registry } from "@cosmjs/proto-signing";
 * import { defaultRegistryTypes } from "@cosmjs/stargate";
 * import { getSigningStargateClient } from '@sei-js/cosmjs';
 * import { seiprotocol, seiprotocolProtoRegistry } from "@sei-js/proto";
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
 * import { getSigningStargateClient } from '@sei-js/cosmjs';
 * import { seiprotocol, seiprotocolProtoRegistry } from "@sei-js/proto";
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

export const getStargateClient = async (rpcEndpoint: string, options: StargateClientOptions = {}): Promise<StargateClient> => {
	return StargateClient.connect(rpcEndpoint, options);
};

export const getSigningClient = async (rpcEndpoint: string, signer: OfflineSigner, options: SigningStargateClientOptions = {}): Promise<SigningStargateClient> => {
	const registry = createSeiRegistry();
	const aminoTypes = createSeiAminoTypes();
	return SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
		registry,
		aminoTypes,
		...options
	});
};
