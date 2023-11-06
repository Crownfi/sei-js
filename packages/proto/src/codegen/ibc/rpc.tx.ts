import { Rpc } from "../helpers.js";
export const createRPCMsgClient = async ({
  rpc
}: {
  rpc: Rpc;
}) => ({
  cosmos: {
    authz: {
      v1beta1: new (await import("../cosmos/authz/v1beta1/tx.rpc.msg.js")).MsgClientImpl(rpc)
    },
    bank: {
      v1beta1: new (await import("../cosmos/bank/v1beta1/tx.rpc.msg.js")).MsgClientImpl(rpc)
    },
    distribution: {
      v1beta1: new (await import("../cosmos/distribution/v1beta1/tx.rpc.msg.js")).MsgClientImpl(rpc)
    },
    gov: {
      v1beta1: new (await import("../cosmos/gov/v1beta1/tx.rpc.msg.js")).MsgClientImpl(rpc)
    },
    staking: {
      v1beta1: new (await import("../cosmos/staking/v1beta1/tx.rpc.msg.js")).MsgClientImpl(rpc)
    },
    upgrade: {
      v1beta1: new (await import("../cosmos/upgrade/v1beta1/tx.rpc.msg.js")).MsgClientImpl(rpc)
    }
  },
  ibc: {
    applications: {
      transfer: {
        v1: new (await import("./applications/transfer/v1/tx.rpc.msg.js")).MsgClientImpl(rpc)
      }
    },
    core: {
      channel: {
        v1: new (await import("./core/channel/v1/tx.rpc.msg.js")).MsgClientImpl(rpc)
      },
      client: {
        v1: new (await import("./core/client/v1/tx.rpc.msg.js")).MsgClientImpl(rpc)
      },
      connection: {
        v1: new (await import("./core/connection/v1/tx.rpc.msg.js")).MsgClientImpl(rpc)
      }
    }
  }
});