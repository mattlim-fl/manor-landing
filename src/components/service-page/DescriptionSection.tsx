
import React from 'react';

interface DescriptionSectionProps {
  description: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  description
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center" style={{ backgroundColor: '#2A1205' }}>
      <div className="text-xl leading-relaxed" style={{ color: '#FFFFFF' }}>
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
