// Heavily inspired from:
// https://github.com/cosmology-tech/telescope/blob/ff4fd2e8242353c62cd8924c965f7c6e28d31899/packages/lcd/src/rest.ts
// MIT license etc. etc.
function recordToTuples<T>(params?: Record<string, any>): [string, any][] {
	const result: [string, any][] = [];
	if (params != null) {
		for (const k in params) {
			const v = params[k];
			if (v != null) {
				if (typeof v.toISOString == "function") {
					result.push([k, v.toISOString()]);
					continue;
				} else if (Array.isArray(v)) {
					// This is what the rest endpoint _actually_ expects
					for (let i = 0; i < v.length; i += 1) {
						result.push([k, v[i]]);
					}
					continue;
				}
			}
			result.push([k, v])
		}
	}
	return result;
}

export class LCDClientError extends Error {
	name!: "LCDClientError";
	httpStatus: number;
	url: string;
	responseBody: any;
	constructor(
		params: {
			httpStatus: number,
			url: string,
			body: any
		}
	) {
		if (typeof params.body == "string"){
			super(params.body);
		} else if (params.body != null && params.body.message) {
			super(params.body.message);
		} else {
			super(JSON.stringify(params.body));
		}
		this.httpStatus = params.httpStatus;
		this.url = params.url;
	}
}
LCDClientError.prototype.name = "LCDClientError";

// Because axios encodes arrays WRONGLY!!!!!! (or at least in a manner which the endpoint doesn't expect)
export class LCDClient {
	restEndpoint: string;
	constructor({ restEndpoint }: { restEndpoint: string }) {
		this.restEndpoint = (new URL(restEndpoint, "http://localhost")).toString();
		if (!this.restEndpoint.endsWith("/")) {
			this.restEndpoint += "/";
		}
		this.get = this.get.bind(this);
		// this.post = this.post.bind(this);
	}
	async get<ResponseType = unknown>(endpoint: string, opts: {params?: Record<string, any>} = {}) {
		const fullUrl = new URL(
			endpoint + "?" + new URLSearchParams(recordToTuples(opts.params)),
			this.restEndpoint
		);
		const response = await fetch(fullUrl);
		if (response.status >= 400) {
			const responseText = await response.text();
			const responseJson = (() => {
				try {
					return JSON.parse(responseText)
				} catch (ex: any) {
					return undefined;
				}
			})();
			throw new LCDClientError({
				httpStatus: response.status,
				url: response.url,
				body: responseJson ?? responseText
			});
		} else {
			return response.json() as Promise<ResponseType>;
		}
	}
	/*
	// doesn't seem to be used
	post<ResponseType = unknown>(endpoint: string, body: any = {}, opts: {params?: object} = {}) {}
	*/
}
