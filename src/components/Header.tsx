import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-[#1B3635] py-4 px-6 flex justify-between items-center text-white">
      <div className="flex-1 flex justify-center">
        {/* Mock Logo */}
        <div className="flex items-center gap-2">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 21h18M3 10h18M5 10v11M19 10v11M12 3l9 7H3l9-7z" />
          </svg>
          <span className="text-3xl font-light tracking-widest">MIMOSA<span className="font-semibold">HOMES</span></span>
          <span className="text-xs align-top">&reg;</span>
        </div>
      </div>
      <div className="absolute right-6 bg-white text-[#1B3635] p-2 flex flex-col items-center shadow-md">
        <span className="text-3xl font-bold leading-none">V</span>
        <span className="text-[10px] font-bold tracking-widest uppercase">Collection</span>
      </div>
    </header>
  );
};

export default Header;
