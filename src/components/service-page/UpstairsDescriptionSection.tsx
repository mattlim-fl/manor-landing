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
      backgroundColor: '#261209'
    }}>
      <div className="space-y-6">
        <div className="flex flex-wrap justify-center gap-3">
          <Badge className="px-4 py-2 text-sm font-semibold" style={{
            backgroundColor: '#F2993B',
            color: '#060201',
            border: '1px solid #060201'
          }}>
            Lounge Bar
          </Badge>
          <Badge className="px-4 py-2 text-sm font-semibold" style={{
            backgroundColor: '#F2993B',
            color: '#060201',
            border: '1px solid #060201'
          }}>
            Karaoke Booth
          </Badge>
          <Badge className="px-4 py-2 text-sm font-semibold" style={{
            backgroundColor: '#F2993B',
            color: '#060201',
            border: '1px solid #060201'
          }}>
            Cocktails
          </Badge>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          <Badge className="px-4 py-2 text-lg" style={{
            backgroundColor: '#F2993B',
            color: '#060201',
            border: '1px solid #060201'
          }}>Great for cocktail parties, celebrations, events and corporate functions up to 70 people.</Badge>
        </div>
      </div>
    </div>
  );
};

export default UpstairsDescriptionSection;