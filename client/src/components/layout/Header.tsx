import React from 'react';
import { Book, Plus, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  onNewEntry: () => void;
  onBackToList: () => void;
  showBackButton: boolean;
}

const Header: React.FC<HeaderProps> = ({ onNewEntry, onBackToList, showBackButton }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 max-w-4xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showBackButton ? (
            <button
              onClick={onBackToList}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Back to list"
            >
              <ArrowLeft className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </button>
          ) : (
            <Book className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          )}
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            My Diary
          </h1>
        </div>
        
        <button
          onClick={onNewEntry}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full transition-colors duration-200 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Entry</span>
        </button>
      </div>
    </header>
  );
};

export default Header;