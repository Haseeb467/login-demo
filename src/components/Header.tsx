import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-[#06333a] py-3 px-6 flex justify-between items-center">
      <div className="flex-1 flex justify-center">
        <img
          src="/assets/dbn-homes-logo.png"
          alt="DBN Homes Pty Ltd"
          className="h-18 w-auto max-w-[320px] object-contain"
        />
      </div>
    </header>
  );
};

export default Header;
