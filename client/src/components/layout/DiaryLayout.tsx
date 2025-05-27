import { useState } from 'react';
import EntryList from '../entries/EntryList';
import EntryForm from '../entries/EntryForm';
import EntryDetail from '../entries/EntryDetails';
import Header from './Header';
import { useDiary } from '../../context/DiaryContext';

const DiaryLayout = () => {
  const { currentEntry, setCurrentEntry } = useDiary();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleBackToList = () => {
    setIsCreating(false);
    setIsEditing(false);
    setCurrentEntry(null);
  };

  const renderMainContent = () => {
    if (isCreating) {
      return <EntryForm onComplete={() => setIsCreating(false)} />;
    }
    
    if (isEditing && currentEntry) {
      return <EntryForm entry={currentEntry} onComplete={() => setIsEditing(false)} />;
    }
    
    if (currentEntry) {
      return <EntryDetail onEdit={() => setIsEditing(true)} />;
    }
    
    return <EntryList onNewEntry={() => setIsCreating(true)} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950">
      <Header 
        onNewEntry={() => {
          setIsCreating(true);
          setIsEditing(false);
        }}
        onBackToList={handleBackToList}
        showBackButton={isCreating || isEditing || !!currentEntry}
      />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
};

export default DiaryLayout;