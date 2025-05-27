import React from 'react';
import { useDiary } from '../../context/DiaryContext';
import EntryCard from './EntryCard';
import Pagination from '../ui/Pagination';
import { PlusCircle } from 'lucide-react';
import LoadingSpinner from '../ui/LoadingSpinner';

interface EntryListProps {
  onNewEntry: () => void;
}

const EntryList: React.FC<EntryListProps> = ({ onNewEntry }) => {
  const { entries, loading, error, pagination, fetchEntries } = useDiary();

  const handlePageChange = (page: number) => {
    fetchEntries(page);
  };

  if (loading && entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your diary entries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-red-500 mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-red-500 mb-2">Error</h3>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-gray-400 mb-6">
          <svg className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Entries Yet</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
          Start documenting your thoughts and feelings by creating your first diary entry.
        </p>
        <button
          onClick={onNewEntry}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full transition-colors duration-200 shadow-md"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Create First Entry</span>
        </button>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 md:px-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Diary Entries</h2>
      
      <div className="space-y-4">
        {entries.map(entry => (
          <EntryCard key={entry._id} entry={entry} />
        ))}
      </div>
      
      {pagination.totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default EntryList;