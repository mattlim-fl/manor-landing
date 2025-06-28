
import React from 'react';
import { Badge } from '../ui/badge';

interface DescriptionSectionProps {
  description: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  description
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center bg-manor-black">
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Badge className="bg-manor-gold text-manor-black px-4 py-2 text-sm font-semibold">
            Main Bar
          </Badge>
          <Badge className="bg-manor-gold text-manor-black px-4 py-2 text-sm font-semibold">
            Dance Floor
          </Badge>
          <Badge className="bg-manor-gold text-manor-black px-4 py-2 text-sm font-semibold">
            Courtyard
          </Badge>
          <Badge className="bg-manor-gold text-manor-black px-4 py-2 text-sm font-semibold">
            Up to 150 People
          </Badge>
        </div>
      </div>
      
      <div className="text-xl leading-relaxed text-manor-white">
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
