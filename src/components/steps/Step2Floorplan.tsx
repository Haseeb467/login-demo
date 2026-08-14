import React, { useState } from 'react';
import { AppState, Item } from '../../types';
import { QuoteSummary } from '../QuoteSummary';
import { floorplans } from '../../data';
import { ArrowLeftRight, Bath, BedDouble, CarFront, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

interface Step2FloorplanProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNext: () => void;
  onBack: () => void;
}

const formatPrice = (price: number) => new Intl.NumberFormat('en-AU', {
  style: 'currency', currency: 'AUD', maximumFractionDigits: 0,
}).format(price);

const FloorplanPreview = ({ plan, position, onClick }: { plan: Item; position: 'previous' | 'next'; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={`Show ${plan.name}`}
    className={`absolute top-1/2 hidden h-[292px] w-[238px] -translate-y-1/2 overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition duration-300 hover:border-[#1B3635] hover:shadow-lg lg:block ${position === 'previous' ? '-left-28' : '-right-28'}`}
  >
    <img src={plan.image} alt="" className="h-[190px] w-full object-cover opacity-70" />
    <div className="p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#1B3635]">{plan.name}</p>
      <p className="mt-2 text-sm font-bold text-slate-700">{formatPrice(plan.price)}</p>
    </div>
  </button>
);

const Detail = ({ icon: Icon, value }: { icon: typeof BedDouble; value: number | undefined }) => (
  <div className="flex items-center gap-2 text-[#1B3635]">
    <Icon className="h-5 w-5 stroke-[1.8]" />
    <span className="text-xl font-semibold">{value}</span>
  </div>
);

const Step2Floorplan: React.FC<Step2FloorplanProps> = ({ state, updateState, onNext, onBack }) => {
  const initialIndex = Math.max(0, floorplans.findIndex((plan) => plan.id === state.selections.floorplan?.id));
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [direction, setDirection] = useState<-1 | 1>(1);
  const prefersReducedMotion = useReducedMotion();
  const activePlan = floorplans[activeIndex];
  const previousPlan = floorplans[(activeIndex - 1 + floorplans.length) % floorplans.length];
  const nextPlan = floorplans[(activeIndex + 1) % floorplans.length];
  const isSelected = state.selections.floorplan?.id === activePlan.id;

  const selectPlan = () => updateState({ selections: { ...state.selections, floorplan: activePlan } });
  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectPlan();
    }
  };
  const changePlan = (nextDirection: -1 | 1) => {
    setDirection(nextDirection);
    setActiveIndex((index) => (index + nextDirection + floorplans.length) % floorplans.length);
  };

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-7 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_330px]">
      <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white px-5 py-7 shadow-[0_20px_50px_rgba(27,54,53,0.08)] sm:px-8">
        <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#C5A267]">Step 2 of 6</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">FLOORPLANS</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {['10.5m frontage', '25m depth', 'Single storey'].map((filter) => (
              <button key={filter} type="button" className="rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-[#1B3635] hover:text-[#1B3635]">{filter}</button>
            ))}
            <button type="button" className="rounded-full bg-[#1B3635] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#142928]">CHANGE</button>
          </div>
        </div>

        <div className="relative mx-auto flex max-w-4xl items-center justify-center py-3 lg:py-5">
          <FloorplanPreview plan={previousPlan} position="previous" onClick={() => changePlan(-1)} />
          <button type="button" onClick={() => changePlan(-1)} aria-label="Previous floorplan" className="absolute left-0 z-20 grid h-11 w-11 place-items-center rounded-full bg-[#1B3635] text-white shadow-lg transition hover:scale-105 hover:bg-[#142928]"><ChevronLeft /></button>

          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={activePlan.id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-label={`Select ${activePlan.name} floorplan`}
              onClick={selectPlan}
              onKeyDown={handleCardKeyDown}
              initial={prefersReducedMotion ? false : { opacity: 0.55, x: direction * 150, scale: 0.74 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0.55, x: direction * -150, scale: 0.74 }}
              transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative z-10 grid w-full max-w-[610px] cursor-pointer overflow-hidden rounded-2xl border-2 border-[#C5A267] bg-white shadow-[0_20px_45px_rgba(27,54,53,0.16)] outline-none transition hover:border-[#1B3635] focus-visible:ring-4 focus-visible:ring-[#1B3635]/25 md:grid-cols-[1.08fr_0.92fr]"
            >
              <div className="relative min-h-[300px] bg-[#f5f7f6] p-6">
                <button type="button" onClick={(event) => event.stopPropagation()} aria-label={`Preview ${activePlan.name}`} className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-[#1B3635] text-white shadow-md transition hover:bg-[#142928]"><Search className="h-5 w-5" /></button>
                <img src={activePlan.image} alt={activePlan.name} className="h-full w-full object-cover" />
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/90 p-2 text-[#1B3635] shadow-sm"><ArrowLeftRight className="h-5 w-5" /></div>
              </div>

              <div className="flex flex-col p-6 text-center">
                <button type="button" onClick={(event) => { event.stopPropagation(); selectPlan(); }} className="rounded-md bg-[#1B3635] py-2.5 text-sm font-bold text-white transition hover:bg-[#142928]">{isSelected ? 'SELECTED' : 'SELECT THIS PLAN'}</button>
                <h3 className="mt-7 text-2xl font-bold uppercase tracking-tight text-slate-900">{activePlan.name}</h3>
                <button type="button" onClick={(event) => event.stopPropagation()} className="mx-auto mt-2 text-sm font-medium text-[#1B3635] underline underline-offset-4">View Floorplan</button>
                <button type="button" onClick={(event) => event.stopPropagation()} className="mx-auto mt-3 rounded bg-[#C5A267] px-3 py-1.5 text-[11px] font-bold text-white">INCLUSIONS</button>

                <div className="my-6 flex justify-center gap-7 border-y border-slate-200 py-5">
                  <Detail icon={BedDouble} value={activePlan.details?.beds} />
                  <Detail icon={Bath} value={activePlan.details?.baths} />
                  <Detail icon={CarFront} value={activePlan.details?.cars} />
                </div>
                <div className="space-y-1 text-right text-xs text-slate-500">
                  <p>Min Frontage: <span className="font-semibold text-[#1B3635]">{activePlan.details?.minFrontage}</span></p>
                  <p>Min Depth: <span className="font-semibold text-[#1B3635]">{activePlan.details?.minDepth}</span></p>
                  <p>Total Area: <span className="font-semibold text-[#1B3635]">{activePlan.details?.totalArea}</span></p>
                </div>
              </div>
              <div className="col-span-full bg-[#1B3635] py-3 text-center text-xl font-bold text-white">{formatPrice(activePlan.price)}</div>
            </motion.article>
          </AnimatePresence>

          <button type="button" onClick={() => changePlan(1)} aria-label="Next floorplan" className="absolute right-0 z-20 grid h-11 w-11 place-items-center rounded-full bg-[#1B3635] text-white shadow-lg transition hover:scale-105 hover:bg-[#142928]"><ChevronRight /></button>
          <FloorplanPreview plan={nextPlan} position="next" onClick={() => changePlan(1)} />
        </div>

        <div className="mt-9 flex flex-col-reverse items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row">
          <button type="button" onClick={onBack} className="text-sm font-semibold text-[#1B3635] underline underline-offset-4">← GO BACK</button>
          <button type="button" onClick={onNext} disabled={!state.selections.floorplan} className="inline-flex items-center gap-2 rounded-lg bg-[#1B3635] px-6 py-3 font-bold text-white shadow-lg transition hover:bg-[#142928] disabled:cursor-not-allowed disabled:opacity-45">NEXT STEP <ChevronRight className="h-5 w-5" /></button>
        </div>
      </section>

      <aside><QuoteSummary selections={state.selections} /></aside>
    </div>
  );
};

export default Step2Floorplan;
