import React from 'react';
import { AppState } from '../types';

interface QuoteSummaryProps {
  selections: AppState['selections'];
}

export const QuoteSummary: React.FC<QuoteSummaryProps> = ({ selections }) => {
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
    <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-6 w-full max-w-sm sticky top-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800 uppercase tracking-wide">Quote Summary</h2>

      <div className="space-y-4 text-sm">
        {selections.floorplan && (
          <div>
            <h3 className="font-bold text-gray-900 uppercase text-xs mb-2">Floorplan</h3>
            <div className="flex justify-between items-center text-gray-600 mb-1 border-b border-gray-100 pb-2">
              <span>Floorplan Name: <span className="text-gray-900">{selections.floorplan.name}</span></span>
              <span className="text-[#1B3635]">{formatPrice(selections.floorplan.price)}</span>
            </div>
            <div className="flex justify-end pt-1">
              <span className="font-semibold text-gray-800 text-xs uppercase mr-4">Subtotal:</span>
              <span className="text-[#1B3635] font-medium">{formatPrice(selections.floorplan.price)}</span>
            </div>
          </div>
        )}

        {selections.facade && (
          <div className="pt-2">
            <h3 className="font-bold text-gray-900 uppercase text-xs mb-2">Facade</h3>
            <div className="flex justify-between items-center text-gray-600 mb-1 border-b border-gray-100 pb-2">
              <span>Facade Name: <span className="text-gray-900">{selections.facade.name}</span></span>
              <span className="text-[#1B3635]">{formatPrice(selections.facade.price)}</span>
            </div>
            <div className="flex justify-end pt-1">
              <span className="font-semibold text-gray-800 text-xs uppercase mr-4">Subtotal:</span>
              <span className="text-[#1B3635] font-medium">{formatPrice(selections.facade.price)}</span>
            </div>
          </div>
        )}

        {(selections.externalColour || selections.internalColour) && (
          <div className="pt-2">
            <h3 className="font-bold text-gray-900 uppercase text-xs mb-2">Colour Schemes</h3>
            {selections.externalColour && (
              <div className="flex justify-between items-center text-gray-600 mb-1">
                <span>External: <span className="text-gray-900">{selections.externalColour.name}</span></span>
                <span className="text-[#1B3635]">{selections.externalColour.price === 0 ? 'Included' : formatPrice(selections.externalColour.price)}</span>
              </div>
            )}
            {selections.internalColour && (
              <div className="flex justify-between items-center text-gray-600 mb-2 border-b border-gray-100 pb-2">
                <span>Internal: <span className="text-gray-900">{selections.internalColour.name}</span></span>
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
      </div>

      <div className="mt-8 pt-6 flex items-center justify-end">
        <span className="text-lg font-bold text-gray-800 uppercase mr-4">Total:</span>
        <span className="text-2xl font-bold text-[#1B3635]">{formatPrice(total)}</span>
      </div>
    </div>
  );
};
