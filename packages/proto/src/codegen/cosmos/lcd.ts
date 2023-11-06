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
        v1beta1: new (await import("./auth/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      authz: {
        v1beta1: new (await import("./authz/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      bank: {
        v1beta1: new (await import("./bank/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      distribution: {
        v1beta1: new (await import("./distribution/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      gov: {
        v1beta1: new (await import("./gov/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      staking: {
        v1beta1: new (await import("./staking/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      tx: {
        v1beta1: new (await import("./tx/v1beta1/service.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      upgrade: {
        v1beta1: new (await import("./upgrade/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      }
    }
  };
};