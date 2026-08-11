import React, { useState } from 'react';
import { AppState, Item } from '../../types';
import { QuoteSummary } from '../QuoteSummary';
import { upgrades } from '../../data';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface Step5UpgradesProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step5Upgrades: React.FC<Step5UpgradesProps> = ({ state, updateState, onNext, onBack }) => {
  const categories = Object.keys(upgrades);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  const handleSelectUpgrade = (upgrade: Item) => {
    // Only one upgrade per category for this simple logic
    updateState({
      selections: {
        ...state.selections,
        upgrades: {
          ...state.selections.upgrades,
          [activeCategory]: upgrade
        }
      }
    });
  };

  const formatPrice = (price: number) => {
    return price > 0 ? `+ $${price.toLocaleString()}` : 'Included';
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-4">
      <div className="flex-1">
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-6 mb-6 pb-24 relative min-h-[600px] flex gap-6">
          
          {/* Sidebar */}
          <div className="w-64 flex flex-col h-[500px]">
             <h2 className="text-xl font-bold text-gray-900 uppercase mb-4">UPGRADES</h2>
             <div className="flex-1 bg-gray-50 rounded p-2 overflow-y-auto border border-gray-100">
               <ul className="space-y-1">
                 {categories.map((cat) => (
                   <li key={cat}>
                     <button 
                       onClick={() => setActiveCategory(cat)}
                       className={`w-full text-left px-3 py-2 rounded text-sm transition-colors flex justify-between items-center ${activeCategory === cat ? 'bg-gray-200 font-bold text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}
                     >
                       {cat}
                       <ChevronDown className="w-4 h-4 text-gray-400" />
                     </button>
                   </li>
                 ))}
                 {/* Dummy categories to match visual */}
                 {['Garage Door', 'Brick In Fills', 'Heating & Cooling', 'Kitchen', 'Bathroom', 'Ensuite', 'Laundry'].map(cat => (
                    <li key={cat}>
                      <button className="w-full text-left px-3 py-2 rounded text-sm text-gray-600 hover:bg-gray-100 flex justify-between items-center">
                        {cat}
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </button>
                    </li>
                 ))}
               </ul>
             </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 pt-10">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {upgrades[activeCategory]?.map((item) => {
                  const isSelected = state.selections.upgrades[activeCategory]?.id === item.id;
                  
                  return (
                    <div 
                      key={item.id} 
                      onClick={() => handleSelectUpgrade(item)}
                      className={`border rounded-lg overflow-hidden cursor-pointer transition-all flex flex-col h-[280px] ${isSelected ? 'border-[#1B3635] ring-2 ring-[#1B3635]' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="relative flex-1 bg-white flex items-center justify-center p-4">
                        <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className={`p-3 flex justify-between items-center text-xs font-bold text-white transition-colors ${isSelected ? 'bg-[#1B3635]' : 'bg-white text-gray-600 border-t border-gray-100'}`}>
                        <span className="flex-1 pr-2 leading-snug">{item.name}</span>
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          {isSelected && <span className="w-4 h-4 bg-white text-[#1B3635] rounded-full text-center leading-4 text-[10px] font-bold block">i</span>}
                          {!isSelected && <span className="w-4 h-4 bg-[#1B3635] text-white rounded-full text-center leading-4 text-[10px] font-bold block">i</span>}
                          <span className={isSelected ? 'text-white' : 'text-[#1B3635]'}>{formatPrice(item.price)}</span>
                        </div>
                      </div>
                    </div>
                  );
               })}
             </div>
          </div>

          <div className="absolute bottom-6 left-6 text-xs text-gray-500">
            Press <span className="inline-block mx-1 w-4 h-4 bg-[#1B3635] text-white rounded-full text-center leading-4 text-[10px]">i</span> for more information
          </div>

          {/* Bottom Actions */}
          <div className="absolute bottom-6 inset-x-0 flex items-center justify-center">
             <button onClick={onBack} className="absolute left-1/2 -ml-24 text-[#1B3635] hover:underline text-sm uppercase">
               &lt; GO BACK
             </button>
             <button 
               onClick={onNext}
               className="bg-[#1B3635] hover:bg-[#142928] text-white rounded-xl px-6 py-4 font-bold shadow-lg shadow-teal-900/20 flex items-center gap-2 transition-colors z-10"
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

export default Step5Upgrades;
