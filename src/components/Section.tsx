import React from 'react';
import type { SectionProps } from '../types';

const Section: React.FC<SectionProps> = ({ id, title, children, className = '' }) => {
  // Using current date to simulate the last update time
  const date = new Date();
  const dateString = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <section id={id} className={`mb-12 scroll-mt-24 ${className}`}>
      <div className="flex items-baseline justify-between border-b border-wiki-border dark:border-gray-600 mb-4 pb-1">
        <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white tracking-tight">
          {title}
        </h2>
        <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline-block font-sans italic">
          Last updated: {dateString}
        </span>
      </div>
      <div className="animate-fade-in">
        {children}
      </div>
    </section>
  );
};

export default Section;