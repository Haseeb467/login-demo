import React from 'react';
import { AppState } from '../../types';
import { ChevronRight } from 'lucide-react';

interface Step1BuildQuoteProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNext: () => void;
}

const Step1BuildQuote: React.FC<Step1BuildQuoteProps> = ({ state, updateState, onNext }) => {
  const { hasLand, landDetails } = state;

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="w-full bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-6 lg:p-10 relative pb-24">
        <h2 className="text-xl font-bold text-gray-800 uppercase mb-4">DO YOU HAVE LAND?</h2>
        <div className="flex gap-3 mb-8">
          <button 
            onClick={() => updateState({ hasLand: true })}
            className={`px-8 py-3 rounded-xl font-bold transition-colors ${hasLand ? 'bg-[#1B3635] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
          >
            YES
          </button>
          <button 
            onClick={() => updateState({ hasLand: false })}
            className={`px-8 py-3 rounded-xl font-bold transition-colors ${!hasLand ? 'bg-[#1B3635] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
          >
            NO
          </button>
        </div>

        <h3 className="text-[#1B3635] font-bold uppercase mb-6">{hasLand ? 'BUILD YOUR QUOTE' : 'CONTINUE TO BUILD YOUR QUOTE'}</h3>

        {hasLand ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">LOT NUMBER</label>
              <input type="text" placeholder="Type Lot Number" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#1B3635] focus:border-transparent outline-none transition-all text-gray-900" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">ESTATE NAME</label>
              <input type="text" placeholder="Type Estate Name" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#1B3635] focus:border-transparent outline-none transition-all text-gray-900" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">SUBURB</label>
              <input type="text" placeholder="Type Suburb" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#1B3635] focus:border-transparent outline-none transition-all text-gray-900" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">LAND WIDTH</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#1B3635] focus:border-transparent outline-none transition-all text-gray-900 bg-white">
                <option>Please Select</option>
                <option>10.5</option>
                <option>12.5</option>
                <option>14.0</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">LAND DEPTH</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#1B3635] focus:border-transparent outline-none transition-all text-gray-900 bg-white">
                <option>Please Select</option>
                <option>21</option>
                <option>25</option>
                <option>28</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">STOREYS</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#1B3635] focus:border-transparent outline-none transition-all text-gray-900 bg-white">
                <option>Please Select</option>
                <option>Single</option>
                <option>Double</option>
              </select>
            </div>
            <div className="col-span-1 md:col-span-3 mt-4">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                PLEASE PROVIDE ANY RELEVANT LAND DOCUMENTATION
                <span className="inline-block ml-2 w-4 h-4 bg-[#1B3635] text-white rounded-full text-center leading-4 text-[10px] cursor-help" title="Info">i</span>
              </label>
              <div className="flex items-center gap-4">
                <button className="border border-gray-200 text-[#1B3635] rounded-xl px-6 py-3 font-bold hover:bg-gray-50 text-sm hover:bg-gray-50 transition-colors">
                  UPLOAD FILES
                </button>
                <span className="text-gray-400 text-sm">No files currently uploaded</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">PREFERRED BUILD LOCATION</label>
              <input type="text" placeholder="e.g. Suburb or Region" defaultValue="Indiana" className="w-full md:w-2/3 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#1B3635] focus:border-transparent outline-none transition-all text-gray-900" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">LAND WIDTH</label>
              <select className="w-full border border-gray-300 bg-red-50 rounded p-3 text-sm focus:ring-[#1B3635] focus:border-[#1B3635] outline-none">
                <option>10.5</option>
                <option>12.5</option>
                <option>14.0</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">LAND DEPTH</label>
              <select className="w-full border border-gray-300 bg-red-50 rounded p-3 text-sm focus:ring-[#1B3635] focus:border-[#1B3635] outline-none">
                <option>25</option>
                <option>28</option>
                <option>32</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">STOREYS</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#1B3635] focus:border-transparent outline-none transition-all text-gray-900 bg-white">
                <option>Single</option>
                <option>Double</option>
              </select>
            </div>
          </div>
        )}
        
        <div className="absolute bottom-6 right-6 z-20">
          <button 
            onClick={onNext}
            className="bg-[#1B3635] hover:bg-[#142928] text-white rounded-xl px-6 py-4 font-bold shadow-lg shadow-teal-900/20 flex items-center gap-2 transition-colors"
          >
            NEXT STEP <ChevronRight className="w-5 h-5 text-[#1B3635]" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default Step1BuildQuote;
