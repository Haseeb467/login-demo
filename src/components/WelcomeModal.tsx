import React from 'react';

interface WelcomeModalProps {
  onSelectRegion: (region: string) => void;
}

const RegionMarker = ({ top, left, label, onClick }: { top: string, left: string, label: string, onClick: () => void }) => (
  <button 
    onClick={onClick} 
    className="absolute transform -translate-x-1/2 -translate-y-full flex flex-col items-center group z-10"
    style={{ top, left }}
  >
    <div className="bg-white shadow-[0_5px_15px_rgba(0,0,0,0.15)] px-4 py-2 text-sm font-semibold rounded-lg text-[#1B3635] border border-gray-100 group-hover:bg-[#1B3635] group-hover:text-white transition-all scale-100 group-hover:scale-105 origin-bottom">
      {label}
    </div>
    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white group-hover:border-t-[#1B3635] transition-colors shadow-sm"></div>
    {/* Map Pin dot */}
    <div className="w-3 h-3 bg-[#1B3635] rounded-full border-2 border-white shadow-md mt-1 group-hover:bg-[#C5A267] transition-colors"></div>
  </button>
);

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onSelectRegion }) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 max-w-5xl w-full flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in duration-300 h-[600px]">
        
        {/* Left Side - Text Content */}
        <div className="w-full md:w-[45%] p-12 flex flex-col items-center justify-center text-center bg-white z-20 shadow-xl">
          <h1 className="text-5xl font-light text-[#1B3635] mb-6 tracking-wide">WELCOME</h1>
          <p className="text-gray-600 leading-relaxed mb-8 text-lg">
            Start building your dream home with Mimosa Homes today. Explore our V-Collection and customize your house to suit your needs. Create a personalized quote and let us help you bring your dream home to life.
          </p>
          <p className="text-[#1B3635] font-semibold text-lg">
            Begin by choosing your preferred build region
          </p>
        </div>

        {/* Right Side - Real Geographic Map Simulation */}
        <div className="w-full md:w-[55%] relative bg-[#1B3635]">
          {/* OpenStreetMap iframe focused on Melbourne, Victoria, Australia */}
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight={0} 
            marginWidth={0} 
            src="https://www.openstreetmap.org/export/embed.html?bbox=144.102,-38.332,145.475,-37.400&amp;layer=mapnik" 
            style={{ border: 0, filter: 'grayscale(100%) opacity(0.5) contrast(1.2)' }}
            title="Map of Victoria Regions"
            className="absolute inset-0 pointer-events-none"
          ></iframe>
          
          {/* Teal Tint Overlay to match the Professional Polish theme */}
          <div className="absolute inset-0 bg-[#1B3635]/20 mix-blend-color pointer-events-none"></div>

          {/* Overlaid region buttons styled as map pins based on precise relative geographic coordinates */}
          <div className="absolute inset-0">
            <RegionMarker top="22%" left="61%" label="North" onClick={() => onSelectRegion('North')} />
            <RegionMarker top="27%" left="40%" label="North West" onClick={() => onSelectRegion('North West')} />
            <RegionMarker top="54%" left="36%" label="West" onClick={() => onSelectRegion('West')} />
            <RegionMarker top="80%" left="18%" label="Geelong" onClick={() => onSelectRegion('Geelong')} />
            <RegionMarker top="75%" left="80%" label="South East" onClick={() => onSelectRegion('South East')} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default WelcomeModal;
