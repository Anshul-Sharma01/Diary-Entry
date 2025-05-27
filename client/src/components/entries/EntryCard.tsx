import React from 'react';
import type { DiaryEntry } from '../../types/diary';
import { useDiary } from '../../context/DiaryContext';
import { formatDate } from '../../utils/dateUtils';
import MoodIndicator from '../ui/MoodIndicator';

interface EntryCardProps {
  entry: DiaryEntry;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
  const { setCurrentEntry } = useDiary();
  
  const handleClick = () => {
    setCurrentEntry(entry);
  };
  
  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <time className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {formatDate(entry.date)}
          </time>
        </div>
        <MoodIndicator mood={entry.mood} size="sm" />
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
        {truncateContent(entry.content)}
      </p>
      
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-500 flex justify-between items-center">
        <span>
          Last updated: {new Date(entry.updatedAt).toLocaleDateString()}
        </span>
        <span className="text-indigo-500 dark:text-indigo-400 font-medium">
          Read more
        </span>
      </div>
    </div>
  );
};

export default EntryCard;