import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import WelcomeModal from './components/WelcomeModal';
import Step1BuildQuote from './components/steps/Step1BuildQuote';
import Step2Floorplan from './components/steps/Step2Floorplan';
import Step3Facade from './components/steps/Step3Facade';
import Step4Colours from './components/steps/Step4Colours';
import Step5Upgrades from './components/steps/Step5Upgrades';
import Step6FinalSummary from './components/steps/Step6FinalSummary';
import { AppState } from './types';

const initialState: AppState = {
  step: 1,
  showWelcomeModal: true,
  region: '',
  hasLand: true,
  landDetails: {
    lotNumber: '',
    estateName: '',
    suburb: '',
    landWidth: '',
    landDepth: '',
    storeys: '',
    preferredLocation: '',
  },
  authMode: 'register',
  user: {
    firstName: '',
    surname: '',
    phone: '',
    email: '',
  },
  selections: {
    floorplan: null,
    facade: null,
    externalColour: null,
    internalColour: null,
    upgrades: {},
  },
};

export default function App() {
  const [state, setState] = useState<AppState>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const updateState = (updates: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const navigateWithLoading = (action: () => void) => {
    setIsLoading(true);
    setTimeout(() => {
      action();
      setIsLoading(false);
    }, 500);
  };

  const handleNextStep = () => {
    if (state.step < 6) {
      navigateWithLoading(() => {
        updateState({ step: state.step + 1 });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  const handlePrevStep = () => {
    if (state.step > 1) {
      navigateWithLoading(() => {
        updateState({ step: state.step - 1 });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  const handleRegionSelect = (region: string) => {
    updateState({ region, showWelcomeModal: false });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans relative">
      <Header />
      <ProgressBar currentStep={state.step} />
      
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm"
          >
            <div className="w-12 h-12 border-4 border-[#1B3635]/20 border-t-[#1B3635] rounded-full animate-spin"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state.showWelcomeModal && (
          <WelcomeModal onSelectRegion={handleRegionSelect} />
        )}
      </AnimatePresence>

      {/* Sub-header showing selected region */}
      {!state.showWelcomeModal && (
        <div className="w-full max-w-7xl mx-auto px-4 py-3 flex items-center text-sm">
           <span className="font-bold text-gray-700">Region:</span>
           <span className="text-gray-600 ml-1 mr-2">{state.region || 'North West'}</span>
           <span className="text-[#1B3635] italic cursor-pointer hover:underline">- change</span>
        </div>
      )}

      <main className="pb-16 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {state.step === 1 && (
              <Step1BuildQuote state={state} updateState={updateState} onNext={handleNextStep} />
            )}
            {state.step === 2 && (
              <Step2Floorplan state={state} updateState={updateState} onNext={handleNextStep} onBack={handlePrevStep} />
            )}
            {state.step === 3 && (
              <Step3Facade state={state} updateState={updateState} onNext={handleNextStep} onBack={handlePrevStep} />
            )}
            {state.step === 4 && (
              <Step4Colours state={state} updateState={updateState} onNext={handleNextStep} onBack={handlePrevStep} />
            )}
            {state.step === 5 && (
              <Step5Upgrades state={state} updateState={updateState} onNext={handleNextStep} onBack={handlePrevStep} />
            )}
            {state.step === 6 && (
              <Step6FinalSummary state={state} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
