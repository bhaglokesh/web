import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'bottom', className = '' }) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-800 dark:border-t-gray-700',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-800 dark:border-b-gray-700',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-800 dark:border-l-gray-700',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-800 dark:border-r-gray-700',
  };

  return (
    <div className={`group relative flex items-center justify-center ${className}`}>
      {children}
      <div
        className={`
          absolute z-50 px-2 py-1 text-[10px] font-semibold text-white bg-gray-800 dark:bg-gray-700
          rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 
          pointer-events-none whitespace-nowrap ${positionClasses[position]}
        `}
        role="tooltip"
      >
        {text}
        <div 
          className={`absolute border-4 border-transparent ${arrowClasses[position]}`}
        />
      </div>
    </div>
  );
};

export default Tooltip;