import React, { useState } from 'react';
import { AppState, Item } from '../../types';
import { QuoteSummary } from '../QuoteSummary';
import { externalColours, internalColours } from '../../data';
import { Search, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

interface Step4ColoursProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step4Colours: React.FC<Step4ColoursProps> = ({ state, updateState, onNext, onBack }) => {
  // We'll use a local state to toggle between external and internal colour selection phases within step 4
  const [phase, setPhase] = useState<'external' | 'internal'>('external');
  const reduceMotion = useReducedMotion();

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
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-6 mb-6 min-h-[600px]">
          <h2 className="text-2xl font-bold text-gray-900 uppercase mb-6">
            {phase === 'external' ? 'EXTERNAL COLOURS SCHEMES' : 'INTERNAL COLOURS SCHEMES'}
          </h2>

          <div className="mb-7 flex items-center gap-2 rounded-xl bg-[#f5f7f6] p-2" role="tablist" aria-label="Colour scheme type">
            {(['external', 'internal'] as const).map((value) => <button key={value} type="button" role="tab" aria-selected={phase === value} onClick={() => setPhase(value)} className={`flex-1 rounded-lg px-4 py-3 text-sm font-bold capitalize transition ${phase === value ? 'bg-[#1B3635] text-white shadow-sm' : 'text-slate-500 hover:text-[#1B3635]'}`}>{value} colours</button>)}
          </div>
          <AnimatePresence mode="wait" initial={false}><motion.div key={phase} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: .24 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentOptions.map((item) => {
              const isSelected = currentSelection?.id === item.id;
              return (
                <div 
                  key={item.id} 
                  onClick={() => handleSelect(item, phase)}
                    className={`border rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${isSelected ? 'border-[#1B3635] ring-2 ring-[#1B3635]' : 'border-gray-200 hover:border-[#C5A267]'}`}
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
          </motion.div></AnimatePresence>

          <div className="mt-8 text-center px-4">
             <p className="text-xs text-gray-400">
              This {phase === 'external' ? 'facade' : 'render'} render is indicative only and is only used to assist in choosing an {phase} colour scheme. Please note this render may depict upgrades.
             </p>
          </div>

          <div className="mt-6 text-xs text-gray-500">
            Press <span className="inline-block mx-1 w-4 h-4 bg-[#1B3635] text-white rounded-full text-center leading-4 text-[10px]">i</span> for more information
          </div>

          <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row">
             <button 
               type="button"
               onClick={() => {
                 if (phase === 'internal') setPhase('external');
                 else onBack();
               }} 
               className="text-sm font-semibold text-[#1B3635] underline underline-offset-4"
             >
               &larr; GO BACK
             </button>
             <button 
               type="button"
               onClick={handleNextAction}
               disabled={!currentSelection}
               className={`inline-flex items-center gap-2 rounded-lg bg-[#1B3635] px-6 py-3 font-bold text-white shadow-lg transition hover:bg-[#142928] disabled:cursor-not-allowed disabled:opacity-45 ${!currentSelection ? 'opacity-50 cursor-not-allowed' : ''}`}
             >
               NEXT STEP <ChevronRight className="h-5 w-5" />
             </button>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-[400px]"><QuoteSummary selections={state.selections} /></div>
    </div>
  );
};

export default Step4Colours;
