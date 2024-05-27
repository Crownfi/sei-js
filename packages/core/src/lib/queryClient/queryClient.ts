import { createSeiLCDClient, createDexRpcQueryExtension, createEpochRpcQueryExtension, createEvmRpcQueryExtension, createMintRpcQueryExtension, createOracleRpcQueryExtension, createTokenFactoryRpcQueryExtension, createTxsRpcQueryExtension } from '@crownfi/sei-js-proto';
import { AuthExtension, BankExtension, QueryClient as StargateQueryClient, TxExtension, setupAuthExtension, setupBankExtension, setupTxExtension } from "@cosmjs/stargate";
import { CometClient, connectComet } from '@cosmjs/tendermint-rpc';
import { WasmExtension, setupWasmExtension } from '@cosmjs/cosmwasm-stargate';

/**
 * @deprecated Use `getRestQueryClient` or `getRpcQueryClient` instead.
 */
export const getQueryClient = getRestQueryClient;

/**
 * Gets a client used to interact with the Sei chain.
 *
 * @example
 * ```tsx
 * import { getQueryClient } from '@sei-js/cosmjs';
 *
 * const queryClient = await getQueryClient(REST_URL);
 *
 * // Getting the market summary from the Sei dex module
 * const dexMarketSummary = await queryClient.seiprotocol.seichain.dex.getMarketSummary(params);
 *
 * // Query the bank balance of a given address
 * const balances = await queryClient.cosmos.bank.v1beta1.allBalances({ address });
 *
 * // Query a specific transaction hash
 * const txInfo = await queryClient.cosmos.tx.v1beta1.getTx({ hash });
 * ```
 *
 * @param restEndpoint The endpoint of the REST node used to interact to the Sei chain.
 * @returns An LCD client object that can be used to query the Sei chain.
 * @category Clients
 */
export async function getRestQueryClient(restEndpoint: string) {
	return await createSeiLCDClient({ restEndpoint });
}

// Dex
export type SeiDexExtension = {
	dex: ReturnType<typeof createDexRpcQueryExtension>
}
export function setupSeiDexExtension(client: StargateQueryClient): SeiDexExtension {
	return {
		dex: createDexRpcQueryExtension(client)
	}
}
// Epoch
export type SeiEpochExtension = {
	epoch: ReturnType<typeof createEpochRpcQueryExtension>
}
export function setupSeiEpochExtension(client: StargateQueryClient): SeiEpochExtension {
	return {
		epoch: createEpochRpcQueryExtension(client)
	}
}
// Evm
export type SeiEvmExtension = {
	evm: ReturnType<typeof createEvmRpcQueryExtension>
}
export function setupSeiEvmExtension(client: StargateQueryClient): SeiEvmExtension {
	return {
		evm: createEvmRpcQueryExtension(client)
	}
}
// Mint
export type SeiMintExtension = {
	mint: ReturnType<typeof createMintRpcQueryExtension>
}
export function setupSeiMintExtension(client: StargateQueryClient): SeiMintExtension {
	return {
		mint: createMintRpcQueryExtension(client)
	}
}
// Oracle
export type SeiOracleExtension = {
	oracle: ReturnType<typeof createOracleRpcQueryExtension>
}
export function setupSeiOracleExtension(client: StargateQueryClient): SeiOracleExtension {
	return {
		oracle: createOracleRpcQueryExtension(client)
	}
}
// TokenFactory
export type SeiTokenFactoryExtension = {
	tokenfactory: ReturnType<typeof createTokenFactoryRpcQueryExtension>
}
export function setupSeiTokenFactoryExtension(client: StargateQueryClient): SeiTokenFactoryExtension {
	return {
		tokenfactory: createTokenFactoryRpcQueryExtension(client)
	}
}

// This is a hack. For some reason @cosmjs/stargate's setupTxExtension function only implements a limited subset of
// queries. Most importantly, it excludes search-transaction-by-event query.
// Importing the full type this way leads to (even more) duplicate code, but this works for now. Ideally we'd re-use
// the definitions from "@cosmjs/types" somehow, but I've spent too much time on trying to make a sane Sei client, and
// this is the quickest way I can get this working for now.
export type TxsExtension = {
	txs: ReturnType<typeof createTxsRpcQueryExtension>
}
export function setupTxsExtension(client: StargateQueryClient): TxsExtension {
	return {
		txs: createTxsRpcQueryExtension(client)
	}
}

export type SeiQueryClient =
	StargateQueryClient &
	WasmExtension &
	AuthExtension &
	BankExtension &
	TxExtension &
	SeiDexExtension &
	SeiEpochExtension &
	SeiEvmExtension &
	SeiMintExtension &
	SeiOracleExtension &
	SeiTokenFactoryExtension &
	TxsExtension;

export async function getRpcQueryClient(rpcEndpoint: string | CometClient): Promise<SeiQueryClient> {
	if (typeof rpcEndpoint === "string") {
		rpcEndpoint = await connectComet(rpcEndpoint);
	}
	return StargateQueryClient.withExtensions(
		rpcEndpoint,
		setupWasmExtension,
		setupAuthExtension,
		setupBankExtension,
		setupTxExtension,
		setupSeiDexExtension,
		setupSeiEpochExtension,
		setupSeiEvmExtension,
		setupSeiMintExtension,
		setupSeiOracleExtension,
		setupSeiTokenFactoryExtension,
		setupTxsExtension
	);
}
