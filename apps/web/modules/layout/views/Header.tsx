import { ReactElement } from 'react';

function Header(): ReactElement {
  return (
    <div className="py-9 h-[7.5vh] w-full bg-navy-800 rounded-b-2xl flex items-center justify-center">
      <h1 className="text-4xl text-white font-bold">
        Snip<span className="text-highlight">Man</span>
      </h1>
    </div>
  );
}

export default Header;
