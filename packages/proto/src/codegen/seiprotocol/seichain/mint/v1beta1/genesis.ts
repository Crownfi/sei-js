import { Minter, MinterAmino, MinterSDKType, Params, ParamsAmino, ParamsSDKType } from "./mint.js";
import { BinaryReader, BinaryWriter } from "../../../../binary.js";
import { DeepPartial } from "../../../../helpers.js";
/** GenesisState defines the mint module's genesis state. */
export interface GenesisState {
  /** minter is a space for holding current inflation information. */
  minter: Minter;
  /** params defines all the paramaters of the module. */
  params: Params;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/seiprotocol.seichain.mint.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the mint module's genesis state. */
export interface GenesisStateAmino {
  /** minter is a space for holding current inflation information. */
  minter?: MinterAmino;
  /** params defines all the paramaters of the module. */
  params?: ParamsAmino;
}
export interface GenesisStateAminoMsg {
  type: "/seiprotocol.seichain.mint.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the mint module's genesis state. */
export interface GenesisStateSDKType {
  minter: MinterSDKType;
  params: ParamsSDKType;
}
function createBaseGenesisState(): GenesisState {
  return {
    minter: Minter.fromPartial({}),
    params: Params.fromPartial({})
  };
}
export const GenesisState = {
  typeUrl: "/seiprotocol.seichain.mint.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.minter !== undefined) {
      Minter.encode(message.minter, writer.uint32(10).fork()).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.minter = Minter.decode(reader, reader.uint32());
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.minter = Minter.fromPartial(object.minter ?? {});
    message.params = Params.fromPartial(object.params ?? {});
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    return {
      minter: object?.minter ? Minter.fromAmino(object.minter) : Minter.fromPartial({}),
      params: object?.params ? Params.fromAmino(object.params) : Params.fromPartial({})
    };
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.minter = message.minter ? Minter.toAmino(message.minter) : undefined;
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/seiprotocol.seichain.mint.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};