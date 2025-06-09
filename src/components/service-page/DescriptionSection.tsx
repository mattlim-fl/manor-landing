
import React from 'react';

interface DescriptionSectionProps {
  description: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  description
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <p className="text-xl text-manor-black leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default DescriptionSection;
