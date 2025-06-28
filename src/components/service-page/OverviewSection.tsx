

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface AccordionItem {
  title: string;
  content: string;
}

interface OverviewSectionProps {
  accordionItems: AccordionItem[];
}

const OverviewSection: React.FC<OverviewSectionProps> = ({
  accordionItems
}) => {
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setExpandedAccordion(expandedAccordion === index ? null : index);
  };

  const renderContent = (content: string) => {
    // Split content by newlines and render each line
    const lines = content.split('\n');
    return lines.map((line, index) => (
      <div key={index} className="mb-1">
        {line}
      </div>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <h2 className="manor-heading text-3xl mb-8" style={{ color: '#F2993B' }}>DETAILS</h2>
      <div className="space-y-4">
        {accordionItems.map((item, index) => (
          <div key={index} className="border-b" style={{ borderColor: '#060201' }}>
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center py-6 text-left transition-colors"
              style={{ color: '#F2993B' }}
            >
              <span className="text-xl font-medium">
                {item.title}
              </span>
              {expandedAccordion === index ? (
                <Minus size={24} style={{ color: '#F2993B' }} />
              ) : (
                <Plus size={24} style={{ color: '#F2993B' }} />
              )}
            </button>
            {expandedAccordion === index && (
              <div className="pb-6 leading-relaxed" style={{ color: '#F2993B' }}>
                {renderContent(item.content)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewSection;
