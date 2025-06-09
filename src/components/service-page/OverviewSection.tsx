
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="manor-heading text-3xl text-manor-black mb-8">OVERVIEW</h2>
      <div className="space-y-4">
        {accordionItems.map((item, index) => (
          <div key={index} className="border-b border-manor-gray">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center py-6 text-left hover:text-manor-gold transition-colors"
            >
              <span className="text-xl font-medium text-manor-black">
                {item.title}
              </span>
              {expandedAccordion === index ? (
                <Minus size={24} className="text-manor-black" />
              ) : (
                <Plus size={24} className="text-manor-black" />
              )}
            </button>
            {expandedAccordion === index && (
              <div className="pb-6 text-manor-black leading-relaxed">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewSection;
