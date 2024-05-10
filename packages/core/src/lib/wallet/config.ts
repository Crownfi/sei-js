import { ChainConfig, ChainInfo, Currency } from './types.js';
import { AccountData, OfflineSigner } from '@cosmjs/proto-signing';
import { OfflineAminoSigner, StdSignature } from '@cosmjs/amino';

export interface SeiProviderCommon {
	getOfflineSignerAuto: (chainId: string) => Promise<OfflineSigner | undefined>;
	getOfflineSignerAmino: (chainId: string) => Promise<OfflineAminoSigner | undefined>;
	enable: (chainId: string) => Promise<void>
	disable: (chainId: string) => Promise<void>
	signArbitrary?: (chainId: string, signer: string, message: string) => Promise<StdSignature | undefined>
	verifyArbitrary?: (chainId: string, signingAddress: string, data: string, signature: StdSignature) => Promise<boolean>
	experimentalSuggestChain?: (config: ChainConfig) => Promise<void>
}

export const KNOWN_SEI_PROVIDERS = ["tailwind", "fin", "compass", "keplr", "leap", "shellwallet", "coin98"] as const;
export type KnownSeiProviders = typeof KNOWN_SEI_PROVIDERS[number];
export interface SeiProviderInfo<S extends string> {
	windowKey: S;
	name: string;
	icon: string;
	website: string;
}

export const KNOWN_SEI_PROVIDER_INFO = {
	"tailwind": {
		windowKey: "tailwind" as const,
		name: "TAILWIND Wallet",
		website: "https://tailwind.zone",
		icon: "./tailwind-logo.png"
	},
	"fin": {
		windowKey: "fin" as const,
		name: "Fin",
		website: "https://finwallet.com",
		icon: "https://sei-js-assets.s3.us-west-2.amazonaws.com/fin.png",
	},
	"compass": {
		windowKey: "compass" as const,
		name: "Compass",
		website: "https://chrome.google.com/webstore/detail/compass-wallet/anokgmphncpekkhclmingpimjmcooifb",
		icon: "https://sei-js-assets.s3.us-west-2.amazonaws.com/compass.png"
	},
	"keplr": {
		windowKey: "keplr" as const,
		name: "Keplr",
		website: "https://www.keplr.app/download",
		icon: "https://sei-js-assets.s3.us-west-2.amazonaws.com/keplr.png"
	},
	"leap": {
		windowKey: "leap" as const,
		name: "Leap",
		website: "https://www.leapwallet.io/download",
		icon: "https://sei-js-assets.s3.us-west-2.amazonaws.com/leap.png"
	},
	// "rigorous testing and responsiveness requirements"
	"shellwallet": {
		windowKey: "shellwallet" as const,
		name: "Shell",
		website: "https://chrome.google.com/webstore/detail/shell-wallet/kbdcddcmgoplfockflacnnefaehaiocb",
		icon: "https://shellwallet.io/logo/shell-icon.png"
	},
	"coin98": {
		windowKey: "coin98" as const,
		name: "Coin98",
		website: "https://coin98.com/wallet",
		icon: "https://inventory.coin98.com/images/c98logo.png"
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
	static discoveredWallets(): {[k in KnownSeiProviders]: boolean} {
		if (typeof window == "undefined") {
			throw new Error("Not running in browser");
		}
		const result = {} as any;
		for (const k of KNOWN_SEI_PROVIDERS) {
			result[k] = (window as any)[k] != undefined;
		}
		return result;
	}
	static discoveredWalletList(): KnownSeiProviders[] {
		if (typeof window == "undefined") {
			throw new Error("Not running in browser");
		}
		const result: KnownSeiProviders[] = [];
		for (const k of KNOWN_SEI_PROVIDERS) {
			if ((window as any)[k] != undefined) {
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
		return this.getProvider().getOfflineSignerAuto(chainId);
	}
	async getOfflineSignerAmino(chainId: string): Promise<OfflineSigner | undefined> {
		return this.getProvider().getOfflineSignerAmino(chainId);
	}
	async getAccounts(chainId: string): Promise<readonly AccountData[]> {
		const offlineSigner = await this.getProvider().getOfflineSignerAuto(chainId);
		return offlineSigner?.getAccounts() || []
	};
	async connect(chainId: string): Promise<void> {
		await this.getProvider().enable(chainId);
	};
	async disconnect(chainId: string): Promise<void> {
		await this.getProvider().disable(chainId);
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
