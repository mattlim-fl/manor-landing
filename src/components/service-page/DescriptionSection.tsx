
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
          <Badge className="px-4 py-2 text-sm font-semibold" style={{ backgroundColor: '#F2993B', color: '#060201' }}>
            Main Bar
          </Badge>
          <Badge className="px-4 py-2 text-sm font-semibold" style={{ backgroundColor: '#F2993B', color: '#060201' }}>
            Dance Floor
          </Badge>
          <Badge className="px-4 py-2 text-sm font-semibold" style={{ backgroundColor: '#F2993B', color: '#060201' }}>
            Courtyard
          </Badge>
          <Badge className="px-4 py-2 text-sm font-semibold" style={{ backgroundColor: '#F2993B', color: '#060201' }}>
            Up to 150 People
          </Badge>
        </div>
      </div>
      
      <div className="text-xl leading-relaxed" style={{ color: '#F2993B' }}>
        {description.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < description.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DescriptionSection;
