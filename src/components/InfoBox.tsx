import React, { useState, useEffect } from 'react';
import { PROFILE } from '../constants';
import { X } from 'lucide-react';
import Tooltip from './Tooltip';

const InfoBox: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Show toast hint briefly to indicate the box can be closed on mobile
    const showTimer = setTimeout(() => setShowToast(true), 1500);
    const hideTimer = setTimeout(() => setShowToast(false), 6000);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="relative w-full md:w-72 float-none md:float-right ml-0 md:ml-6 mb-6 md:mb-6 mt-6 md:mt-0 border border-[#a2a9b1] dark:border-gray-600 bg-[#f8f9fa] dark:bg-wiki-darkpanel p-1 text-[0.88rem] leading-snug shadow-sm rounded-sm font-sans transition-all duration-300 animate-fade-in">
      
      {/* Mobile Close Button & Toast */}
      <div className="absolute top-1.5 right-1.5 z-20 md:hidden block">
        <div className="relative flex items-center justify-end">
             {/* Toast Notification */}
             <div 
              className={`
                absolute right-full mr-3 top-1/2 -translate-y-1/2 
                whitespace-nowrap bg-blue-600 dark:bg-blue-500 text-white 
                text-[11px] font-semibold px-3 py-1.5 rounded-md shadow-xl 
                transition-all duration-700 ease-in-out transform origin-right
                pointer-events-none z-30 flex items-center gap-1
                ${showToast ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-4 scale-95'}
              `}
            >
              <span>Click here to close</span>
              <div className="absolute top-1/2 -translate-y-1/2 -right-[5px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[5px] border-l-blue-600 dark:border-l-blue-500"></div>
            </div>

            <Tooltip text="Close details" position="left">
              <button 
                onClick={() => setIsVisible(false)}
                className="group p-1.5 text-gray-500 hover:text-red-600 bg-white/80 dark:bg-black/60 hover:bg-white dark:hover:bg-gray-800 backdrop-blur-md rounded-full shadow-sm border border-gray-200 dark:border-gray-600 transition-all active:scale-95"
                aria-label="Hide info box"
              >
                <X size={16} className="transition-transform group-hover:rotate-90" />
              </button>
            </Tooltip>
        </div>
      </div>

      {/* Header */}
      <div className="bg-[#b0c4de] dark:bg-gray-700 border-b border-[#a2a9b1] dark:border-gray-600 p-2 text-center mb-1">
        <h3 className="font-bold text-lg leading-tight text-black dark:text-white px-2 font-serif">{PROFILE.name}</h3>
        <p className="text-xs text-gray-800 dark:text-gray-300 font-medium mt-0.5">{PROFILE.role}</p>
      </div>
      
      {/* Image */}
      <div className="bg-white dark:bg-wiki-darkbg p-1 mb-2 border border-[#a2a9b1] dark:border-gray-700 mx-auto max-w-[98%] shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
        <img 
          src={PROFILE.image} 
          alt={PROFILE.name} 
          className="w-full h-auto object-cover block aspect-square"
        />
        <div className="pt-1.5 pb-0.5 text-center text-[11px] text-gray-600 dark:text-gray-400 leading-tight">
           {PROFILE.name} in 2024
        </div>
      </div>

      {/* Details Table */}
      <div className="px-2 pb-2">
        <table className="w-full text-[13px] border-collapse">
          <tbody>
             <tr className="">
               <th className="text-left py-1 pr-3 align-top text-gray-700 dark:text-gray-300 font-bold w-24">Occupation</th>
               <td className="py-1 align-top text-black dark:text-gray-200">{PROFILE.role}</td>
             </tr>
             <tr className="">
               <th className="text-left py-1 pr-3 align-top text-gray-700 dark:text-gray-300 font-bold">Location</th>
               <td className="py-1 align-top text-black dark:text-gray-200">{PROFILE.location}</td>
             </tr>
              <tr className="">
               <th className="text-left py-1 pr-3 align-top text-gray-700 dark:text-gray-300 font-bold">Email</th>
               <td className="py-1 align-top break-all">
                 <a href={`mailto:${PROFILE.email}`} className="text-wiki-blue dark:text-wiki-linkdark hover:underline">{PROFILE.email}</a>
               </td>
             </tr>
             <tr>
               <th className="text-left py-1 pr-3 align-top text-gray-700 dark:text-gray-300 font-bold">Status</th>
               <td className="py-1 align-top text-black dark:text-gray-200">Open to work</td>
             </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InfoBox;