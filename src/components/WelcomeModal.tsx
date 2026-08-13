import React, { useMemo, useState } from 'react';

interface WelcomeModalProps {
  onSelectRegion: (region: string) => void;
}

const RegionMarker = ({ top, left, label, onClick }: { key?: React.Key; top: string, left: string, label: string, onClick: () => void }) => (
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

const regions = [
  { label: 'North', points: '55,8 74,10 77,26 70,34 56,31 51,20', marker: ['21%', '62%'] },
  { label: 'North West', points: '31,15 52,20 56,31 47,45 27,42 23,29', marker: ['30%', '40%'] },
  { label: 'West', points: '21,42 47,45 44,60 29,72 16,65 14,51', marker: ['60%', '35%'] },
  { label: 'Geelong', points: '12,65 29,72 30,87 14,92 4,84 6,73', marker: ['84%', '18%'] },
  { label: 'South East', points: '63,55 86,62 96,77 93,89 73,86 67,72 56,67', marker: ['77%', '81%'] },
] as const;

const mapBounds = [
  '144.102,-38.332,145.475,-37.400',
  '144.330,-38.120,145.280,-37.530',
  '144.550,-38.020,145.120,-37.650',
] as const;

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onSelectRegion }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const mapUrl = useMemo(
    () => `https://www.openstreetmap.org/export/embed.html?bbox=${mapBounds[zoomLevel]}&layer=mapnik`,
    [zoomLevel],
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100 max-w-5xl w-full flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in duration-300 h-[min(560px,calc(100svh-48px))] min-h-[430px]">
        
        {/* Left Side - Text Content */}
        <div className="w-full md:w-[45%] px-8 py-7 md:px-11 md:py-9 flex flex-col items-center justify-center text-center bg-white z-20 shadow-xl">
          <h1 className="text-4xl md:text-5xl font-light text-[#1B3635] mb-4 tracking-wide">WELCOME</h1>
          <p className="text-gray-600 leading-relaxed mb-6 text-base md:text-lg">
            Start building your dream home with Mimosa Homes today. Explore our V-Collection and customize your house to suit your needs. Create a personalized quote and let us help you bring your dream home to life.
          </p>
          <p className="text-[#1B3635] font-semibold text-base md:text-lg">
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
            src={mapUrl}
            style={{ border: 0, filter: 'grayscale(100%) opacity(0.5) contrast(1.2)' }}
            title="Map of Victoria Regions"
            className="absolute inset-0 pointer-events-none"
          ></iframe>
          
          {/* Teal tint preserves the application's existing colour palette. */}
          <div className="absolute inset-0 bg-[#1B3635]/20 mix-blend-color pointer-events-none"></div>

          <div className="absolute right-3 top-3 z-30 overflow-hidden rounded-lg border border-[#1B3635]/20 bg-white shadow-lg">
            <button
              type="button"
              aria-label="Zoom in on map"
              disabled={zoomLevel === mapBounds.length - 1}
              onClick={() => setZoomLevel((level) => Math.min(level + 1, mapBounds.length - 1))}
              className="grid h-10 w-10 place-items-center text-2xl font-semibold text-[#1B3635] transition hover:bg-[#1B3635] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              +
            </button>
            <div className="mx-2 border-t border-[#1B3635]/15" />
            <button
              type="button"
              aria-label="Zoom out on map"
              disabled={zoomLevel === 0}
              onClick={() => setZoomLevel((level) => Math.max(level - 1, 0))}
              className="grid h-10 w-10 place-items-center text-2xl font-semibold text-[#1B3635] transition hover:bg-[#1B3635] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>
          </div>

          {/* Clickable build-area boundaries. The fill is deliberately subtle so the map remains readable. */}
          <div className="absolute inset-0">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-label="Choose a build region">
              {regions.map((region) => (
                <polygon
                  key={region.label}
                  points={region.points}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${region.label} region`}
                  onClick={() => onSelectRegion(region.label)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') onSelectRegion(region.label);
                  }}
                  className="cursor-pointer fill-[#1B3635]/25 stroke-[#C5A267] stroke-[0.45] transition-all duration-200 hover:fill-[#C5A267]/45 hover:stroke-white focus:outline-none"
                />
              ))}
            </svg>
            {regions.map((region) => (
              <RegionMarker
                key={region.label}
                top={region.marker[0]}
                left={region.marker[1]}
                label={region.label}
                onClick={() => onSelectRegion(region.label)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default WelcomeModal;
