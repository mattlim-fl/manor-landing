import React from 'react';
import { Badge } from '../ui/badge';
interface DescriptionSectionProps {
  description: string;
}
const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  description
}) => {
   return <div className="max-w-4xl mx-auto px-4 py-8 text-center" style={{
    backgroundColor: '#271308'
  }}>
      <div className="space-y-6">
        <div className="flex flex-wrap justify-center gap-3">
          <Badge className="px-4 py-2 text-sm font-semibold" style={{
          backgroundColor: '#D04E2B',
          color: '#271308',
          border: '1px solid #6A2A00',
          boxShadow: '0 0 0 2px #271308'
        }}>
            Main Bar
          </Badge>
          <Badge className="px-4 py-2 text-sm font-semibold" style={{
          backgroundColor: '#D04E2B',
          color: '#271308',
          border: '1px solid #6A2A00',
          boxShadow: '0 0 0 2px #271308'
        }}>
            Dance Floor
          </Badge>
          <Badge className="px-4 py-2 text-sm font-semibold" style={{
          backgroundColor: '#D04E2B',
          color: '#271308',
          border: '1px solid #6A2A00',
          boxShadow: '0 0 0 2px #271308'
        }}>
            Courtyard
          </Badge>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          <Badge className="px-4 py-2 text-lg" style={{
          backgroundColor: '#D04E2B',
          color: '#271308',
          border: '1px solid #6A2A00',
          boxShadow: '0 0 0 2px #271308'
        }}>Great for cocktail parties, celebrations, events and corporate functions up to 150 people.</Badge>
        </div>
      </div>
    </div>;
};
export default DescriptionSection;