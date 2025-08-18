(function(root){
	function qs(el, sel) { return (el || document).querySelector(sel); }
	function qsa(el, sel) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); }
	function on(el, evt, handler, opts) { (el || document).addEventListener(evt, handler, opts); return () => (el||document).removeEventListener(evt, handler, opts); }
	function create(tag, attrs) {
		const el = document.createElement(tag);
		if (attrs) Object.keys(attrs).forEach(k => {
			if (k === 'text') el.textContent = attrs[k];
			else if (k === 'html') el.innerHTML = attrs[k];
			else el.setAttribute(k, String(attrs[k]));
		});
		return el;
	}
	root.GMDOM = { qs, qsa, on, create };
})(typeof window !== 'undefined' ? window : this);




