(function(root){
	// Minimal transport shim to invoke Edge Functions without supabase-js
	function createInvoke(config) {
		const base = (config && config.apiEndpoint ? String(config.apiEndpoint) : '').replace(/\/$/, '');
		return async function invoke(functionName, options) {
			const url = `${base}/${functionName}`;
			const headers = Object.assign(
				{ 'Content-Type': 'application/json', 'x-api-key': (config && config.apiKey) || '' },
				(options && options.headers) || {}
			);
			const body = options && options.body ? JSON.stringify(options.body) : undefined;
			const res = await fetch(url, { method: 'POST', mode: 'cors', headers, body });
			let data = null;
			try { data = await res.json(); } catch(_) {}
			if (!res.ok) {
				const err = new Error((data && (data.error || data.message)) || res.statusText);
				err.status = res.status;
				throw err;
			}
			return { data };
		};
	}

	async function ensureSupabaseClient(config) {
		// Return an object compatible with supabase-js client usage we need
		return {
			functions: {
				invoke: createInvoke(config)
			}
		};
	}

	root.GMTransport = root.GMTransport || {};
	root.GMTransport.ensureSupabaseClient = ensureSupabaseClient;
})(typeof window !== 'undefined' ? window : this);





