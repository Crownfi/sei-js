import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { HdPath, stringToPath } from '@cosmjs/crypto';

/**
 * Some leftover vestigial artifact because of arbitrary decisions made over 8 years ago. All you
 * need to know is that by by default, sei-native wallets use the number 118, and ethereum-native wallets, for example,
 * metamask, use the number 60. So if you are importing a seed phrase or wish to use it elsewhere, keep that in mind.
 */
export enum HdCoinType {
	Sei = 118,
	Ethereum = 60
}

function getHdPath(accountIndex: number = 0, coinType: HdCoinType | number = HdCoinType.Sei): HdPath {
	const stringPath = `m/44'/${coinType}'/0'/0/${accountIndex}`;
	return stringToPath(stringPath);
};

/**
 * Generates a new new account with a random seed phrase
 * @param mnemonicLength the amount of words to generate
 * @param accountIndex account index, defaults to 0
 * @param coinType the "coin type" number to use in the key derivation.
 * @returns 
 */
export async function generateWallet(
	mnemonicLength: 12 | 15 | 18 | 21 | 24 = 12,
	accountIndex?: number,
	coinType?: HdCoinType | number
): Promise<DirectSecp256k1HdWallet> {
	return await DirectSecp256k1HdWallet.generate(mnemonicLength, {
		prefix: 'sei',
		hdPaths: [getHdPath(accountIndex, coinType)]
	});
};

/**
 * Recovers a wallet associated with the seed phrase.
 * @param seedPhrase the magic words that allow everyone in the world to steal your funds
 * @param accountIndex 0 for the first account on the list, 1 for the second, etc.
 * @param coinType use 118 if the seed phrase was generated with a sei-native wallet, or 60 if the seed phrase was
 * generated with an ethereum-native wallet, like metamask.
 * @returns 
 */
export async function restoreWallet(
	seedPhrase: string,
	accountIndex?: number,
	coinType?: HdCoinType | number
): Promise<DirectSecp256k1HdWallet> {
	return await DirectSecp256k1HdWallet.fromMnemonic(seedPhrase, { prefix: 'sei', hdPaths: [getHdPath(accountIndex, coinType)] });
};
