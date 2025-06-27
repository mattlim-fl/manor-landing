
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Services = () => {
  return (
    <div className="min-h-screen text-manor-white" style={{ backgroundColor: '#2A1205' }}>
      <Header />
      
      {/* Services Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center">
        {/* Background */}
        <div className="absolute inset-0" style={{ backgroundColor: '#2A1205' }} />
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="manor-heading text-6xl md:text-8xl mb-12 animate-fade-in" style={{ color: '#E14116' }}>
            VENUE HIRE
          </h1>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 animate-fade-in">
            {/* Downstairs */}
            <div className="relative group overflow-hidden rounded-lg min-h-[500px] min-w-[350px] flex flex-col">
              <div 
                className="h-96 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col justify-between text-center px-12 py-8">
                <div className="flex-1 flex flex-col justify-center">
                  <h2 className="manor-heading text-4xl mb-6" style={{ color: '#E14116' }}>
                    DOWNSTAIRS
                  </h2>
                  <p className="text-lg mb-8 text-manor-white leading-relaxed max-w-lg mx-auto">
                    Hire our intimate downstairs area with main bar, dancefloor, and terrace access for up to 80 people.
                  </p>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
                  <Link 
                    to="/downstairs#booking-container"
                    className="font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center whitespace-nowrap"
                    style={{ 
                      backgroundColor: '#F2993B', 
                      color: '#060201',
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      borderColor: '#F2993B'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#060201';
                      e.currentTarget.style.color = '#F2993B';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#F2993B';
                      e.currentTarget.style.color = '#060201';
                    }}
                  >
                    BOOK NOW
                  </Link>
                  <Link 
                    to="/downstairs"
                    className="font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center whitespace-nowrap"
                    style={{ 
                      backgroundColor: 'transparent',
                      color: '#F2993B',
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      borderColor: '#F2993B'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F2993B';
                      e.currentTarget.style.color = '#060201';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#F2993B';
                    }}
                  >
                    LEARN MORE
                  </Link>
                </div>
              </div>
            </div>

            {/* Upstairs */}
            <div className="relative group overflow-hidden rounded-lg min-h-[500px] min-w-[350px] flex flex-col">
              <div 
                className="h-96 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col justify-between text-center px-12 py-8">
                <div className="flex-1 flex flex-col justify-center">
                  <h2 className="manor-heading text-4xl mb-6" style={{ color: '#E14116' }}>
                    UPSTAIRS
                  </h2>
                  <p className="text-lg mb-8 text-manor-white leading-relaxed max-w-lg mx-auto">
                    Premium upstairs area with VIP seating, elevated views, and sophisticated atmosphere for up to 60 people.
                  </p>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
                  <Link 
                    to="/upstairs#booking-container"
                    className="font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center whitespace-nowrap"
                    style={{ 
                      backgroundColor: '#F2993B', 
                      color: '#060201',
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      borderColor: '#F2993B'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#060201';
                      e.currentTarget.style.color = '#F2993B';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#F2993B';
                      e.currentTarget.style.color = '#060201';
                    }}
                  >
                    BOOK NOW
                  </Link>
                  <Link 
                    to="/upstairs"
                    className="font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center whitespace-nowrap"
                    style={{ 
                      backgroundColor: 'transparent',
                      color: '#F2993B',
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      borderColor: '#F2993B'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F2993B';
                      e.currentTarget.style.color = '#060201';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#F2993B';
                    }}
                  >
                    LEARN MORE
                  </Link>
                </div>
              </div>
            </div>

            {/* Full Venue */}
            <div className="relative group overflow-hidden rounded-lg min-h-[500px] min-w-[350px] lg:col-span-1 md:col-span-2 flex flex-col">
              <div 
                className="h-96 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col justify-between text-center px-12 py-8">
                <div className="flex-1 flex flex-col justify-center">
                  <h2 className="manor-heading text-4xl mb-6" style={{ color: '#E14116' }}>
                    FULL VENUE
                  </h2>
                  <p className="text-lg mb-8 text-manor-white leading-relaxed max-w-lg mx-auto">
                    Complete exclusive hire of the entire Manor for major events, celebrations, and corporate functions up to 150 people.
                  </p>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
                  <Link 
                    to="/full-venue#booking-container"
                    className="font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center whitespace-nowrap"
                    style={{ 
                      backgroundColor: '#F2993B', 
                      color: '#060201',
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      borderColor: '#F2993B'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#060201';
                      e.currentTarget.style.color = '#F2993B';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#F2993B';
                      e.currentTarget.style.color = '#060201';
                    }}
                  >
                    BOOK NOW
                  </Link>
                  <Link 
                    to="/full-venue"
                    className="font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-all duration-300 text-sm text-center whitespace-nowrap"
                    style={{ 
                      backgroundColor: 'transparent',
                      color: '#F2993B',
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      borderColor: '#F2993B'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F2993B';
                      e.currentTarget.style.color = '#060201';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#F2993B';
                    }}
                  >
                    LEARN MORE
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 animate-fade-in">
            <Link 
              to="/contact" 
              className="font-bold px-6 py-3 rounded-full uppercase tracking-wider transition-all duration-300 text-sm"
              style={{ 
                backgroundColor: 'transparent',
                color: '#F2993B',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: '#F2993B'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F2993B';
                e.currentTarget.style.color = '#060201';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#F2993B';
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
