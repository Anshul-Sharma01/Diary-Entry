import React, { useState, useEffect } from 'react';
import { useDiary } from '../../context/DiaryContext';
import type { DiaryEntry, Mood } from '../../types/diary';
import MoodSelector from "../ui/MoodSelector";

interface EntryFormProps {
  entry?: DiaryEntry;
  onComplete: () => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ entry, onComplete }) => {
  const { createEntry, updateEntry } = useDiary();
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [mood, setMood] = useState<Mood>('Neutral');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!entry;

  useEffect(() => {
    if (entry) {
      setContent(entry.content);
      setDate(new Date(entry.date).toISOString().split('T')[0]);
      setMood(entry.mood);
    }
  }, [entry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!content.trim()) {
      setError('Please enter some content for your diary entry');
      return;
    }

    try {
      setIsSubmitting(true);
      
      if (isEditing && entry) {
        await updateEntry(entry._id, { content, date, mood });
      } else {
        await createEntry({ content, date, mood });
      }
      
      onComplete();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {isEditing ? 'Edit Diary Entry' : 'New Diary Entry'}
      </h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            How are you feeling?
          </label>
          <MoodSelector selectedMood={mood} onSelectMood={setMood} />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Entry
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            placeholder="Write your thoughts here..."
            required
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onComplete}
            className="px-5 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Entry' : 'Save Entry'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EntryForm;