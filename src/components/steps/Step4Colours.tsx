import React, { useState } from 'react';
import { AppState, Item } from '../../types';
import { QuoteSummary } from '../QuoteSummary';
import { externalColours, internalColours } from '../../data';
import { Search, ChevronRight } from 'lucide-react';

interface Step4ColoursProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step4Colours: React.FC<Step4ColoursProps> = ({ state, updateState, onNext, onBack }) => {
  // We'll use a local state to toggle between external and internal colour selection phases within step 4
  const [phase, setPhase] = useState<'external' | 'internal'>('external');

  const handleSelect = (item: Item, type: 'external' | 'internal') => {
    if (type === 'external') {
      updateState({ selections: { ...state.selections, externalColour: item } });
    } else {
      updateState({ selections: { ...state.selections, internalColour: item } });
    }
  };

  const handleNextAction = () => {
    if (phase === 'external') {
      setPhase('internal');
    } else {
      onNext();
    }
  };

  const formatPrice = (price: number) => {
    return price > 0 ? `+ $${price}` : 'Included';
  };

  const currentOptions = phase === 'external' ? externalColours : internalColours;
  const currentSelection = phase === 'external' ? state.selections.externalColour : state.selections.internalColour;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-4">
      <div className="flex-1">
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-6 mb-6 pb-24 relative min-h-[600px]">
          <h2 className="text-2xl font-bold text-gray-900 uppercase mb-6">
            {phase === 'external' ? 'EXTERNAL COLOURS SCHEMES' : 'INTERNAL COLOURS SCHEMES'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentOptions.map((item) => {
              const isSelected = currentSelection?.id === item.id;
              return (
                <div 
                  key={item.id} 
                  onClick={() => handleSelect(item, phase)}
                  className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${isSelected ? 'border-[#1B3635] ring-2 ring-[#1B3635]' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="relative h-40 bg-gray-100">
                    {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                    <div className="absolute top-2 left-2 bg-[#1B3635] w-6 h-6 rounded-full flex items-center justify-center text-white shadow">
                      <Search className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="p-3 bg-white flex justify-between items-center text-sm font-bold">
                    <span className="flex items-center gap-1 text-gray-700">
                      {item.name} <span className="w-4 h-4 bg-[#1B3635] text-white rounded-full text-center leading-4 text-[10px] cursor-help" title="Info">i</span>
                    </span>
                    <span className="text-[#1B3635]">{formatPrice(item.price)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center px-4">
             <p className="text-xs text-gray-400">
              This {phase === 'external' ? 'facade' : 'render'} render is indicative only and is only used to assist in choosing an {phase} colour scheme. Please note this render may depict upgrades.
             </p>
          </div>

          <div className="absolute bottom-6 left-6 text-xs text-gray-500">
            Press <span className="inline-block mx-1 w-4 h-4 bg-[#1B3635] text-white rounded-full text-center leading-4 text-[10px]">i</span> for more information
          </div>

          {/* Bottom Actions */}
          <div className="absolute bottom-6 inset-x-0 flex items-center justify-center">
             <button 
               onClick={() => {
                 if (phase === 'internal') setPhase('external');
                 else onBack();
               }} 
               className="absolute left-1/2 -ml-24 text-[#1B3635] hover:underline text-sm uppercase"
             >
               &lt; GO BACK
             </button>
             <button 
               onClick={handleNextAction}
               disabled={!currentSelection}
               className={`bg-[#1B3635] hover:bg-[#142928] text-white rounded-xl px-6 py-4 font-bold shadow-lg shadow-teal-900/20 flex items-center gap-2 transition-colors z-10 ${!currentSelection ? 'opacity-50 cursor-not-allowed' : ''}`}
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

export default Step4Colours;
