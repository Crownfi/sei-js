import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
export interface Params {
  /** The number of blocks per voting window, at the end of the vote period, the oracle votes are assessed and exchange rates are calculated. If the vote period is 1 this is equivalent to having oracle votes assessed and exchange rates calculated in each block. */
  votePeriod: bigint;
  voteThreshold: string;
  rewardBand: string;
  whitelist: Denom[];
  slashFraction: string;
  /** The interval in blocks at which the oracle module will assess validator penalty counters, and penalize validators with too poor performance. */
  slashWindow: bigint;
  /** The minimum percentage of voting windows for which a validator must have `success`es in order to not be penalized at the end of the slash window. */
  minValidPerWindow: string;
  lookbackDuration: bigint;
}
export interface ParamsProtoMsg {
  typeUrl: "/seiprotocol.seichain.oracle.Params";
  value: Uint8Array;
}
export interface ParamsAmino {
  /** The number of blocks per voting window, at the end of the vote period, the oracle votes are assessed and exchange rates are calculated. If the vote period is 1 this is equivalent to having oracle votes assessed and exchange rates calculated in each block. */
  vote_period: string;
  vote_threshold: string;
  reward_band: string;
  whitelist: DenomAmino[];
  slash_fraction: string;
  /** The interval in blocks at which the oracle module will assess validator penalty counters, and penalize validators with too poor performance. */
  slash_window: string;
  /** The minimum percentage of voting windows for which a validator must have `success`es in order to not be penalized at the end of the slash window. */
  min_valid_per_window: string;
  lookback_duration: string;
}
export interface ParamsAminoMsg {
  type: "/seiprotocol.seichain.oracle.Params";
  value: ParamsAmino;
}
export interface ParamsSDKType {
  vote_period: bigint;
  vote_threshold: string;
  reward_band: string;
  whitelist: DenomSDKType[];
  slash_fraction: string;
  slash_window: bigint;
  min_valid_per_window: string;
  lookback_duration: bigint;
}
export interface Denom {
  name: string;
}
export interface DenomProtoMsg {
  typeUrl: "/seiprotocol.seichain.oracle.Denom";
  value: Uint8Array;
}
export interface DenomAmino {
  name: string;
}
export interface DenomAminoMsg {
  type: "/seiprotocol.seichain.oracle.Denom";
  value: DenomAmino;
}
export interface DenomSDKType {
  name: string;
}
export interface AggregateExchangeRateVote {
  exchangeRateTuples: ExchangeRateTuple[];
  voter: string;
}
export interface AggregateExchangeRateVoteProtoMsg {
  typeUrl: "/seiprotocol.seichain.oracle.AggregateExchangeRateVote";
  value: Uint8Array;
}
export interface AggregateExchangeRateVoteAmino {
  exchange_rate_tuples: ExchangeRateTupleAmino[];
  voter: string;
}
export interface AggregateExchangeRateVoteAminoMsg {
  type: "/seiprotocol.seichain.oracle.AggregateExchangeRateVote";
  value: AggregateExchangeRateVoteAmino;
}
export interface AggregateExchangeRateVoteSDKType {
  exchange_rate_tuples: ExchangeRateTupleSDKType[];
  voter: string;
}
export interface ExchangeRateTuple {
  denom: string;
  exchangeRate: string;
}
export interface ExchangeRateTupleProtoMsg {
  typeUrl: "/seiprotocol.seichain.oracle.ExchangeRateTuple";
  value: Uint8Array;
}
export interface ExchangeRateTupleAmino {
  denom: string;
  exchange_rate: string;
}
export interface ExchangeRateTupleAminoMsg {
  type: "/seiprotocol.seichain.oracle.ExchangeRateTuple";
  value: ExchangeRateTupleAmino;
}
export interface ExchangeRateTupleSDKType {
  denom: string;
  exchange_rate: string;
}
export interface OracleExchangeRate {
  exchangeRate: string;
  lastUpdate: string;
}
export interface OracleExchangeRateProtoMsg {
  typeUrl: "/seiprotocol.seichain.oracle.OracleExchangeRate";
  value: Uint8Array;
}
export interface OracleExchangeRateAmino {
  exchange_rate: string;
  last_update: string;
}
export interface OracleExchangeRateAminoMsg {
  type: "/seiprotocol.seichain.oracle.OracleExchangeRate";
  value: OracleExchangeRateAmino;
}
export interface OracleExchangeRateSDKType {
  exchange_rate: string;
  last_update: string;
}
export interface PriceSnapshotItem {
  denom: string;
  oracleExchangeRate: OracleExchangeRate;
}
export interface PriceSnapshotItemProtoMsg {
  typeUrl: "/seiprotocol.seichain.oracle.PriceSnapshotItem";
  value: Uint8Array;
}
export interface PriceSnapshotItemAmino {
  denom: string;
  oracle_exchange_rate?: OracleExchangeRateAmino;
}
export interface PriceSnapshotItemAminoMsg {
  type: "/seiprotocol.seichain.oracle.PriceSnapshotItem";
  value: PriceSnapshotItemAmino;
}
export interface PriceSnapshotItemSDKType {
  denom: string;
  oracle_exchange_rate: OracleExchangeRateSDKType;
}
export interface PriceSnapshot {
  snapshotTimestamp: bigint;
  priceSnapshotItems: PriceSnapshotItem[];
}
export interface PriceSnapshotProtoMsg {
  typeUrl: "/seiprotocol.seichain.oracle.PriceSnapshot";
  value: Uint8Array;
}
export interface PriceSnapshotAmino {
  snapshotTimestamp: string;
  price_snapshot_items: PriceSnapshotItemAmino[];
}
export interface PriceSnapshotAminoMsg {
  type: "/seiprotocol.seichain.oracle.PriceSnapshot";
  value: PriceSnapshotAmino;
}
export interface PriceSnapshotSDKType {
  snapshotTimestamp: bigint;
  price_snapshot_items: PriceSnapshotItemSDKType[];
}
export interface OracleTwap {
  denom: string;
  twap: string;
  lookbackSeconds: bigint;
}
export interface OracleTwapProtoMsg {
  typeUrl: "/seiprotocol.seichain.oracle.OracleTwap";
  value: Uint8Array;
}
export interface OracleTwapAmino {
  denom: string;
  twap: string;
  lookback_seconds: string;
}
export interface OracleTwapAminoMsg {
  type: "/seiprotocol.seichain.oracle.OracleTwap";
  value: OracleTwapAmino;
}
export interface OracleTwapSDKType {
  denom: string;
  twap: string;
  lookback_seconds: bigint;
}
export interface VotePenaltyCounter {
  missCount: bigint;
  abstainCount: bigint;
  successCount: bigint;
}
export interface VotePenaltyCounterProtoMsg {
  typeUrl: "/seiprotocol.seichain.oracle.VotePenaltyCounter";
  value: Uint8Array;
}
export interface VotePenaltyCounterAmino {
  miss_count: string;
  abstain_count: string;
  success_count: string;
}
export interface VotePenaltyCounterAminoMsg {
  type: "/seiprotocol.seichain.oracle.VotePenaltyCounter";
  value: VotePenaltyCounterAmino;
}
export interface VotePenaltyCounterSDKType {
  miss_count: bigint;
  abstain_count: bigint;
  success_count: bigint;
}
function createBaseParams(): Params {
  return {
    votePeriod: BigInt(0),
    voteThreshold: "",
    rewardBand: "",
    whitelist: [],
    slashFraction: "",
    slashWindow: BigInt(0),
    minValidPerWindow: "",
    lookbackDuration: BigInt(0)
  };
}
export const Params = {
  typeUrl: "/seiprotocol.seichain.oracle.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.votePeriod !== BigInt(0)) {
      writer.uint32(8).uint64(message.votePeriod);
    }
    if (message.voteThreshold !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.voteThreshold, 18).atomics);
    }
    if (message.rewardBand !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.rewardBand, 18).atomics);
    }
    for (const v of message.whitelist) {
      Denom.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.slashFraction !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.slashFraction, 18).atomics);
    }
    if (message.slashWindow !== BigInt(0)) {
      writer.uint32(48).uint64(message.slashWindow);
    }
    if (message.minValidPerWindow !== "") {
      writer.uint32(58).string(Decimal.fromUserInput(message.minValidPerWindow, 18).atomics);
    }
    if (message.lookbackDuration !== BigInt(0)) {
      writer.uint32(72).uint64(message.lookbackDuration);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.votePeriod = reader.uint64();
          break;
        case 2:
          message.voteThreshold = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.rewardBand = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.whitelist.push(Denom.decode(reader, reader.uint32()));
          break;
        case 5:
          message.slashFraction = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.slashWindow = reader.uint64();
          break;
        case 7:
          message.minValidPerWindow = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 9:
          message.lookbackDuration = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.votePeriod = object.votePeriod !== undefined && object.votePeriod !== null ? BigInt(object.votePeriod.toString()) : BigInt(0);
    message.voteThreshold = object.voteThreshold ?? "";
    message.rewardBand = object.rewardBand ?? "";
    message.whitelist = object.whitelist?.map(e => Denom.fromPartial(e)) || [];
    message.slashFraction = object.slashFraction ?? "";
    message.slashWindow = object.slashWindow !== undefined && object.slashWindow !== null ? BigInt(object.slashWindow.toString()) : BigInt(0);
    message.minValidPerWindow = object.minValidPerWindow ?? "";
    message.lookbackDuration = object.lookbackDuration !== undefined && object.lookbackDuration !== null ? BigInt(object.lookbackDuration.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    return {
      votePeriod: BigInt(object.vote_period),
      voteThreshold: object.vote_threshold,
      rewardBand: object.reward_band,
      whitelist: Array.isArray(object?.whitelist) ? object.whitelist.map((e: any) => Denom.fromAmino(e)) : [],
      slashFraction: object.slash_fraction,
      slashWindow: BigInt(object.slash_window),
      minValidPerWindow: object.min_valid_per_window,
      lookbackDuration: BigInt(object.lookback_duration)
    };
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.vote_period = message.votePeriod ? message.votePeriod.toString() : undefined;
    obj.vote_threshold = message.voteThreshold;
    obj.reward_band = message.rewardBand;
    if (message.whitelist) {
      obj.whitelist = message.whitelist.map(e => e ? Denom.toAmino(e) : undefined);
    } else {
      obj.whitelist = [];
    }
    obj.slash_fraction = message.slashFraction;
    obj.slash_window = message.slashWindow ? message.slashWindow.toString() : undefined;
    obj.min_valid_per_window = message.minValidPerWindow;
    obj.lookback_duration = message.lookbackDuration ? message.lookbackDuration.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsProtoMsg): Params {
    return Params.decode(message.value);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/seiprotocol.seichain.oracle.Params",
      value: Params.encode(message).finish()
    };
  }
};
function createBaseDenom(): Denom {
  return {
    name: ""
  };
}
export const Denom = {
  typeUrl: "/seiprotocol.seichain.oracle.Denom",
  encode(message: Denom, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Denom {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDenom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Denom>): Denom {
    const message = createBaseDenom();
    message.name = object.name ?? "";
    return message;
  },
  fromAmino(object: DenomAmino): Denom {
    return {
      name: object.name
    };
  },
  toAmino(message: Denom): DenomAmino {
    const obj: any = {};
    obj.name = message.name;
    return obj;
  },
  fromAminoMsg(object: DenomAminoMsg): Denom {
    return Denom.fromAmino(object.value);
  },
  fromProtoMsg(message: DenomProtoMsg): Denom {
    return Denom.decode(message.value);
  },
  toProto(message: Denom): Uint8Array {
    return Denom.encode(message).finish();
  },
  toProtoMsg(message: Denom): DenomProtoMsg {
    return {
      typeUrl: "/seiprotocol.seichain.oracle.Denom",
      value: Denom.encode(message).finish()
    };
  }
};
function createBaseAggregateExchangeRateVote(): AggregateExchangeRateVote {
  return {
    exchangeRateTuples: [],
    voter: ""
  };
}
export const AggregateExchangeRateVote = {
  typeUrl: "/seiprotocol.seichain.oracle.AggregateExchangeRateVote",
  encode(message: AggregateExchangeRateVote, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.exchangeRateTuples) {
      ExchangeRateTuple.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.voter !== "") {
      writer.uint32(18).string(message.voter);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AggregateExchangeRateVote {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAggregateExchangeRateVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.exchangeRateTuples.push(ExchangeRateTuple.decode(reader, reader.uint32()));
          break;
        case 2:
          message.voter = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AggregateExchangeRateVote>): AggregateExchangeRateVote {
    const message = createBaseAggregateExchangeRateVote();
    message.exchangeRateTuples = object.exchangeRateTuples?.map(e => ExchangeRateTuple.fromPartial(e)) || [];
    message.voter = object.voter ?? "";
    return message;
  },
  fromAmino(object: AggregateExchangeRateVoteAmino): AggregateExchangeRateVote {
    return {
      exchangeRateTuples: Array.isArray(object?.exchange_rate_tuples) ? object.exchange_rate_tuples.map((e: any) => ExchangeRateTuple.fromAmino(e)) : [],
      voter: object.voter
    };
  },
  toAmino(message: AggregateExchangeRateVote): AggregateExchangeRateVoteAmino {
    const obj: any = {};
    if (message.exchangeRateTuples) {
      obj.exchange_rate_tuples = message.exchangeRateTuples.map(e => e ? ExchangeRateTuple.toAmino(e) : undefined);
    } else {
      obj.exchange_rate_tuples = [];
    }
    obj.voter = message.voter;
    return obj;
  },
  fromAminoMsg(object: AggregateExchangeRateVoteAminoMsg): AggregateExchangeRateVote {
    return AggregateExchangeRateVote.fromAmino(object.value);
  },
  fromProtoMsg(message: AggregateExchangeRateVoteProtoMsg): AggregateExchangeRateVote {
    return AggregateExchangeRateVote.decode(message.value);
  },
  toProto(message: AggregateExchangeRateVote): Uint8Array {
    return AggregateExchangeRateVote.encode(message).finish();
  },
  toProtoMsg(message: AggregateExchangeRateVote): AggregateExchangeRateVoteProtoMsg {
    return {
      typeUrl: "/seiprotocol.seichain.oracle.AggregateExchangeRateVote",
      value: AggregateExchangeRateVote.encode(message).finish()
    };
  }
};
function createBaseExchangeRateTuple(): ExchangeRateTuple {
  return {
    denom: "",
    exchangeRate: ""
  };
}
export const ExchangeRateTuple = {
  typeUrl: "/seiprotocol.seichain.oracle.ExchangeRateTuple",
  encode(message: ExchangeRateTuple, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.exchangeRate !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.exchangeRate, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ExchangeRateTuple {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExchangeRateTuple();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.exchangeRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ExchangeRateTuple>): ExchangeRateTuple {
    const message = createBaseExchangeRateTuple();
    message.denom = object.denom ?? "";
    message.exchangeRate = object.exchangeRate ?? "";
    return message;
  },
  fromAmino(object: ExchangeRateTupleAmino): ExchangeRateTuple {
    return {
      denom: object.denom,
      exchangeRate: object.exchange_rate
    };
  },
  toAmino(message: ExchangeRateTuple): ExchangeRateTupleAmino {
    const obj: any = {};
    obj.denom = message.denom;
    obj.exchange_rate = message.exchangeRate;
    return obj;
  },
  fromAminoMsg(object: ExchangeRateTupleAminoMsg): ExchangeRateTuple {
    return ExchangeRateTuple.fromAmino(object.value);
  },
  fromProtoMsg(message: ExchangeRateTupleProtoMsg): ExchangeRateTuple {
    return ExchangeRateTuple.decode(message.value);
  },
  toProto(message: ExchangeRateTuple): Uint8Array {
    return ExchangeRateTuple.encode(message).finish();
  },
  toProtoMsg(message: ExchangeRateTuple): ExchangeRateTupleProtoMsg {
    return {
      typeUrl: "/seiprotocol.seichain.oracle.ExchangeRateTuple",
      value: ExchangeRateTuple.encode(message).finish()
    };
  }
};
function createBaseOracleExchangeRate(): OracleExchangeRate {
  return {
    exchangeRate: "",
    lastUpdate: ""
  };
}
export const OracleExchangeRate = {
  typeUrl: "/seiprotocol.seichain.oracle.OracleExchangeRate",
  encode(message: OracleExchangeRate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.exchangeRate !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.exchangeRate, 18).atomics);
    }
    if (message.lastUpdate !== "") {
      writer.uint32(18).string(message.lastUpdate);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): OracleExchangeRate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOracleExchangeRate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.exchangeRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.lastUpdate = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<OracleExchangeRate>): OracleExchangeRate {
    const message = createBaseOracleExchangeRate();
    message.exchangeRate = object.exchangeRate ?? "";
    message.lastUpdate = object.lastUpdate ?? "";
    return message;
  },
  fromAmino(object: OracleExchangeRateAmino): OracleExchangeRate {
    return {
      exchangeRate: object.exchange_rate,
      lastUpdate: object.last_update
    };
  },
  toAmino(message: OracleExchangeRate): OracleExchangeRateAmino {
    const obj: any = {};
    obj.exchange_rate = message.exchangeRate;
    obj.last_update = message.lastUpdate;
    return obj;
  },
  fromAminoMsg(object: OracleExchangeRateAminoMsg): OracleExchangeRate {
    return OracleExchangeRate.fromAmino(object.value);
  },
  fromProtoMsg(message: OracleExchangeRateProtoMsg): OracleExchangeRate {
    return OracleExchangeRate.decode(message.value);
  },
  toProto(message: OracleExchangeRate): Uint8Array {
    return OracleExchangeRate.encode(message).finish();
  },
  toProtoMsg(message: OracleExchangeRate): OracleExchangeRateProtoMsg {
    return {
      typeUrl: "/seiprotocol.seichain.oracle.OracleExchangeRate",
      value: OracleExchangeRate.encode(message).finish()
    };
  }
};
function createBasePriceSnapshotItem(): PriceSnapshotItem {
  return {
    denom: "",
    oracleExchangeRate: OracleExchangeRate.fromPartial({})
  };
}
export const PriceSnapshotItem = {
  typeUrl: "/seiprotocol.seichain.oracle.PriceSnapshotItem",
  encode(message: PriceSnapshotItem, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.oracleExchangeRate !== undefined) {
      OracleExchangeRate.encode(message.oracleExchangeRate, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PriceSnapshotItem {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePriceSnapshotItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.oracleExchangeRate = OracleExchangeRate.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PriceSnapshotItem>): PriceSnapshotItem {
    const message = createBasePriceSnapshotItem();
    message.denom = object.denom ?? "";
    message.oracleExchangeRate = object.oracleExchangeRate !== undefined && object.oracleExchangeRate !== null ? OracleExchangeRate.fromPartial(object.oracleExchangeRate) : undefined;
    return message;
  },
  fromAmino(object: PriceSnapshotItemAmino): PriceSnapshotItem {
    return {
      denom: object.denom,
      oracleExchangeRate: object?.oracle_exchange_rate ? OracleExchangeRate.fromAmino(object.oracle_exchange_rate) : undefined
    };
  },
  toAmino(message: PriceSnapshotItem): PriceSnapshotItemAmino {
    const obj: any = {};
    obj.denom = message.denom;
    obj.oracle_exchange_rate = message.oracleExchangeRate ? OracleExchangeRate.toAmino(message.oracleExchangeRate) : undefined;
    return obj;
  },
  fromAminoMsg(object: PriceSnapshotItemAminoMsg): PriceSnapshotItem {
    return PriceSnapshotItem.fromAmino(object.value);
  },
  fromProtoMsg(message: PriceSnapshotItemProtoMsg): PriceSnapshotItem {
    return PriceSnapshotItem.decode(message.value);
  },
  toProto(message: PriceSnapshotItem): Uint8Array {
    return PriceSnapshotItem.encode(message).finish();
  },
  toProtoMsg(message: PriceSnapshotItem): PriceSnapshotItemProtoMsg {
    return {
      typeUrl: "/seiprotocol.seichain.oracle.PriceSnapshotItem",
      value: PriceSnapshotItem.encode(message).finish()
    };
  }
};
function createBasePriceSnapshot(): PriceSnapshot {
  return {
    snapshotTimestamp: BigInt(0),
    priceSnapshotItems: []
  };
}
export const PriceSnapshot = {
  typeUrl: "/seiprotocol.seichain.oracle.PriceSnapshot",
  encode(message: PriceSnapshot, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.snapshotTimestamp !== BigInt(0)) {
      writer.uint32(8).int64(message.snapshotTimestamp);
    }
    for (const v of message.priceSnapshotItems) {
      PriceSnapshotItem.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PriceSnapshot {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePriceSnapshot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.snapshotTimestamp = reader.int64();
          break;
        case 2:
          message.priceSnapshotItems.push(PriceSnapshotItem.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PriceSnapshot>): PriceSnapshot {
    const message = createBasePriceSnapshot();
    message.snapshotTimestamp = object.snapshotTimestamp !== undefined && object.snapshotTimestamp !== null ? BigInt(object.snapshotTimestamp.toString()) : BigInt(0);
    message.priceSnapshotItems = object.priceSnapshotItems?.map(e => PriceSnapshotItem.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: PriceSnapshotAmino): PriceSnapshot {
    return {
      snapshotTimestamp: BigInt(object.snapshotTimestamp),
      priceSnapshotItems: Array.isArray(object?.price_snapshot_items) ? object.price_snapshot_items.map((e: any) => PriceSnapshotItem.fromAmino(e)) : []
    };
  },
  toAmino(message: PriceSnapshot): PriceSnapshotAmino {
    const obj: any = {};
    obj.snapshotTimestamp = message.snapshotTimestamp ? message.snapshotTimestamp.toString() : undefined;
    if (message.priceSnapshotItems) {
      obj.price_snapshot_items = message.priceSnapshotItems.map(e => e ? PriceSnapshotItem.toAmino(e) : undefined);
    } else {
      obj.price_snapshot_items = [];
    }
    return obj;
  },
  fromAminoMsg(object: PriceSnapshotAminoMsg): PriceSnapshot {
    return PriceSnapshot.fromAmino(object.value);
  },
  fromProtoMsg(message: PriceSnapshotProtoMsg): PriceSnapshot {
    return PriceSnapshot.decode(message.value);
  },
  toProto(message: PriceSnapshot): Uint8Array {
    return PriceSnapshot.encode(message).finish();
  },
  toProtoMsg(message: PriceSnapshot): PriceSnapshotProtoMsg {
    return {
      typeUrl: "/seiprotocol.seichain.oracle.PriceSnapshot",
      value: PriceSnapshot.encode(message).finish()
    };
  }
};
function createBaseOracleTwap(): OracleTwap {
  return {
    denom: "",
    twap: "",
    lookbackSeconds: BigInt(0)
  };
}
export const OracleTwap = {
  typeUrl: "/seiprotocol.seichain.oracle.OracleTwap",
  encode(message: OracleTwap, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.twap !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.twap, 18).atomics);
    }
    if (message.lookbackSeconds !== BigInt(0)) {
      writer.uint32(24).int64(message.lookbackSeconds);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): OracleTwap {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOracleTwap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.twap = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.lookbackSeconds = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<OracleTwap>): OracleTwap {
    const message = createBaseOracleTwap();
    message.denom = object.denom ?? "";
    message.twap = object.twap ?? "";
    message.lookbackSeconds = object.lookbackSeconds !== undefined && object.lookbackSeconds !== null ? BigInt(object.lookbackSeconds.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: OracleTwapAmino): OracleTwap {
    return {
      denom: object.denom,
      twap: object.twap,
      lookbackSeconds: BigInt(object.lookback_seconds)
    };
  },
  toAmino(message: OracleTwap): OracleTwapAmino {
    const obj: any = {};
    obj.denom = message.denom;
    obj.twap = message.twap;
    obj.lookback_seconds = message.lookbackSeconds ? message.lookbackSeconds.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: OracleTwapAminoMsg): OracleTwap {
    return OracleTwap.fromAmino(object.value);
  },
  fromProtoMsg(message: OracleTwapProtoMsg): OracleTwap {
    return OracleTwap.decode(message.value);
  },
  toProto(message: OracleTwap): Uint8Array {
    return OracleTwap.encode(message).finish();
  },
  toProtoMsg(message: OracleTwap): OracleTwapProtoMsg {
    return {
      typeUrl: "/seiprotocol.seichain.oracle.OracleTwap",
      value: OracleTwap.encode(message).finish()
    };
  }
};
function createBaseVotePenaltyCounter(): VotePenaltyCounter {
  return {
    missCount: BigInt(0),
    abstainCount: BigInt(0),
    successCount: BigInt(0)
  };
}
export const VotePenaltyCounter = {
  typeUrl: "/seiprotocol.seichain.oracle.VotePenaltyCounter",
  encode(message: VotePenaltyCounter, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.missCount !== BigInt(0)) {
      writer.uint32(8).uint64(message.missCount);
    }
    if (message.abstainCount !== BigInt(0)) {
      writer.uint32(16).uint64(message.abstainCount);
    }
    if (message.successCount !== BigInt(0)) {
      writer.uint32(24).uint64(message.successCount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): VotePenaltyCounter {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVotePenaltyCounter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.missCount = reader.uint64();
          break;
        case 2:
          message.abstainCount = reader.uint64();
          break;
        case 3:
          message.successCount = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<VotePenaltyCounter>): VotePenaltyCounter {
    const message = createBaseVotePenaltyCounter();
    message.missCount = object.missCount !== undefined && object.missCount !== null ? BigInt(object.missCount.toString()) : BigInt(0);
    message.abstainCount = object.abstainCount !== undefined && object.abstainCount !== null ? BigInt(object.abstainCount.toString()) : BigInt(0);
    message.successCount = object.successCount !== undefined && object.successCount !== null ? BigInt(object.successCount.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: VotePenaltyCounterAmino): VotePenaltyCounter {
    return {
      missCount: BigInt(object.miss_count),
      abstainCount: BigInt(object.abstain_count),
      successCount: BigInt(object.success_count)
    };
  },
  toAmino(message: VotePenaltyCounter): VotePenaltyCounterAmino {
    const obj: any = {};
    obj.miss_count = message.missCount ? message.missCount.toString() : undefined;
    obj.abstain_count = message.abstainCount ? message.abstainCount.toString() : undefined;
    obj.success_count = message.successCount ? message.successCount.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: VotePenaltyCounterAminoMsg): VotePenaltyCounter {
    return VotePenaltyCounter.fromAmino(object.value);
  },
  fromProtoMsg(message: VotePenaltyCounterProtoMsg): VotePenaltyCounter {
    return VotePenaltyCounter.decode(message.value);
  },
  toProto(message: VotePenaltyCounter): Uint8Array {
    return VotePenaltyCounter.encode(message).finish();
  },
  toProtoMsg(message: VotePenaltyCounter): VotePenaltyCounterProtoMsg {
    return {
      typeUrl: "/seiprotocol.seichain.oracle.VotePenaltyCounter",
      value: VotePenaltyCounter.encode(message).finish()
    };
  }
};