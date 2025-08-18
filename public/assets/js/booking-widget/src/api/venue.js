(function(root){
	// Venue configuration and data
	const venueConfig = {
		manor: {
			name: 'Manor',
			areas: {
				upstairs: { name: 'Upstairs', capacity: '50-80 guests' },
				downstairs: { name: 'Downstairs', capacity: '100-150 guests' },
				full_venue: { name: 'Full Venue', capacity: '150-250 guests' },
				karaoke: { name: 'Karaoke Booths', capacity: '2-8 guests per booth' }
			}
		},
		hippie: {
			name: 'Hippie',
			areas: {
				upstairs: { name: 'Upstairs', capacity: '40-60 guests' },
				downstairs: { name: 'Downstairs', capacity: '80-120 guests' },
				full_venue: { name: 'Full Venue', capacity: '120-180 guests' }
			}
		}
	};

	function getVenueConfig(venue) {
		return venueConfig[venue] || null;
	}

	function getVenueAreas(venue) {
		const config = getVenueConfig(venue);
		return config ? Object.keys(config.areas).map(key => ({
			id: key,
			name: config.areas[key].name,
			capacity: config.areas[key].capacity
		})) : [];
	}

	function getAllVenues() {
		return Object.keys(venueConfig).map(key => ({
			id: key,
			name: venueConfig[key].name
		}));
	}

	root.GMVenueAPI = {
		getVenueConfig,
		getVenueAreas,
		getAllVenues,
		venueConfig
	};
})(typeof window !== 'undefined' ? window : this);
