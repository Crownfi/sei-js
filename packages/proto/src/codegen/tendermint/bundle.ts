import * as _115 from "./abci/types.js";
import * as _116 from "./crypto/keys.js";
import * as _117 from "./crypto/proof.js";
import * as _118 from "./libs/bits/types.js";
import * as _119 from "./p2p/types.js";
import * as _120 from "./types/block.js";
import * as _121 from "./types/evidence.js";
import * as _122 from "./types/params.js";
import * as _123 from "./types/types.js";
import * as _124 from "./types/validator.js";
import * as _125 from "./version/types.js";
export namespace tendermint {
  export const abci = {
    ..._115
  };
  export const crypto = {
    ..._116,
    ..._117
  };
  export namespace libs {
    export const bits = {
      ..._118
    };
  }
  export const p2p = {
    ..._119
  };
  export const types = {
    ..._120,
    ..._121,
    ..._122,
    ..._123,
    ..._124
  };
  export const version = {
    ..._125
  };
}