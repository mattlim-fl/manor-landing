
import React from 'react';

interface GreatForCard {
  title: string;
  description: string;
  image: string;
}

interface GreatForSectionProps {
  greatForCards: GreatForCard[];
}

const GreatForSection: React.FC<GreatForSectionProps> = ({
  greatForCards
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="font-blur font-medium text-3xl text-manor-black mb-12 uppercase tracking-wider">GREAT FOR</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {greatForCards.map((card, index) => (
          <div key={index} className="group">
            <div className="relative overflow-hidden mb-4">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300" />
            </div>
            <h3 className="font-blur font-medium text-xl text-manor-black mb-2 uppercase tracking-wider">
              {card.title}
            </h3>
            <p className="text-manor-black mb-4 leading-relaxed">
              {card.description}
            </p>
            <button className="text-manor-black font-medium uppercase tracking-wide hover:text-manor-gold transition-colors">
              FIND OUT MORE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GreatForSection;
