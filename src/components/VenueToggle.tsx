import { Link, useLocation } from 'react-router-dom';

const venueOptions = [
  { path: '/venue-hire', label: 'Full Venue' },
  { path: '/upstairs', label: 'Upstairs' },
  { path: '/downstairs', label: 'Downstairs' },
];

const VenueToggle = () => {
  const location = useLocation();

  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex rounded-full p-1" style={{ backgroundColor: 'rgba(39, 19, 8, 0.8)' }}>
        {venueOptions.map((option) => {
          const isActive = location.pathname === option.path;
          return (
            <Link
              key={option.path}
              to={option.path}
              className={`
                px-4 py-2 rounded-full text-sm md:text-base font-blur font-bold uppercase tracking-wider
                transition-all duration-300
                ${isActive
                  ? 'bg-manor-coral text-white'
                  : 'text-manor-gold hover:text-white'
                }
              `}
            >
              {option.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default VenueToggle;
