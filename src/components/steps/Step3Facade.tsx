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

  return <div className="mx-auto grid w-full max-w-7xl gap-7 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_330px]">
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white px-5 py-7 shadow-[0_20px_50px_rgba(27,54,53,0.08)] sm:px-8">
      <div className="mb-8 flex items-end justify-between"><div><p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#C5A267]">Step 3 of 6</p><h2 className="text-3xl font-bold tracking-tight text-slate-900">FACADES</h2></div><span className="hidden rounded-full bg-[#f5f7f6] px-3 py-2 text-xs font-semibold text-[#1B3635] sm:block">Choose your home’s street appeal</span></div>
      <div className="relative mx-auto flex max-w-4xl items-center justify-center py-4">
        <button type="button" onClick={() => change(-1)} aria-label="Previous facade" className="absolute left-0 z-20 grid h-11 w-11 place-items-center rounded-full bg-[#1B3635] text-white shadow-lg transition hover:scale-105"><ChevronLeft /></button>
        <AnimatePresence mode="wait" initial={false}><motion.article key={facade.id} initial={reduceMotion ? false : { opacity: .55, x: direction * 150, scale: .78 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={reduceMotion ? undefined : { opacity: .55, x: direction * -150, scale: .78 }} transition={{ duration: .5, ease: [0.22, .61, .36, 1] }} className="relative z-10 w-full max-w-[690px] overflow-hidden rounded-2xl border-2 border-[#C5A267] bg-white shadow-[0_20px_45px_rgba(27,54,53,.16)]">
          <div className="relative aspect-[16/9] bg-slate-100"><img src={facade.image} alt={facade.name} className="h-full w-full object-cover" /><button type="button" aria-label={`Preview ${facade.name}`} className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white text-[#1B3635] shadow-md"><Search className="h-5 w-5" /></button><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-6 text-white"><p className="text-xs font-semibold uppercase tracking-[.16em] text-white/75">V Collection facade</p><h3 className="mt-1 text-3xl font-bold">{facade.name}</h3></div></div>
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-slate-500">Facade render is indicative and may show optional upgrades.</p><button type="button" onClick={select} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#1B3635] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#142928]">{selected && <Check className="h-4 w-4" />}{selected ? 'SELECTED' : 'SELECT FACADE'} · {price(facade.price)}</button></div>
        </motion.article></AnimatePresence>
        <button type="button" onClick={() => change(1)} aria-label="Next facade" className="absolute right-0 z-20 grid h-11 w-11 place-items-center rounded-full bg-[#1B3635] text-white shadow-lg transition hover:scale-105"><ChevronRight /></button>
      </div>
      <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row"><button type="button" onClick={onBack} className="text-sm font-semibold text-[#1B3635] underline underline-offset-4">← GO BACK</button><button type="button" onClick={onNext} disabled={!state.selections.facade} className="inline-flex items-center gap-2 rounded-lg bg-[#1B3635] px-6 py-3 font-bold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-45">NEXT STEP <ChevronRight className="h-5 w-5" /></button></div>
    </section>
    <aside className="space-y-4"><QuoteSummary selections={state.selections} /><div className="rounded-2xl border border-slate-100 bg-white p-5 text-right shadow-sm"><p className="text-xs text-slate-500">Already have an account? <button className="font-semibold text-[#1B3635] underline">Sign in</button></p><button className="mt-4 w-full rounded-lg bg-[#1B3635] py-3 text-sm font-bold text-white">CREATE AN ACCOUNT</button></div></aside>
  </div>;
};
export default Step3Facade;
