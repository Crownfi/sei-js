import { LCDClient } from "@cosmology/lcd";
export const createLCDClient = async ({
  restEndpoint
}: {
  restEndpoint: string;
}) => {
  const requestClient = new LCDClient({
    restEndpoint
  });
  return {
    cosmos: {
      auth: {
        v1beta1: new (await import("../cosmos/auth/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      authz: {
        v1beta1: new (await import("../cosmos/authz/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      bank: {
        v1beta1: new (await import("../cosmos/bank/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      distribution: {
        v1beta1: new (await import("../cosmos/distribution/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      gov: {
        v1beta1: new (await import("../cosmos/gov/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      staking: {
        v1beta1: new (await import("../cosmos/staking/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      tx: {
        v1beta1: new (await import("../cosmos/tx/v1beta1/service.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      upgrade: {
        v1beta1: new (await import("../cosmos/upgrade/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      }
    },
    ibc: {
      applications: {
        transfer: {
          v1: new (await import("./applications/transfer/v1/query.lcd.js")).LCDQueryClient({
            requestClient
          })
        }
      },
      core: {
        channel: {
          v1: new (await import("./core/channel/v1/query.lcd.js")).LCDQueryClient({
            requestClient
          })
        },
        client: {
          v1: new (await import("./core/client/v1/query.lcd.js")).LCDQueryClient({
            requestClient
          })
        },
        connection: {
          v1: new (await import("./core/connection/v1/query.lcd.js")).LCDQueryClient({
            requestClient
          })
        }
      }
    }
  };
};