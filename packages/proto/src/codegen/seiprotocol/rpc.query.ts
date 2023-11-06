import { Tendermint34Client, HttpEndpoint } from "@cosmjs/tendermint-rpc";
import { QueryClient } from "@cosmjs/stargate";
export const createRPCQueryClient = async ({
  rpcEndpoint
}: {
  rpcEndpoint: string | HttpEndpoint;
}) => {
  const tmClient = await Tendermint34Client.connect(rpcEndpoint);
  const client = new QueryClient(tmClient);
  return {
    cosmos: {
      auth: {
        v1beta1: (await import("../cosmos/auth/v1beta1/query.rpc.Query.js")).createRpcQueryExtension(client)
      },
      authz: {
        v1beta1: (await import("../cosmos/authz/v1beta1/query.rpc.Query.js")).createRpcQueryExtension(client)
      },
      bank: {
        v1beta1: (await import("../cosmos/bank/v1beta1/query.rpc.Query.js")).createRpcQueryExtension(client)
      },
      distribution: {
        v1beta1: (await import("../cosmos/distribution/v1beta1/query.rpc.Query.js")).createRpcQueryExtension(client)
      },
      gov: {
        v1beta1: (await import("../cosmos/gov/v1beta1/query.rpc.Query.js")).createRpcQueryExtension(client)
      },
      staking: {
        v1beta1: (await import("../cosmos/staking/v1beta1/query.rpc.Query.js")).createRpcQueryExtension(client)
      },
      tx: {
        v1beta1: (await import("../cosmos/tx/v1beta1/service.rpc.Service.js")).createRpcQueryExtension(client)
      },
      upgrade: {
        v1beta1: (await import("../cosmos/upgrade/v1beta1/query.rpc.Query.js")).createRpcQueryExtension(client)
      }
    },
    seiprotocol: {
      seichain: {
        dex: (await import("./seichain/dex/query.rpc.Query.js")).createRpcQueryExtension(client),
        epoch: (await import("./seichain/epoch/query.rpc.Query.js")).createRpcQueryExtension(client),
        mint: (await import("./seichain/mint/v1beta1/query.rpc.Query.js")).createRpcQueryExtension(client),
        oracle: (await import("./seichain/oracle/query.rpc.Query.js")).createRpcQueryExtension(client),
        tokenfactory: (await import("./seichain/tokenfactory/query.rpc.Query.js")).createRpcQueryExtension(client)
      }
    }
  };
};