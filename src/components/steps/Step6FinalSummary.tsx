import React from 'react';
import { AppState } from '../../types';
import { Share } from 'lucide-react';

interface Step6FinalSummaryProps {
  state: AppState;
}

const Step6FinalSummary: React.FC<Step6FinalSummaryProps> = ({ state }) => {
  const { selections, landDetails } = state;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 0
    }).format(price);
  };

  let total = 0;
  if (selections.floorplan) total += selections.floorplan.price;
  if (selections.facade) total += selections.facade.price;
  if (selections.externalColour) total += selections.externalColour.price;
  if (selections.internalColour) total += selections.internalColour.price;
  Object.values(selections.upgrades).forEach((u: any) => total += u.price);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-8 flex flex-col md:flex-row gap-8 min-h-[700px]">
        
        {/* Text Summary */}
        <div className="w-full md:w-[350px] flex flex-col">
           <h2 className="text-xl font-bold text-gray-900 uppercase mb-8">QUOTE SUMMARY</h2>
           
           <div className="space-y-6 text-sm flex-1">
             <div>
               <h3 className="font-bold text-gray-900 uppercase text-xs mb-2">LAND DETAILS</h3>
               <div className="text-gray-600 space-y-1 text-xs">
                 <div>Preferred Build Location: <span className="text-gray-900">{landDetails.preferredLocation || 'Indiana'}</span></div>
                 <div>Lot Number: <span className="text-gray-900">{landDetails.lotNumber || '113'}</span></div>
                 <div>Estate Name: <span className="text-gray-900">{landDetails.estateName || 'Massachusetts'}</span></div>
                 <div>Suburb: <span className="text-gray-900">{landDetails.suburb || '113'}</span></div>
                 <div>Land Width: <span className="text-gray-900">{landDetails.landWidth || '10.5m'}</span></div>
                 <div>Land Depth: <span className="text-gray-900">{landDetails.landDepth || '25m'}</span></div>
               </div>
             </div>

             <div>
               <h3 className="font-bold text-gray-900 uppercase text-xs mb-2">UPLOADED DOCUMENTATION</h3>
               <div className="text-gray-400 text-xs italic">No files uploaded.</div>
             </div>

             {selections.floorplan && (
               <div>
                 <h3 className="font-bold text-gray-900 uppercase text-xs mb-2">FLOORPLAN</h3>
                 <div className="flex justify-between border-b border-gray-100 pb-2 mb-1">
                    <span className="text-gray-600">Floorplan Name: <span className="text-gray-900">{selections.floorplan.name}</span></span>
                    <span className="text-[#1B3635]">{formatPrice(selections.floorplan.price)}</span>
                 </div>
                 <div className="flex justify-end pt-1">
                    <span className="font-bold text-gray-800 text-xs uppercase mr-4">Subtotal:</span>
                    <span className="text-[#1B3635] font-medium">{formatPrice(selections.floorplan.price)}</span>
                 </div>
               </div>
             )}

             {selections.facade && (
               <div>
                 <h3 className="font-bold text-gray-900 uppercase text-xs mb-2">FACADE</h3>
                 <div className="flex justify-between border-b border-gray-100 pb-2 mb-1">
                    <span className="text-gray-600">Facade Name: <span className="text-gray-900">{selections.facade.name}</span></span>
                    <span className="text-[#1B3635]">{formatPrice(selections.facade.price)}</span>
                 </div>
                 <div className="flex justify-end pt-1">
                    <span className="font-bold text-gray-800 text-xs uppercase mr-4">Subtotal:</span>
                    <span className="text-[#1B3635] font-medium">{formatPrice(selections.facade.price)}</span>
                 </div>
               </div>
             )}

             {(selections.externalColour || selections.internalColour) && (
               <div>
                 <h3 className="font-bold text-gray-900 uppercase text-xs mb-2">COLOUR SCHEMES</h3>
                 {selections.externalColour && (
                   <div className="flex justify-between border-b border-gray-100 pb-2 mb-1">
                      <span className="text-gray-600">External: <span className="text-gray-900">{selections.externalColour.name}</span></span>
                      <span className="text-[#1B3635]">{selections.externalColour.price === 0 ? 'Included' : formatPrice(selections.externalColour.price)}</span>
                   </div>
                 )}
                 {selections.internalColour && (
                   <div className="flex justify-between border-b border-gray-100 pb-2 mb-1">
                      <span className="text-gray-600">Internal: <span className="text-gray-900">{selections.internalColour.name}</span></span>
                      <span className="text-[#1B3635]">{selections.internalColour.price === 0 ? 'Included' : formatPrice(selections.internalColour.price)}</span>
                   </div>
                 )}
                 <div className="flex justify-end pt-1">
                    <span className="font-bold text-gray-800 text-xs uppercase mr-4">Subtotal:</span>
                    <span className="text-[#1B3635] font-medium">
                       {formatPrice((selections.externalColour?.price || 0) + (selections.internalColour?.price || 0))}
                    </span>
                 </div>
               </div>
             )}
             
             {/* Note: Upgrades not fully itemized in screenshot but good to have logic */}
           </div>
           
           <div className="mt-8 pt-4 border-t-2 border-[#1B3635] flex items-center justify-end">
             <span className="text-xl font-bold text-gray-800 uppercase mr-4">TOTAL:</span>
             <span className="text-3xl font-bold text-[#1B3635]">{formatPrice(total)}</span>
           </div>
        </div>

        {/* Visual Summary (Collage) */}
        <div className="flex-1 flex flex-col gap-4">
           {selections.floorplan && (
             <div className="w-1/2 float-left h-full hidden lg:block mr-4">
                <img src={selections.floorplan.image} alt="Floorplan" className="w-full h-full object-contain opacity-80" />
             </div>
           )}
           <div className="flex flex-col gap-4 flex-1">
             {selections.facade && (
               <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                 <img src={selections.facade.image} alt="Facade" className="w-full h-full object-cover" />
               </div>
             )}
             <div className="flex gap-4 h-48">
               {selections.externalColour && (
                 <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
                   <img src={selections.externalColour.image} alt="External Colour" className="w-full h-full object-cover" />
                 </div>
               )}
               {selections.internalColour && (
                 <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
                   <img src={selections.internalColour.image} alt="Internal Colour" className="w-full h-full object-cover" />
                 </div>
               )}
             </div>
             
             <p className="text-xs text-gray-400 mt-2">
               The smaller facade is indicative only and is there to represent the external colours chosen. Refer to your official Mimosa Homes preliminary agreement for full and accurate pricing, promotions and terms and conditions. This is not an official quote.
             </p>

             <div className="mt-6 bg-white border border-[#1B3635] rounded-lg p-4 flex items-center justify-between shadow-sm">
                <div className="text-gray-800 text-sm">
                  Connect now to secure your Site Costs <br/> <span className="font-bold">&amp; finalise your new quote!</span>
                </div>
                <div className="flex items-center gap-4">
                  <button className="bg-[#1B3635] hover:bg-[#142928] text-white font-bold py-3 px-8 rounded transition-colors uppercase">
                    GET IN TOUCH
                  </button>
                  <button className="p-3 text-[#1B3635] border border-[#1B3635] rounded hover:bg-gray-100 transition-colors">
                    <Share className="w-5 h-5" />
                  </button>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Step6FinalSummary;
