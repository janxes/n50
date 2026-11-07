import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-11 sm:h-12', variant = 'dark' }) => {
  const isLightOnDark = variant === 'light';

  if (isLightOnDark) {
    return (
      <div className="inline-flex items-center bg-white px-3 py-1.5 rounded-xl shadow-xs border border-slate-700/60 select-none">
        <img
          src="/logo-n50.png"
          alt="N50 Blower Door Test"
          className={`${className} w-auto object-contain shrink-0`}
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center select-none">
      <img
        src="/logo-n50.png"
        alt="N50 Blower Door Test"
        className={`${className} w-auto object-contain shrink-0 drop-shadow-xs transition-transform duration-200 hover:scale-[1.02]`}
        loading="eager"
      />
    </div>
  );
};
