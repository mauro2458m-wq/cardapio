
import React from 'react';

interface HeaderProps {
  isAdminView: boolean;
  setIsAdminView: (isAdmin: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ isAdminView, setIsAdminView }) => {
  return (
    <header className="bg-primary text-white shadow-lg sticky top-0 z-20">
      <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v1.073a8.999 8.999 0 014.288 1.43.5.5 0 01.192.652l-1.1 1.905a.5.5 0 01-.652.192A6.995 6.995 0 0012 6V5a1 1 0 01-2 0v1a7.002 7.002 0 00-2.72 1.252.5.5 0 01-.652-.192L5.523 5.155a.5.5 0 01.192-.652A9.001 9.001 0 0110 2.073V2a1 1 0 011.3-.954zM5.5 8.5a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-8a.5.5 0 01-.5-.5v-2zM4 12.5a.5.5 0 01.5-.5h11a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-2zM3.5 16a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-13z" clipRule="evenodd" />
            </svg>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Várzea Alegre FC</h1>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{isAdminView ? 'Admin' : 'Cardápio'}</span>
          <label htmlFor="view-toggle" className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="view-toggle"
              className="sr-only peer"
              checked={isAdminView}
              onChange={() => setIsAdminView(!isAdminView)}
            />
            <div className="w-11 h-6 bg-green-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
          </label>
        </div>
      </div>
    </header>
  );
};
