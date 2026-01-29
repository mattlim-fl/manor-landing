import React from 'react';
import { Badge } from '../ui/badge';

interface DescriptionSectionProps {
  description: string;
  badges?: string[];
  capacity?: number;
}

// Default configurations for different venue areas
const VENUE_CONFIGS = {
  downstairs: {
    badges: ['Main Bar', 'Dance Floor', 'Courtyard'],
    capacity: 150,
  },
  upstairs: {
    badges: ['Lounge Bar', 'Karaoke Booth', 'Cocktails'],
    capacity: 70,
  },
  full_venue: {
    badges: ['Main Bar', 'Dance Floor', 'Courtyard', 'Cocktails', 'Karaoke Booth'],
    capacity: 250,
  },
} as const;

type VenueArea = keyof typeof VENUE_CONFIGS;

interface ConfigurableDescriptionSectionProps {
  venueArea?: VenueArea;
  badges?: string[];
  capacity?: number;
}

const DescriptionSection: React.FC<DescriptionSectionProps & ConfigurableDescriptionSectionProps> = ({
  description,
  venueArea = 'downstairs',
  badges,
  capacity,
}) => {
  const config = VENUE_CONFIGS[venueArea];
  const displayBadges = badges ?? config.badges;
  const displayCapacity = capacity ?? config.capacity;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center bg-manor-brown">
      <div className="space-y-6">
        <div className="flex flex-wrap justify-center gap-3">
          {displayBadges.map((badge) => (
            <Badge
              key={badge}
              className="px-4 py-2 text-sm font-medium bg-manor-coral text-manor-brown border border-manor-brown"
            >
              {badge}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <div className="rounded-2xl px-6 py-4 border-2 bg-manor-brown text-manor-gold border-manor-gold">
            <p className="text-base md:text-lg font-medium">
              Great for cocktail parties, celebrations, events and corporate functions up to {displayCapacity} people.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionSection;
