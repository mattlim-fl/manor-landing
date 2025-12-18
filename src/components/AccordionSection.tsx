import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionSectionProps {
  items: AccordionItem[];
  className?: string;
}

const AccordionSection = ({ items, className = "" }: AccordionSectionProps) => {
  const [openItems, setOpenItems] = useState<Set<number>>(() => {
    const defaultOpen = new Set<number>();
    items.forEach((item, index) => {
      if (item.defaultOpen) defaultOpen.add(index);
    });
    return defaultOpen;
  });

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className={`w-full ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="border-b" style={{ borderColor: '#D04E2B' }}>
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex items-center justify-between py-4 text-left transition-colors hover:opacity-80"
          >
            <span 
              className="font-blur font-medium text-lg uppercase tracking-wider"
              style={{ color: '#D04E2B' }}
            >
              {item.title}
            </span>
            <span style={{ color: '#E59D50' }}>
              {openItems.has(index) ? (
                <Minus size={20} />
              ) : (
                <Plus size={20} />
              )}
            </span>
          </button>
          
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openItems.has(index) ? 'max-h-96 pb-4' : 'max-h-0'
            }`}
          >
            <div 
              className="text-sm leading-relaxed font-acumin"
              style={{ color: '#E59D50' }}
            >
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionSection;

