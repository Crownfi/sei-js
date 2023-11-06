import * as _44 from "./wasm/v1/genesis.js";
import * as _45 from "./wasm/v1/ibc.js";
import * as _46 from "./wasm/v1/proposal.js";
import * as _47 from "./wasm/v1/query.js";
import * as _48 from "./wasm/v1/tx.js";
import * as _49 from "./wasm/v1/types.js";
import * as _160 from "./wasm/v1/tx.amino.js";
import * as _161 from "./wasm/v1/tx.registry.js";
import * as _162 from "./wasm/v1/query.lcd.js";
import * as _163 from "./wasm/v1/query.rpc.Query.js";
import * as _164 from "./wasm/v1/tx.rpc.msg.js";
import * as _207 from "./lcd.js";
import * as _208 from "./rpc.query.js";
import * as _209 from "./rpc.tx.js";
export namespace cosmwasm {
  export namespace wasm {
    export const v1 = {
      ..._44,
      ..._45,
      ..._46,
      ..._47,
      ..._48,
      ..._49,
      ..._160,
      ..._161,
      ..._162,
      ..._163,
      ..._164
    };
  }
  export const ClientFactory = {
    ..._207,
    ..._208,
    ..._209
  };
}