(function(root){
	function showStatus(container, message, type = 'info') {
		if (!container) return;
		
		const statusContainer = container.querySelector('#widget-status') || container.querySelector('.status-container');
		if (!statusContainer) return;
		
		// Clear existing status
		statusContainer.innerHTML = '';
		
		if (!message || message.trim() === '') {
			statusContainer.style.display = 'none';
			return;
		}
		
		// Create status element
		const statusEl = document.createElement('div');
		statusEl.className = `status-message status-${type}`;
		statusEl.textContent = message;
		
		// Add styling based on type
		const styles = {
			success: {
				backgroundColor: '#f0fdf4',
				borderColor: '#22c55e',
				color: '#166534'
			},
			error: {
				backgroundColor: '#fef2f2',
				borderColor: '#ef4444',
				color: '#991b1b'
			},
			warning: {
				backgroundColor: '#fffbeb',
				borderColor: '#f59e0b',
				color: '#92400e'
			},
			info: {
				backgroundColor: '#eff6ff',
				borderColor: '#3b82f6',
				color: '#1e40af'
			}
		};
		
		const style = styles[type] || styles.info;
		Object.assign(statusEl.style, {
			padding: '12px 16px',
			borderRadius: '8px',
			border: `1px solid ${style.borderColor}`,
			backgroundColor: style.backgroundColor,
			color: style.color,
			fontSize: '14px',
			fontWeight: '500',
			marginBottom: '16px',
			display: 'block'
		});
		
		statusContainer.appendChild(statusEl);
		statusContainer.style.display = 'block';
		
		// Auto-hide success messages after 5 seconds
		if (type === 'success') {
			setTimeout(() => {
				if (statusEl.parentNode) {
					statusEl.remove();
					if (statusContainer.children.length === 0) {
						statusContainer.style.display = 'none';
					}
				}
			}, 5000);
		}
	}
	
	// Expose as both GMCore.showStatus and root.showStatus for compatibility
	root.GMCore = root.GMCore || {};
	root.GMCore.showStatus = showStatus;
	root.showStatus = showStatus;
})(typeof window !== 'undefined' ? window : this);



