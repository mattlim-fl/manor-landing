
import React from 'react';

const NewsletterSection: React.FC = () => {
  return (
    <div className="bg-manor-black py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="manor-heading text-3xl text-manor-white mb-8">
          STAY IN TOUCH
        </h2>
        <p className="text-manor-white mb-8">
          Subscribe to newsletter to be the first to receive updates and information on the latest from Manor & Peruke
        </p>
        <div className="flex max-w-md mx-auto">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 px-4 py-3 bg-manor-white text-manor-black"
          />
          <button className="bg-manor-white text-manor-black px-8 py-3 font-medium hover:bg-manor-gold transition-colors">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
