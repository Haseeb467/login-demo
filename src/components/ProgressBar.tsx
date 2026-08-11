import React from 'react';
import { Check } from 'lucide-react';

const steps = [
  'BUILD YOUR QUOTE',
  'FLOORPLAN',
  'FACADE',
  'COLOURS',
  'UPGRADES',
  'SUMMARY'
];

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  return (
    <div className="w-full bg-white border-b border-gray-100 py-4 px-4 flex justify-center overflow-x-auto shadow-sm relative z-10">
      <div className="flex items-center gap-4 sm:gap-8 min-w-max">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;

          return (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-200 ${
                isActive ? 'bg-[#1B3635] text-white border-2 border-[#1B3635]' :
                isCompleted ? 'bg-[#1B3635] text-white border-2 border-[#1B3635]' :
                'bg-white text-[#1B3635] border-2 border-[#1B3635]'
              }`}>
                {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
              </div>
              <span className={`text-sm font-bold tracking-wide ${
                isActive || isCompleted ? 'text-black' : 'text-gray-400'
              }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
