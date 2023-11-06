//@ts-nocheck
import { MsgCreateDenom, MsgMint, MsgBurn, MsgChangeAdmin } from "./tx.js";
export const AminoConverter = {
  "/seiprotocol.seichain.tokenfactory.MsgCreateDenom": {
    aminoType: "/seiprotocol.seichain.tokenfactory.MsgCreateDenom",
    toAmino: MsgCreateDenom.toAmino,
    fromAmino: MsgCreateDenom.fromAmino
  },
  "/seiprotocol.seichain.tokenfactory.MsgMint": {
    aminoType: "/seiprotocol.seichain.tokenfactory.MsgMint",
    toAmino: MsgMint.toAmino,
    fromAmino: MsgMint.fromAmino
  },
  "/seiprotocol.seichain.tokenfactory.MsgBurn": {
    aminoType: "/seiprotocol.seichain.tokenfactory.MsgBurn",
    toAmino: MsgBurn.toAmino,
    fromAmino: MsgBurn.fromAmino
  },
  "/seiprotocol.seichain.tokenfactory.MsgChangeAdmin": {
    aminoType: "/seiprotocol.seichain.tokenfactory.MsgChangeAdmin",
    toAmino: MsgChangeAdmin.toAmino,
    fromAmino: MsgChangeAdmin.fromAmino
  }
};