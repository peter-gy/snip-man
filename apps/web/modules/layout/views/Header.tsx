import { ReactElement } from 'react';

function Header(): ReactElement {
  return (
    <div className="py-2 md:py-4 w-full bg-navy-800 rounded-b-2xl flex items-center justify-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold">
        <a
          className="text-white"
          href="https://github.com/peter-gy/snip-man"
          target="_blank"
          rel="noreferrer"
        >
          Snip<span className="text-highlight">Man</span>
        </a>
      </h1>
    </div>
  );
}

export default Header;
