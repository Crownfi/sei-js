import { ChainConfig, ChainInfo, Currency } from './types.js';
import { AccountData, OfflineSigner } from '@cosmjs/proto-signing';
import { OfflineAminoSigner, StdSignature } from '@cosmjs/amino';

export interface SeiProviderCommon {
	getOfflineSigner?: (chainId: string) => Promise<OfflineSigner | undefined>;
	getOfflineSignerAuto?: (chainId: string) => Promise<OfflineSigner | undefined>;
	getOfflineSignerAmino?: (chainId: string) => Promise<OfflineAminoSigner | undefined>;
	enable?: (chainId: string) => Promise<void>
	disable?: (chainId: string) => Promise<void>
	signArbitrary?: (chainId: string, signer: string, message: string) => Promise<StdSignature | undefined>
	verifyArbitrary?: (chainId: string, signingAddress: string, data: string, signature: StdSignature) => Promise<boolean>
	experimentalSuggestChain?: (config: ChainConfig) => Promise<void>
}

export const RECCOMMENDED_SEI_PROVIDER = "tailwind";
/**
 * An array of values which correspond to the keys of {@link KNOWN_SEI_PROVIDER_INFO}
 */
export const KNOWN_SEI_PROVIDERS = ["tailwind", "fin", "compass", "keplr", "leap", "coin98"] as const;
export type KnownSeiProviders = typeof KNOWN_SEI_PROVIDERS[number];
export interface SeiProviderInfo<S extends string> {
	/** property name injected in `window` expected */
	windowKey: S;
	/** The name of the wallet */
	name: string;
	/** A URL to the logo of the wallet */
	icon: string;
	/** Whether or not the wallet also provides EVM */
	providesEvm: boolean;
	website: string;
	emulatedBy: string[];
}

export const KNOWN_SEI_PROVIDER_INFO = {
	"tailwind": {
		windowKey: "tailwind" as const,
		name: "Tailwind",
		website: "https://tailwind.zone",
		icon: "https://app.crownfi.io/assets/wallets/tailwind.svg",
		providesEvm: true,
		emulatedBy: []
	},
	"fin": {
		windowKey: "fin" as const,
		name: "Fin",
		website: "https://finwallet.com",
		icon: "https://sei-js-assets.s3.us-west-2.amazonaws.com/fin.png",
		providesEvm: true,
		emulatedBy: []
	},
	"compass": {
		windowKey: "compass" as const,
		name: "Compass",
		website: "https://chrome.google.com/webstore/detail/compass-wallet/anokgmphncpekkhclmingpimjmcooifb",
		icon: "https://sei-js-assets.s3.us-west-2.amazonaws.com/compass.png",
		providesEvm: true,
		emulatedBy: ["tailwind"]
	},
	"keplr": {
		windowKey: "keplr" as const,
		name: "Keplr",
		website: "https://www.keplr.app/download",
		icon: "https://sei-js-assets.s3.us-west-2.amazonaws.com/keplr.png",
		providesEvm: false,
		emulatedBy: ["tailwind"]
	},
	"leap": {
		windowKey: "leap" as const,
		name: "Leap",
		website: "https://www.leapwallet.io/download",
		icon: "https://sei-js-assets.s3.us-west-2.amazonaws.com/leap.png",
		providesEvm: false,
		emulatedBy: []
	},
	"coin98": {
		windowKey: "coin98" as const,
		name: "Coin98",
		website: "https://coin98.com/wallet",
		icon: "https://inventory.coin98.com/images/c98logo.png",
		providesEvm: false,
		emulatedBy: []
	}
}

for (const k of KNOWN_SEI_PROVIDERS) {
	Object.freeze(KNOWN_SEI_PROVIDER_INFO[k]); // When I say const I MEAN CONST!!
}

export class SeiWallet {
	walletInfo: SeiProviderInfo<KnownSeiProviders>
	constructor(providerId: KnownSeiProviders) {
		this.walletInfo = KNOWN_SEI_PROVIDER_INFO[providerId];
		if (typeof window == "undefined") {
			throw new Error("Not running in browser");
		}
		this.getProvider(); // Error out if wallet isn't installed
	}
	static isNotEmulated(providerId: KnownSeiProviders) {
		return KNOWN_SEI_PROVIDER_INFO[providerId].emulatedBy.findIndex(realProvider => {
			return (window as any)[realProvider] != undefined;
		}) == -1;
	}
	static discoveredWallets(): {[k in KnownSeiProviders]: boolean} {
		if (typeof window == "undefined") {
			throw new Error("Not running in browser");
		}
		const result = {} as any;
		for (const k of KNOWN_SEI_PROVIDERS) {
			result[k] = (window as any)[k] != undefined && this.isNotEmulated(k);
		}
		return result;
	}
	static discoveredWalletList(): KnownSeiProviders[] {
		if (typeof window == "undefined") {
			throw new Error("Not running in browser");
		}
		const result: KnownSeiProviders[] = [];
		for (const k of KNOWN_SEI_PROVIDERS) {
			if ((window as any)[k] != undefined && this.isNotEmulated(k)) {
				result.push(k);
			}
		}
		return result;
	}
	getProvider(): SeiProviderCommon {
		if ((window as any)[this.walletInfo.windowKey] == undefined) {
			throw new Error(this.walletInfo.name + " wallet not found");
		}
		return (window as any)[this.walletInfo.windowKey];
	}
	async getOfflineSigner(chainId: string): Promise<OfflineSigner | undefined> {
		const provider = this.getProvider();
		if (provider.getOfflineSignerAuto != undefined) {
			return provider.getOfflineSignerAuto(chainId);
		}
		if (provider.getOfflineSigner != undefined) {
			return provider.getOfflineSigner(chainId);
		}
	}
	async getOfflineSignerAmino(chainId: string): Promise<OfflineAminoSigner | undefined> {
		const provider = this.getProvider();
		if (provider.getOfflineSignerAmino != undefined) {
			return provider.getOfflineSignerAmino(chainId);
		}
		if (provider.getOfflineSigner != undefined) {
			const signer = await provider.getOfflineSigner(chainId);
			if (signer && "signAmino" in signer) {
				return signer;
			}
		}
	}
	async getAccounts(chainId: string): Promise<readonly AccountData[]> {
		const offlineSigner = await this.getOfflineSigner(chainId);
		return offlineSigner?.getAccounts() || []
	};
	async connect(chainId: string): Promise<void> {
		const provider = this.getProvider();
		if (provider.enable != undefined) {
			provider.enable(chainId);
		}
	};
	async disconnect(chainId: string): Promise<void> {
		const provider = this.getProvider();
		if (provider.disable != undefined) {
			provider.disable(chainId);
		}
	};
	async suggestChain(config: ChainConfig): Promise<void> {
		const provider = this.getProvider();
		if (provider.experimentalSuggestChain != undefined) {
			await provider.experimentalSuggestChain(config);
		}
	};
	async signArbitrary(chainId: string, signer: string, message: string): Promise<StdSignature | undefined> {
		const provider = this.getProvider();
		if (provider.signArbitrary != undefined) {
			return await provider.signArbitrary(chainId, signer, message);
		}
	};
	/**
	 * Be careful using this, a malicious client could just return true 100% of the time 
	 */
	async verifyArbitrary(chainId: string, signingAddress: string, data: string, signature: StdSignature): Promise<boolean> {
		const provider = this.getProvider();
		if (provider.verifyArbitrary != undefined) {
			return await provider.verifyArbitrary(chainId, signingAddress, data, signature);
		}
		return false;
	};
}

const DEFAULT_CHAIN_INFO = {
	chainName: 'Sei',
	chainId: 'pacific-1',
	restUrl: 'https://rest.wallet.pacific-1.sei.io/',
	rpcUrl: 'https://rpc.wallet.pacific-1.sei.io/',
	gasPriceStep: { low: 0.1, average: 0.2, high: 0.3 }
};

export const getChainSuggest = (chainInfo: ChainInfo = {}, currencies: Currency[] = []): ChainConfig => {
	const prefix = 'sei';
	const { chainId, chainName, rpcUrl, restUrl, gasPriceStep } = {
		...DEFAULT_CHAIN_INFO,
		...chainInfo
	};

	return {
		chainId: chainId,
		chainName: chainName,
		rpc: rpcUrl,
		rest: restUrl,
		bip44: {
			coinType: 118
		},
		bech32Config: {
			bech32PrefixAccAddr: prefix,
			bech32PrefixAccPub: `${prefix}pub`,
			bech32PrefixValAddr: `${prefix}valoper`,
			bech32PrefixValPub: `${prefix}valoperpub`,
			bech32PrefixConsAddr: `${prefix}valcons`,
			bech32PrefixConsPub: `${prefix}valconspub`
		},
		currencies: [
			{
				coinDenom: 'SEI',
				coinMinimalDenom: 'usei',
				coinDecimals: 6
			},
			...currencies
		],
		feeCurrencies: [
			{
				coinDenom: 'SEI',
				coinMinimalDenom: 'usei',
				coinDecimals: 6,
				gasPriceStep
			}
		],
		stakeCurrency: {
			coinDenom: 'SEI',
			coinMinimalDenom: 'usei',
			coinDecimals: 6
		},
		coinType: 118,
		features: ['stargate', 'ibc-transfer', 'cosmwasm']
	};
};
