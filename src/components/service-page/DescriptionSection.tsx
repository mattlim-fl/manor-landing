
import React from 'react';
import { Badge } from '../ui/badge';

interface DescriptionSectionProps {
  description: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  description
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center" style={{ backgroundColor: '#2A1205' }}>
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Badge className="px-4 py-2 text-sm font-semibold" style={{ backgroundColor: '#060201', color: '#F2993B', border: '1px solid #F2993B' }}>
            Main Bar
          </Badge>
          <Badge className="px-4 py-2 text-sm font-semibold" style={{ backgroundColor: '#060201', color: '#F2993B', border: '1px solid #F2993B' }}>
            Dance Floor
          </Badge>
          <Badge className="px-4 py-2 text-sm font-semibold" style={{ backgroundColor: '#060201', color: '#F2993B', border: '1px solid #F2993B' }}>
            Courtyard
          </Badge>
          <Badge className="px-4 py-2 text-sm font-semibold" style={{ backgroundColor: '#060201', color: '#F2993B', border: '1px solid #F2993B' }}>
            Up to 150 People
          </Badge>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        <Badge className="px-4 py-2 text-lg" style={{ backgroundColor: '#060201', color: '#F2993B', border: '1px solid #F2993B' }}>
          Featuring the main bar, dance floor and courtyard.
        </Badge>
        <Badge className="px-4 py-2 text-lg" style={{ backgroundColor: '#060201', color: '#F2993B', border: '1px solid #F2993B' }}>
          Great for cocktail parties, celebrations, events and corporate functions up to 150 people.
        </Badge>
      </div>
    </div>
  );
};

export default DescriptionSection;
