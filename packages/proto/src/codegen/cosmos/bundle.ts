import * as _2 from "./auth/v1beta1/auth.js";
import * as _3 from "./auth/v1beta1/genesis.js";
import * as _4 from "./auth/v1beta1/query.js";
import * as _5 from "./authz/v1beta1/authz.js";
import * as _6 from "./authz/v1beta1/event.js";
import * as _7 from "./authz/v1beta1/genesis.js";
import * as _8 from "./authz/v1beta1/query.js";
import * as _9 from "./authz/v1beta1/tx.js";
import * as _10 from "./bank/v1beta1/authz.js";
import * as _11 from "./bank/v1beta1/bank.js";
import * as _12 from "./bank/v1beta1/genesis.js";
import * as _13 from "./bank/v1beta1/query.js";
import * as _14 from "./bank/v1beta1/tx.js";
import * as _15 from "./base/abci/v1beta1/abci.js";
import * as _16 from "./base/query/v1beta1/pagination.js";
import * as _17 from "./base/reflection/v2alpha1/reflection.js";
import * as _18 from "./base/v1beta1/coin.js";
import * as _19 from "./crypto/ed25519/keys.js";
import * as _20 from "./crypto/hd/v1/hd.js";
import * as _21 from "./crypto/keyring/v1/record.js";
import * as _22 from "./crypto/multisig/keys.js";
import * as _23 from "./crypto/secp256k1/keys.js";
import * as _24 from "./crypto/secp256r1/keys.js";
import * as _25 from "./distribution/v1beta1/distribution.js";
import * as _26 from "./distribution/v1beta1/genesis.js";
import * as _27 from "./distribution/v1beta1/query.js";
import * as _28 from "./distribution/v1beta1/tx.js";
import * as _29 from "./gov/v1beta1/genesis.js";
import * as _30 from "./gov/v1beta1/gov.js";
import * as _31 from "./gov/v1beta1/query.js";
import * as _32 from "./gov/v1beta1/tx.js";
import * as _33 from "./staking/v1beta1/authz.js";
import * as _34 from "./staking/v1beta1/genesis.js";
import * as _35 from "./staking/v1beta1/query.js";
import * as _36 from "./staking/v1beta1/staking.js";
import * as _37 from "./staking/v1beta1/tx.js";
import * as _38 from "./tx/signing/v1beta1/signing.js";
import * as _39 from "./tx/v1beta1/service.js";
import * as _40 from "./tx/v1beta1/tx.js";
import * as _41 from "./upgrade/v1beta1/query.js";
import * as _42 from "./upgrade/v1beta1/tx.js";
import * as _43 from "./upgrade/v1beta1/upgrade.js";
import * as _126 from "./authz/v1beta1/tx.amino.js";
import * as _127 from "./bank/v1beta1/tx.amino.js";
import * as _128 from "./distribution/v1beta1/tx.amino.js";
import * as _129 from "./gov/v1beta1/tx.amino.js";
import * as _130 from "./staking/v1beta1/tx.amino.js";
import * as _131 from "./upgrade/v1beta1/tx.amino.js";
import * as _132 from "./authz/v1beta1/tx.registry.js";
import * as _133 from "./bank/v1beta1/tx.registry.js";
import * as _134 from "./distribution/v1beta1/tx.registry.js";
import * as _135 from "./gov/v1beta1/tx.registry.js";
import * as _136 from "./staking/v1beta1/tx.registry.js";
import * as _137 from "./upgrade/v1beta1/tx.registry.js";
import * as _138 from "./auth/v1beta1/query.lcd.js";
import * as _139 from "./authz/v1beta1/query.lcd.js";
import * as _140 from "./bank/v1beta1/query.lcd.js";
import * as _141 from "./distribution/v1beta1/query.lcd.js";
import * as _142 from "./gov/v1beta1/query.lcd.js";
import * as _143 from "./staking/v1beta1/query.lcd.js";
import * as _144 from "./tx/v1beta1/service.lcd.js";
import * as _145 from "./upgrade/v1beta1/query.lcd.js";
import * as _146 from "./auth/v1beta1/query.rpc.Query.js";
import * as _147 from "./authz/v1beta1/query.rpc.Query.js";
import * as _148 from "./bank/v1beta1/query.rpc.Query.js";
import * as _149 from "./distribution/v1beta1/query.rpc.Query.js";
import * as _150 from "./gov/v1beta1/query.rpc.Query.js";
import * as _151 from "./staking/v1beta1/query.rpc.Query.js";
import * as _152 from "./tx/v1beta1/service.rpc.Service.js";
import * as _153 from "./upgrade/v1beta1/query.rpc.Query.js";
import * as _154 from "./authz/v1beta1/tx.rpc.msg.js";
import * as _155 from "./bank/v1beta1/tx.rpc.msg.js";
import * as _156 from "./distribution/v1beta1/tx.rpc.msg.js";
import * as _157 from "./gov/v1beta1/tx.rpc.msg.js";
import * as _158 from "./staking/v1beta1/tx.rpc.msg.js";
import * as _159 from "./upgrade/v1beta1/tx.rpc.msg.js";
import * as _204 from "./lcd.js";
import * as _205 from "./rpc.query.js";
import * as _206 from "./rpc.tx.js";
export namespace cosmos {
  export namespace auth {
    export const v1beta1 = {
      ..._2,
      ..._3,
      ..._4,
      ..._138,
      ..._146
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._5,
      ..._6,
      ..._7,
      ..._8,
      ..._9,
      ..._126,
      ..._132,
      ..._139,
      ..._147,
      ..._154
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._10,
      ..._11,
      ..._12,
      ..._13,
      ..._14,
      ..._127,
      ..._133,
      ..._140,
      ..._148,
      ..._155
    };
  }
  export namespace base {
    export namespace abci {
      export const v1beta1 = {
        ..._15
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._16
      };
    }
    export namespace reflection {
      export const v2alpha1 = {
        ..._17
      };
    }
    export const v1beta1 = {
      ..._18
    };
  }
  export namespace crypto {
    export const ed25519 = {
      ..._19
    };
    export namespace hd {
      export const v1 = {
        ..._20
      };
    }
    export namespace keyring {
      export const v1 = {
        ..._21
      };
    }
    export const multisig = {
      ..._22
    };
    export const secp256k1 = {
      ..._23
    };
    export const secp256r1 = {
      ..._24
    };
  }
  export namespace distribution {
    export const v1beta1 = {
      ..._25,
      ..._26,
      ..._27,
      ..._28,
      ..._128,
      ..._134,
      ..._141,
      ..._149,
      ..._156
    };
  }
  export namespace gov {
    export const v1beta1 = {
      ..._29,
      ..._30,
      ..._31,
      ..._32,
      ..._129,
      ..._135,
      ..._142,
      ..._150,
      ..._157
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._33,
      ..._34,
      ..._35,
      ..._36,
      ..._37,
      ..._130,
      ..._136,
      ..._143,
      ..._151,
      ..._158
    };
  }
  export namespace tx {
    export namespace signing {
      export const v1beta1 = {
        ..._38
      };
    }
    export const v1beta1 = {
      ..._39,
      ..._40,
      ..._144,
      ..._152
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._41,
      ..._42,
      ..._43,
      ..._131,
      ..._137,
      ..._145,
      ..._153,
      ..._159
    };
  }
  export const ClientFactory = {
    ..._204,
    ..._205,
    ..._206
  };
}