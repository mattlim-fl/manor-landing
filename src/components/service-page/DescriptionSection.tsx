import React from 'react';
import { Badge } from '../ui/badge';
interface DescriptionSectionProps {
  description: string;
  customPillText?: string;
}
const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  description,
  customPillText
}) => {
  return <div className="max-w-4xl mx-auto px-4 py-8 text-center" style={{
    backgroundColor: '#261209'
  }}>
      <div className="space-y-6">
        <div className="flex flex-wrap justify-center gap-3">
          <Badge className="px-4 py-2 text-sm font-semibold" style={{
          backgroundColor: '#F2993B',
          color: '#060201',
          border: '1px solid #060201'
        }}>
            Main Bar
          </Badge>
          <Badge className="px-4 py-2 text-sm font-semibold" style={{
          backgroundColor: '#F2993B',
          color: '#060201',
          border: '1px solid #060201'
        }}>
            Dance Floor
          </Badge>
          <Badge className="px-4 py-2 text-sm font-semibold" style={{
          backgroundColor: '#F2993B',
          color: '#060201',
          border: '1px solid #060201'
        }}>
            Courtyard
          </Badge>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          <Badge className="px-4 py-2 text-lg" style={{
          backgroundColor: '#F2993B',
          color: '#060201',
          border: '1px solid #060201'
        }}>{customPillText || 'Great for cocktail parties, celebrations, events and corporate functions up to 150 people.'}</Badge>
        </div>
      </div>
    </div>;
};
export default DescriptionSection;