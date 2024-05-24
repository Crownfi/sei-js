import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import {TelescopeBuilder} from '@cosmology/telescope';
import {promises as fsp} from "fs";

import fg from 'fast-glob';

const protoDirs = [resolve(__dirname, "..", "proto")];
const outPath = resolve(__dirname, "..", "src", "codegen");
async function telescope(input: ConstructorParameters<typeof TelescopeBuilder>[0]) {
    const builder = new TelescopeBuilder(input);
    await builder.build();
}

await fsp.rm(outPath, {recursive: true, force: true});
await telescope({
	protoDirs,
	outPath,
	options: {
		removeUnusedImports: true,
		interfaces: {
			// I'll give credit where it's due, thanks, carson.
			useUnionTypes: true
		},
		prototypes: {
			excluded: {
				packages: [
					'cosmos.app.v1alpha1',
					'cosmos.app.v1beta1',
					'cosmos.autocli.v1',
					'cosmos.authz.v1beta1',
					'cosmos.base.kv.v1beta1',
					'cosmos.base.reflection.v1beta1',
					'cosmos.base.snapshots.v1beta1',
					'cosmos.base.store.v1beta1',
					'cosmos.base.tendermint.v1beta1',
					'cosmos.capability.v1beta1',
					'cosmos.crisis.v1beta1',
					'cosmos.evidence.v1beta1',
					'cosmos.genutil.v1beta1',
					'cosmos.gov.v1',
					'cosmos.group.v1',
					'cosmos.group.v1beta1',
					'cosmos.mint.v1beta1',
					'cosmos.msg.v1',
					'cosmos.nft.v1beta1',
					'cosmos.orm.v1',
					'cosmos.orm.v1alpha1',
					'cosmos.params.v1beta1',
					'cosmos.slashing.v1beta1',
					'cosmos.vesting.v1beta1',
					'google.api',
					'ibc.core.port.v1',
					'ibc.core.types.v1'
				]
			},
			enableRegistryLoader: true,
			enableMessageComposer: true,
			includePackageVar: false,
			allowUndefinedTypes: true,
			typingsFormat: {
				useExact: false,
				useDeepPartial: true,
				timestamp: 'date',
				duration: 'duration',
				useTelescopeGeneratedType: true
			}
		},
		aminoEncoding: {
			enabled: true,
		},
		lcdClients: {
			enabled: true
		},
		rpcClients: {
			enabled: true,
			camelCase: true
		}
	}
})


const files = await fg(outPath + "/**/*.ts", { onlyFiles: true });
for (const filePath of files) {
	let fileContent = await fsp.readFile(filePath, "utf-8");

	// The tsc team thinks that import rewriting is sinful, so we now gotta commit some sins or our own.
	fileContent = fileContent.replace(/^\s*import(.*?)from\s*"(\..*?)"\s*;?\s*$/gm, (_, g1, g2) => {
		if (!(g2 as string).endsWith(".js")) {
			g2 += ".js";
		}
		return "import" + g1 + "from \"" + g2 + "\";";
	});
	fileContent = fileContent.replace(/\bimport\("(.*?)"\)/g, (_, g1) => {
		if (!(g1 as string).endsWith(".js")) {
			g1 += ".js";
		}
		return "import(\"" + g1 + "\")";
	});
	fileContent = fileContent.replace(/^\s*export(.*?)from\s*"(\..*?)"\s*;?\s*$/gm, (_, g1, g2) => {
		if (!(g2 as string).endsWith(".js")) {
			g2 += ".js";
		}
		return "export" + g1 + "from \"" + g2 + "\";";
	});
	fileContent = fileContent.replace(/(?:^|\n)\s*import(\s*{(?:\s|\S)*?}\s*)from\s*"(\..*)"\s*;/g, (_, g1, g2) => {
		if (!(g2 as string).endsWith(".js")) {
			g2 += ".js";
		}
		return "\nimport" + g1 + "from \"" + g2 + "\";";
	});
	
	
	// Telescope produces unsound code. So we have to commit even more sins to fix their mistakes,

	// The way they defined the "Any" type still makes it incompatible with union types that means
	// "could actually be X", instead of trying to fix their mistakes, we'll just replace "as Any" with "as any".
	/*fileContent = fileContent.replace(/ as Any\b/g, () => {
		return " as any";
	});*/

	// Honestly, I have no idea who thought this code was a good idea. (and I don't have enough time right now to check
	// and berate them) message[property] cannot be undefined, and I get you want to handle the property being null or
	// undefined. But... since fromPartial is _LITERALLY RIGHT THERE_ can't we just... well... fill the result all with
	// defaults?!?!
	/*fileContent = fileContent.replace(
		/^(\s*)message\.(\S+)\s*=\s*object\.(\S+)\s*!==\s*undefined\s*&&\s*object\.\S+\s*!==\s*null\s*\?\s*(\S+.fromPartial)\(\s*\S+\s*\)\s*:\s*undefined/gm,
		(_, indent, msgProperty, ObjProperty, fromPartialFunc) => {
			if (fromPartialFunc == "Any.fromPartial") {
				return `${indent}message.${msgProperty} = ${fromPartialFunc}(object.${ObjProperty} ?? {}) as any`;
			}else{
				return `${indent}message.${msgProperty} = ${fromPartialFunc}(object.${ObjProperty} ?? {})`;
			}
			
		}
	);*/

	// Again, from partial is _LITERALLY RIGHT THERE!!!!_
	/*fileContent = fileContent.replace(
		/\b\s*\?\s*(\S+)\.fromAmino\(\s*(\S+)\s*\)\s*\:\s*undefined\b/g,
		(_, objType, parseArg) => {
			return ` ? ${objType}.fromAmino(${parseArg}) : ${objType}.fromPartial({})`
		}
	);*/
	
	// Not 100% sure if this is incorrect, but it will at least make tsc happy.
	/*fileContent = fileContent.replace(
		/\b\s*\?\s*(\S+)_FromAmino\(\s*(\S+)\s*\)\s*\:\s*undefined\b/g,
		(_, objType, parseArg) => {
			return ` ? ${objType}_FromAmino(${parseArg}) : (Any.fromPartial({}) as any)`
		}
	);*/

	// Note that some things will still have to be fixed manually (e.g. default values for Dates)
	// but that's beyond the scope of simple regex replacements
	await fsp.writeFile(filePath, fileContent);
}

console.log('✨ all done!');
