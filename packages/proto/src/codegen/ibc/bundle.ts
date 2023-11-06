import * as _56 from "./applications/transfer/v1/genesis.js";
import * as _57 from "./applications/transfer/v1/query.js";
import * as _58 from "./applications/transfer/v1/transfer.js";
import * as _59 from "./applications/transfer/v1/tx.js";
import * as _60 from "./applications/transfer/v2/packet.js";
import * as _61 from "./core/channel/v1/channel.js";
import * as _62 from "./core/channel/v1/genesis.js";
import * as _63 from "./core/channel/v1/query.js";
import * as _64 from "./core/channel/v1/tx.js";
import * as _65 from "./core/client/v1/client.js";
import * as _66 from "./core/client/v1/genesis.js";
import * as _67 from "./core/client/v1/query.js";
import * as _68 from "./core/client/v1/tx.js";
import * as _69 from "./core/commitment/v1/commitment.js";
import * as _70 from "./core/connection/v1/connection.js";
import * as _71 from "./core/connection/v1/genesis.js";
import * as _72 from "./core/connection/v1/query.js";
import * as _73 from "./core/connection/v1/tx.js";
import * as _74 from "./lightclients/localhost/v1/localhost.js";
import * as _75 from "./lightclients/solomachine/v1/solomachine.js";
import * as _76 from "./lightclients/solomachine/v2/solomachine.js";
import * as _77 from "./lightclients/tendermint/v1/tendermint.js";
import * as _165 from "./applications/transfer/v1/tx.amino.js";
import * as _166 from "./core/channel/v1/tx.amino.js";
import * as _167 from "./core/client/v1/tx.amino.js";
import * as _168 from "./core/connection/v1/tx.amino.js";
import * as _169 from "./applications/transfer/v1/tx.registry.js";
import * as _170 from "./core/channel/v1/tx.registry.js";
import * as _171 from "./core/client/v1/tx.registry.js";
import * as _172 from "./core/connection/v1/tx.registry.js";
import * as _173 from "./applications/transfer/v1/query.lcd.js";
import * as _174 from "./core/channel/v1/query.lcd.js";
import * as _175 from "./core/client/v1/query.lcd.js";
import * as _176 from "./core/connection/v1/query.lcd.js";
import * as _177 from "./applications/transfer/v1/query.rpc.Query.js";
import * as _178 from "./core/channel/v1/query.rpc.Query.js";
import * as _179 from "./core/client/v1/query.rpc.Query.js";
import * as _180 from "./core/connection/v1/query.rpc.Query.js";
import * as _181 from "./applications/transfer/v1/tx.rpc.msg.js";
import * as _182 from "./core/channel/v1/tx.rpc.msg.js";
import * as _183 from "./core/client/v1/tx.rpc.msg.js";
import * as _184 from "./core/connection/v1/tx.rpc.msg.js";
import * as _210 from "./lcd.js";
import * as _211 from "./rpc.query.js";
import * as _212 from "./rpc.tx.js";
export namespace ibc {
  export namespace applications {
    export namespace transfer {
      export const v1 = {
        ..._56,
        ..._57,
        ..._58,
        ..._59,
        ..._165,
        ..._169,
        ..._173,
        ..._177,
        ..._181
      };
      export const v2 = {
        ..._60
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._61,
        ..._62,
        ..._63,
        ..._64,
        ..._166,
        ..._170,
        ..._174,
        ..._178,
        ..._182
      };
    }
    export namespace client {
      export const v1 = {
        ..._65,
        ..._66,
        ..._67,
        ..._68,
        ..._167,
        ..._171,
        ..._175,
        ..._179,
        ..._183
      };
    }
    export namespace commitment {
      export const v1 = {
        ..._69
      };
    }
    export namespace connection {
      export const v1 = {
        ..._70,
        ..._71,
        ..._72,
        ..._73,
        ..._168,
        ..._172,
        ..._176,
        ..._180,
        ..._184
      };
    }
  }
  export namespace lightclients {
    export namespace localhost {
      export const v1 = {
        ..._74
      };
    }
    export namespace solomachine {
      export const v1 = {
        ..._75
      };
      export const v2 = {
        ..._76
      };
    }
    export namespace tendermint {
      export const v1 = {
        ..._77
      };
    }
  }
  export const ClientFactory = {
    ..._210,
    ..._211,
    ..._212
  };
}