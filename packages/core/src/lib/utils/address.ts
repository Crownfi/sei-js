import { fromBech32, toBech32 } from '@cosmjs/encoding';
import { sha256 } from './hash.js';
import { Secp256k1, Secp256k1Signature, ripemd160 } from '@cosmjs/crypto';

/**
 * Checks the address
 * @param address the address to check
 * @returns true if `address` is a valid `sei1` address, false otherwise.
 */
export const isValidSeiAddress = (address: string): boolean => {
	try {
		const { prefix } = fromBech32(address);
		return prefix === 'sei';
	} catch (e) {
		return false;
	}
};

/**
 * Normalizes the pubkey given into its compressed or uncompressed form.
 */
export const normalizePubkey = (pubKey: Uint8Array, uncompressed?: boolean): Uint8Array => {
	// Aritz: The design choices of upstream continue to amaze and exasperate me.
	// cosmjs' Secp256k1 compression functions already don't touch the thing if they are already the required length.
	return uncompressed ? Secp256k1.uncompressPubkey(pubKey) : Secp256k1.compressPubkey(pubKey)	
};

/**
 * Gets the "canonical address" from the public key
 * @param pubkey A byte array representing a public key.
 * @returns What cosmwasm calls the "CanonicalAddr"
 */
export function getCanonicalAddressFromPubKey(pubkey: Uint8Array): Uint8Array {
	return ripemd160(sha256(normalizePubkey(pubkey)));
};

/**
 * Gets the human-readable address form the public key
 * 
 * @param pubkey A byte array representing a public key.
 * @returns What cosmwasm calls the "Addr"
 */
export function getAddressStringFromPubKey(pubkey: Uint8Array): string {
	return canonicalAddressToString(getCanonicalAddressFromPubKey(pubkey));
}

/**
 * Turns the `CanonicalAddr`, i.e., the decoded sei1 address represented as 20 or 32 bytes into the human-readable
 * address.
 * @param seiCanonicalAddr 
 * @returns 
 */
export function canonicalAddressToString(seiCanonicalAddr: Uint8Array): string {
	return toBech32("sei", seiCanonicalAddr);
}

/**
 * Converts a sei1 address into its byte form, usually either 20 or 32 bytes
 * @param addr the sei1 address
 * @returns bytes
 */
export function stringToCanonicalAddr(addr: string): Uint8Array {
	const { data } = fromBech32(addr);
	return data;
}

export const verifyDigest32 = (digest: Uint8Array, signature: Uint8Array, pubKey: Uint8Array): Promise<boolean> => {
	if (digest.length !== 32) {
		throw new Error(`Invalid length of digest to verify: ${digest.length}`);
	}

	if (signature.length !== 64) {
		throw new Error(`Invalid length of signature: ${signature.length}`);
	}

	return Secp256k1.verifySignature(
		Secp256k1Signature.fromFixedLength(signature),
		digest,
		pubKey
	);
};
