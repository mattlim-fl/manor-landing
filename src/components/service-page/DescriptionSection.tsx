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
          <Badge className="px-4 py-2 text-sm font-medium" style={{
          backgroundColor: '#D04E2B',
          color: '#271308',
          border: '1px solid #6A2A00',
          boxShadow: '0 0 0 2px #271308'
        }}>
            Main Bar
          </Badge>
          <Badge className="px-4 py-2 text-sm font-medium" style={{
          backgroundColor: '#D04E2B',
          color: '#271308',
          border: '1px solid #6A2A00',
          boxShadow: '0 0 0 2px #271308'
        }}>
            Dance Floor
          </Badge>
          <Badge className="px-4 py-2 text-sm font-medium" style={{
          backgroundColor: '#D04E2B',
          color: '#271308',
          border: '1px solid #6A2A00',
          boxShadow: '0 0 0 2px #271308'
        }}>
            Courtyard
          </Badge>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          <div className="rounded-2xl px-6 py-4 border-2" style={{
            backgroundColor: '#271308',
            color: '#E59D50',
            borderColor: '#E59D50'
          }}>
            <p className="text-base md:text-lg font-medium">Great for cocktail parties, celebrations, events and corporate functions up to 150 people.</p>
          </div>
        </div>
      </div>
    </div>;
};
export default DescriptionSection;