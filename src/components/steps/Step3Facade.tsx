import React, { useRef } from 'react';
import { AppState, Item } from '../../types';
import { QuoteSummary } from '../QuoteSummary';
import { facades } from '../../data';
import { Search, ChevronRight, ChevronLeft } from 'lucide-react';

interface Step3FacadeProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step3Facade: React.FC<Step3FacadeProps> = ({ state, updateState, onNext, onBack }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.6; // Scroll by about one card width
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSelect = (facade: Item) => {
    updateState({ 
      selections: { ...state.selections, facade } 
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
          <h2 className="text-2xl font-bold text-gray-900 uppercase mb-6">FACADES</h2>

          {/* Facade Carousel */}
          <div className="relative flex items-center mb-8">
            <button 
              onClick={() => scroll('left')}
              className="absolute left-[-20px] z-10 w-10 h-10 bg-[#1B3635] rounded-full flex items-center justify-center text-white shadow hover:bg-[#142928] transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div 
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto w-full px-8 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {facades.map((facade) => {
                const isSelected = state.selections.facade?.id === facade.id;
                return (
                  <div key={facade.id} className={`min-w-[60%] snap-center flex-shrink-0 border-2 rounded-lg flex flex-col overflow-hidden transition-all ${isSelected ? 'border-[#1B3635] ring-2 ring-[#1B3635]' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="relative h-64 bg-gray-100">
                      <img src={facade.image} alt={facade.name} className="w-full h-full object-cover" />
                      <div className="absolute top-4 left-4 bg-[#1B3635] w-8 h-8 rounded-full flex items-center justify-center text-white cursor-pointer z-10 shadow">
                        <Search className="w-4 h-4" />
                      </div>
                      <button 
                        onClick={() => handleSelect(facade)}
                        className={`absolute top-4 right-4 px-4 py-1 rounded text-xs font-bold uppercase shadow-sm border ${isSelected ? 'bg-white text-gray-800 border-gray-300' : 'bg-[#1B3635] text-white border-[#1B3635] hover:bg-[#142928]'}`}
                      >
                        {isSelected ? 'UNSELECT' : 'SELECT'}
                      </button>
                    </div>
                    <div className={`p-4 flex justify-between items-center text-white font-bold text-xl ${isSelected ? 'bg-[#1B3635]' : 'bg-gray-400'}`}>
                      <span>{facade.name}</span>
                      <span>{facade.price > 0 ? `+ ${formatPrice(facade.price)}` : 'Included'}</span>
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

          <p className="text-xs text-gray-400 text-center max-w-2xl mx-auto mb-12">
            This facade render is indicative only. Please note this render may depict upgrades. Driveways, landscaping, blinds and fencing are not included and can be added as an upgrade.
          </p>

          {/* Bottom Actions */}
          <div className="flex items-center justify-center relative">
             <button onClick={onBack} className="absolute left-1/2 -ml-24 text-[#1B3635] hover:underline text-sm uppercase">
               &lt; GO BACK
             </button>
             <button 
               onClick={onNext}
               disabled={!state.selections.facade}
               className={`bg-[#1B3635] hover:bg-[#142928] text-white rounded-xl px-6 py-4 font-bold shadow-lg shadow-teal-900/20 flex items-center gap-2 transition-colors z-10 ${!state.selections.facade ? 'opacity-50 cursor-not-allowed' : ''}`}
             >
               NEXT STEP <ChevronRight className="w-5 h-5 text-[#1B3635]" />
             </button>
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

export default Step3Facade;
