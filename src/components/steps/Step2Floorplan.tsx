import React, { useRef } from 'react';
import { AppState, Item } from '../../types';
import { QuoteSummary } from '../QuoteSummary';
import { floorplans } from '../../data';
import { Search, ChevronRight, ChevronLeft, Bed, Bath, Car, ArrowLeftRight } from 'lucide-react';

interface Step2FloorplanProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step2Floorplan: React.FC<Step2FloorplanProps> = ({ state, updateState, onNext, onBack }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8; // Scroll by about one card width
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSelect = (floorplan: Item) => {
    updateState({ 
      selections: { ...state.selections, floorplan } 
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-4">
      <div className="flex-1">
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 uppercase">FLOORPLANS</h2>
            <div className="flex flex-wrap gap-4 items-end">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Width selected:</label>
                <select className="border border-gray-300 rounded px-2 py-1 text-sm outline-none">
                  <option>10.5</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Depth selected:</label>
                <select className="border border-gray-300 rounded px-2 py-1 text-sm outline-none">
                  <option>25</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Storeys selected:</label>
                <select className="border border-gray-300 rounded px-2 py-1 text-sm outline-none">
                  <option>Single</option>
                </select>
              </div>
              <button className="bg-[#333333] text-white px-3 py-1 text-xs font-bold rounded hover:bg-black transition-colors">
                CHANGE
              </button>
            </div>
          </div>

          {/* Floorplan Cards List/Carousel */}
          <div className="relative flex items-center mb-8">
            <button 
              onClick={() => scroll('left')}
              className="absolute left-[-20px] z-10 w-10 h-10 bg-[#1B3635] rounded-full flex items-center justify-center text-white shadow hover:bg-[#142928] transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div 
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto w-full px-8 pb-4 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {floorplans.map((fp) => {
                const isSelected = state.selections.floorplan?.id === fp.id;
                return (
                  <div key={fp.id} className={`min-w-[400px] snap-center flex-shrink-0 border-2 rounded-lg flex flex-col overflow-hidden transition-all ${isSelected ? 'border-[#1B3635] ring-1 ring-[#1B3635]' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="p-4 flex-1 flex">
                    <div className="w-1/2 relative pr-4">
                      <div className="absolute top-0 left-0 bg-[#1B3635] w-8 h-8 rounded-full flex items-center justify-center text-white cursor-pointer z-10">
                        <Search className="w-4 h-4" />
                      </div>
                      <img src={fp.image} alt={fp.name} className="w-full h-auto object-contain mix-blend-multiply opacity-80 mt-8" />
                      <div className="absolute bottom-0 inset-x-0 flex justify-center text-[#1B3635]">
                         <ArrowLeftRight className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="w-1/2 flex flex-col items-center">
                      <button 
                        onClick={() => handleSelect(fp)}
                        className={`w-full py-2 rounded text-sm font-bold uppercase mb-4 transition-colors ${isSelected ? 'bg-[#1B3635] text-white' : 'bg-[#1B3635] text-white hover:bg-[#142928]'}`}
                      >
                        {isSelected ? 'UNSELECT' : 'SELECT'}
                      </button>
                      <h3 className="text-xl font-bold uppercase text-gray-900 mb-1">{fp.name}</h3>
                      <a href="#" className="text-[#1B3635] text-sm underline mb-2">View Floorplan</a>
                      <button className="bg-[#1B3635] text-white text-[10px] font-bold uppercase px-3 py-1 rounded mb-6">INCLUSIONS</button>
                      
                      <div className="flex flex-col gap-2 mb-6 items-end w-2/3 border-b border-gray-200 pb-4">
                        <div className="flex items-center gap-2 text-[#1B3635] font-bold text-lg"><Bed className="w-5 h-5" /> {fp.details?.beds}</div>
                        <div className="flex items-center gap-2 text-[#1B3635] font-bold text-lg"><Bath className="w-5 h-5" /> {fp.details?.baths}</div>
                        <div className="flex items-center gap-2 text-[#1B3635] font-bold text-lg"><Car className="w-5 h-5" /> {fp.details?.cars}</div>
                      </div>

                      <div className="text-[10px] text-gray-500 text-right w-full pr-4 space-y-1">
                        <div>Min Frontage: <span className="text-[#1B3635] font-bold">{fp.details?.minFrontage}</span></div>
                        <div>Min Depth: <span className="text-[#1B3635] font-bold">{fp.details?.minDepth}</span></div>
                        <div>Total Area: <span className="text-[#1B3635] font-bold">{fp.details?.totalArea}</span></div>
                      </div>
                    </div>
                  </div>
                  <div className={`py-3 text-center text-white font-bold text-xl ${isSelected ? 'bg-[#1B3635]' : 'bg-gray-400'}`}>
                    {formatPrice(fp.price)}
                  </div>
                </div>
              );
            })}
            </div>

            <button 
              onClick={() => scroll('right')}
              className="absolute right-[-20px] z-10 w-10 h-10 bg-[#1B3635] rounded-full flex items-center justify-center text-white shadow hover:bg-[#142928] transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-center mt-12 relative">
             <button onClick={onBack} className="absolute left-1/2 -ml-24 text-[#1B3635] hover:underline text-sm uppercase">
               &lt; GO BACK
             </button>
             <button 
               onClick={onNext}
               disabled={!state.selections.floorplan}
               className={`bg-[#1B3635] hover:bg-[#142928] text-white rounded-xl px-6 py-4 font-bold shadow-lg shadow-teal-900/20 flex items-center gap-2 transition-colors z-10 ${!state.selections.floorplan ? 'opacity-50 cursor-not-allowed' : ''}`}
             >
               NEXT STEP <ChevronRight className="w-5 h-5 text-[#1B3635]" />
             </button>
             {state.selections.floorplan && (
               <div className="absolute top-[-30px] right-1/2 -mr-32 bg-[#1B3635] text-white text-xs px-3 py-1 rounded animate-pulse">
                 To continue building your quote, please press this button
                 <div className="absolute -bottom-1 right-12 w-2 h-2 bg-[#1B3635] rotate-45"></div>
               </div>
             )}
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-[400px]">
        <QuoteSummary selections={state.selections} />
        <div className="mt-4 flex flex-col items-end gap-2 text-right">
          <p className="text-xs text-gray-500">Already have an account? <a href="#" className="text-gray-800 underline">Sign In</a></p>
          <button className="w-full bg-[#1B3635] hover:bg-[#142928] text-white py-4 rounded-xl font-bold shadow-lg shadow-teal-900/20 uppercase transition-colors">
            CREATE AN ACCOUNT
          </button>
          <button className="bg-[#1B3635] hover:bg-[#142928] text-white text-xs px-4 py-2 rounded uppercase font-bold mt-2">
            RESTART QUOTE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2Floorplan;
