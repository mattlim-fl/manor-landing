import React from 'react';
import { Badge } from '../ui/badge';

interface DescriptionSectionProps {
  description: string;
}

const UpstairsDescriptionSection: React.FC<DescriptionSectionProps> = ({
  description
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center" style={{
      backgroundColor: '#271308'
    }}>
      <div className="space-y-6">
        <div className="flex flex-wrap justify-center gap-3">
          <Badge className="pill pill-flame text-sm font-semibold">
            Lounge Bar
          </Badge>
          <Badge className="pill pill-flame text-sm font-semibold">
            Karaoke Booth
          </Badge>
          <Badge className="pill pill-flame text-sm font-semibold">
            Cocktails
          </Badge>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          <Badge className="px-4 py-2 text-lg" style={{
            backgroundColor: '#D04E2B',
            color: '#060201',
            border: '1px solid #060201'
          }}>Great for cocktail parties, celebrations, events and corporate functions up to 70 people.</Badge>
        </div>
      </div>
    </div>
  );
};

export default UpstairsDescriptionSection;