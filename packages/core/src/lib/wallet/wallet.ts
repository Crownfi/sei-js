import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { HdPath, stringToPath } from '@cosmjs/crypto';

export enum HdCoinType {
	Sei = 118,
	Ethereum = 60
}

function getHdPath(accountIndex: number = 0, coinType: HdCoinType | number = HdCoinType.Sei): HdPath {
	const stringPath = `m/44'/${coinType}'/0'/0/${accountIndex}`;
	return stringToPath(stringPath);
};

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

export async function restoreWallet(
	seedPhrase: string,
	accountIndex?: number,
	coinType?: HdCoinType | number
): Promise<DirectSecp256k1HdWallet> {
	return await DirectSecp256k1HdWallet.fromMnemonic(seedPhrase, { prefix: 'sei', hdPaths: [getHdPath(accountIndex, coinType)] });
};
