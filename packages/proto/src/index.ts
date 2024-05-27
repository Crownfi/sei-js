// Here for backwards compat, but you really shouldn't use anything exported here unless you want to inflate your bundle size.
export * from './codegen/index.js';
/**
 * Creates a SeiRPCMsgClient, but exported in a way where tree-shaking can actually happen.
 * (Not neccisarily the inner-modules, but you won't get all the LCD stuff bloating your bundle if you're not using this)
 */
export const createSeiRPCMsgClient = (await import("./codegen/seiprotocol/rpc.tx.js")).createRPCMsgClient;
/**
 * Creates a SeiRPCQueryClient, but exported in a way where tree-shaking can actually happen.
 * (Not neccisarily the inner-modules, but you won't get all the LCD stuff bloating your bundle if you're not using this)
 */
export const createSeiRPCQueryClient = (await import("./codegen/seiprotocol/rpc.query.js")).createRPCQueryClient;
/**
 * Creates a SeiLCDClient, but exported in a way where tree-shaking can actually happen.
 * (Not neccisarily the inner-modules, but you won't get all the RPC stuff bloating your bundle if you're not using this)
 */
export const createSeiLCDClient = (await import("./codegen/seiprotocol/lcd.js")).createLCDClient;

// Export these directly, as this is what allows us to effectively make our own "stargate client" later on.
export const createDexRpcQueryExtension = (await import("./codegen/dex/query.rpc.Query.js")).createRpcQueryExtension;
export const createEpochRpcQueryExtension = (await import("./codegen/epoch/query.rpc.Query.js")).createRpcQueryExtension;
export const createEvmRpcQueryExtension = (await import("./codegen/evm/query.rpc.Query.js")).createRpcQueryExtension;
export const createMintRpcQueryExtension = (await import("./codegen/mint/v1beta1/query.rpc.Query.js")).createRpcQueryExtension;
export const createOracleRpcQueryExtension = (await import("./codegen/oracle/query.rpc.Query.js")).createRpcQueryExtension;
export const createTokenFactoryRpcQueryExtension = (await import("./codegen/tokenfactory/query.rpc.Query.js")).createRpcQueryExtension;
export const createTxsRpcQueryExtension = (await import("./codegen/cosmos/tx/v1beta1/service.rpc.Service.js")).createRpcQueryExtension;
