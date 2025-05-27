import React, { useState } from 'react';
import { useDiary } from '../../context/DiaryContext';
import { formatDate } from '../../utils/dateUtils';
import { Edit, Trash2 } from 'lucide-react';
import ConfirmDialog from '../ui/ConfirmDialog';
import MoodIndicator from '../ui/MoodIndicator';


interface EntryDetailProps {
  onEdit: () => void;
}

const EntryDetail: React.FC<EntryDetailProps> = ({ onEdit }) => {
  const { currentEntry, deleteEntry, setCurrentEntry } = useDiary();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!currentEntry) {
    return <div>No entry selected</div>;
  }

  const handleDelete = async () => {
    await deleteEntry(currentEntry._id);
    setCurrentEntry(null);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
            {formatDate(currentEntry.date)}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Created: {new Date(currentEntry.createdAt).toLocaleString()}
          </p>
        </div>
        
        <div className="flex items-center mt-4 md:mt-0 space-x-3">
          <MoodIndicator mood={currentEntry.mood} size="lg" />
          
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
              aria-label="Edit entry"
            >
              <Edit className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
              aria-label="Delete entry"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-inner">
        <div className="prose dark:prose-invert max-w-none">
          {currentEntry.content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4 text-gray-800 dark:text-gray-200">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      
      {showDeleteConfirm && (
        <ConfirmDialog
          title="Delete Entry"
          message="Are you sure you want to delete this diary entry? This action cannot be undone."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          isDestructive
        />
      )}
    </div>
  );
};

export default EntryDetail;