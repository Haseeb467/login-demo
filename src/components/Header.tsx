import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-[#06333a] py-4 px-6 flex justify-between items-center text-white">
      <div className="flex-1 flex justify-center">
        <div className="flex items-center gap-3" aria-label="DBN Homes">
          <svg className="h-10 w-12" viewBox="0 0 48 40" aria-hidden="true">
            <path d="M3 20 21 5c2-2 5-2 7 0l17 15v16H3Z" fill="#017580" />
            <path d="M13 12h14c2 0 3 1 3 3v20H10V15c0-2 1-3 3-3Z" fill="#06333a" opacity=".82" />
            <path d="M21 20h8v15h-8z" fill="white" opacity=".9" />
          </svg>
          <div className="leading-none">
            <div className="text-3xl font-semibold tracking-wide">DBN<span className="font-light">HOMES</span></div>
            <div className="mt-1 text-[9px] font-semibold tracking-[0.28em] text-[#e6e1d5]">PTY LTD</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
