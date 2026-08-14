import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AppState, Item } from '../../types';
import { QuoteSummary } from '../QuoteSummary';
import { facades } from '../../data';
import { ChevronLeft, ChevronRight, Search, Check } from 'lucide-react';

interface Step3FacadeProps { state: AppState; updateState: (updates: Partial<AppState>) => void; onNext: () => void; onBack: () => void; }

const price = (value: number) => value ? `+ $${value.toLocaleString('en-AU')}` : 'Included';

const Step3Facade: React.FC<Step3FacadeProps> = ({ state, updateState, onNext, onBack }) => {
  const [index, setIndex] = useState(Math.max(0, facades.findIndex((item) => item.id === state.selections.facade?.id)));
  const [direction, setDirection] = useState<-1 | 1>(1);
  const reduceMotion = useReducedMotion();
  const facade = facades[index];
  const selected = state.selections.facade?.id === facade.id;
  const change = (next: -1 | 1) => { setDirection(next); setIndex((value) => (value + next + facades.length) % facades.length); };
  const select = () => updateState({ selections: { ...state.selections, facade } });
  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      select();
    }
  };

  return <div className="mx-auto grid w-full max-w-7xl gap-7 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_330px]">
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white px-5 py-7 shadow-[0_20px_50px_rgba(27,54,53,0.08)] sm:px-8">
      <div className="mb-8 flex items-end justify-between"><div><p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#C5A267]">Step 3 of 6</p><h2 className="text-3xl font-bold tracking-tight text-slate-900">FACADES</h2></div><span className="hidden rounded-full bg-[#f5f7f6] px-3 py-2 text-xs font-semibold text-[#1B3635] sm:block">Choose your home’s street appeal</span></div>
      <div className="relative mx-auto flex max-w-4xl items-center justify-center py-4">
        <button type="button" onClick={() => change(-1)} aria-label={`Show ${facades[(index - 1 + facades.length) % facades.length].name}`} className="absolute -left-20 top-1/2 hidden h-[260px] w-[210px] -translate-y-1/2 overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition hover:border-[#1B3635] hover:shadow-lg lg:block"><img src={facades[(index - 1 + facades.length) % facades.length].image} alt="" className="h-[170px] w-full object-cover opacity-70" /><p className="p-4 text-sm font-bold text-[#1B3635]">{facades[(index - 1 + facades.length) % facades.length].name}</p></button>
        <button type="button" onClick={() => change(-1)} aria-label="Previous facade" className="absolute left-0 z-20 grid h-11 w-11 place-items-center rounded-full bg-[#1B3635] text-white shadow-lg transition hover:scale-105"><ChevronLeft /></button>
        <AnimatePresence mode="wait" initial={false}><motion.article key={facade.id} role="button" tabIndex={0} aria-pressed={selected} aria-label={`Select ${facade.name} facade`} onClick={select} onKeyDown={handleCardKeyDown} initial={reduceMotion ? false : { opacity: .55, x: direction * 150, scale: .78 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={reduceMotion ? undefined : { opacity: .55, x: direction * -150, scale: .78 }} transition={{ duration: .5, ease: [0.22, .61, .36, 1] }} className="relative z-10 w-full max-w-[690px] cursor-pointer overflow-hidden rounded-2xl border-2 border-[#C5A267] bg-white shadow-[0_20px_45px_rgba(27,54,53,.16)] outline-none transition hover:border-[#1B3635] focus-visible:ring-4 focus-visible:ring-[#1B3635]/25">
          <div className="grid min-h-[380px] md:grid-cols-[1.08fr_.92fr]"><div className="relative min-h-[280px] bg-[#f5f7f6] p-5"><button type="button" onClick={(event) => event.stopPropagation()} aria-label={`Preview ${facade.name}`} className="absolute left-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-[#1B3635] shadow-md"><Search className="h-5 w-5" /></button><img src={facade.image} alt={facade.name} className="h-full w-full object-cover" /></div><div className="flex flex-col items-center p-6 text-center"><button type="button" onClick={(event) => { event.stopPropagation(); select(); }} className="w-full rounded-md bg-[#1B3635] py-2.5 text-sm font-bold text-white transition hover:bg-[#142928]">{selected && <Check className="mr-2 inline h-4 w-4" />}{selected ? 'SELECTED' : 'SELECT FACADE'}</button><h3 className="mt-12 text-3xl font-bold uppercase tracking-tight text-slate-900">{facade.name}</h3><div className="my-7 w-full border-y border-slate-200 py-5 text-sm text-slate-500">Facade render is indicative only. Optional upgrades may be shown.</div><p className="mt-auto text-xl font-bold text-[#1B3635]">{price(facade.price)}</p></div></div>
        </motion.article></AnimatePresence>
        <button type="button" onClick={() => change(1)} aria-label="Next facade" className="absolute right-0 z-20 grid h-11 w-11 place-items-center rounded-full bg-[#1B3635] text-white shadow-lg transition hover:scale-105"><ChevronRight /></button>
        <button type="button" onClick={() => change(1)} aria-label={`Show ${facades[(index + 1) % facades.length].name}`} className="absolute -right-20 top-1/2 hidden h-[260px] w-[210px] -translate-y-1/2 overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition hover:border-[#1B3635] hover:shadow-lg lg:block"><img src={facades[(index + 1) % facades.length].image} alt="" className="h-[170px] w-full object-cover opacity-70" /><p className="p-4 text-sm font-bold text-[#1B3635]">{facades[(index + 1) % facades.length].name}</p></button>
      </div>
      <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row"><button type="button" onClick={onBack} className="text-sm font-semibold text-[#1B3635] underline underline-offset-4">← GO BACK</button><button type="button" onClick={onNext} disabled={!state.selections.facade} className="inline-flex items-center gap-2 rounded-lg bg-[#1B3635] px-6 py-3 font-bold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-45">NEXT STEP <ChevronRight className="h-5 w-5" /></button></div>
    </section>
    <aside><QuoteSummary selections={state.selections} /></aside>
  </div>;
};
export default Step3Facade;
