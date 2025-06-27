
import Header from '../components/Header';

const Karaoke = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2A1205', color: '#FFFFFF' }}>
      <Header />
      
      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col">
        <div className="flex-1 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0" style={{ backgroundColor: '#2A1205' }} />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
            <div className="pt-20 pb-8">
              <h1 className="manor-heading text-6xl md:text-8xl lg:text-9xl mb-6 animate-fade-in" style={{ color: '#E14116' }}>
                <div>KARAOKE</div>
                <div>BOOTHS</div>
              </h1>
              <div className="space-y-4 mb-12 animate-fade-in">
                <div 
                  className="inline-block font-bold px-4 py-2 rounded-full uppercase tracking-wider text-sm"
                  style={{ 
                    backgroundColor: '#F2993B', 
                    color: '#060201'
                  }}
                >
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Karaoke;
