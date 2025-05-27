import React from 'react';
import type { Mood } from '../../types/diary';
import { getMoodIcon, getMoodColor } from '../../utils/moodUtils';

interface MoodSelectorProps {
  selectedMood: Mood;
  onSelectMood: (mood: Mood) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelectMood }) => {
  const moods: Mood[] = [
    'Happy', 
    'OverJoyed', 
    'Relaxed', 
    'Neutral', 
    'Tensed', 
    'Sad', 
    'Angry', 
    'Depressed'
  ];

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
      {moods.map((mood) => {
        const isSelected = mood === selectedMood;
        const Icon = getMoodIcon(mood);
        const { bgColor, textColor, borderColor } = getMoodColor(mood);
        
        return (
          <button
            key={mood}
            type="button"
            onClick={() => onSelectMood(mood)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 ${
              isSelected 
                ? `${bgColor} ${textColor} ${borderColor} border-2 transform scale-105 shadow-md` 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-transparent'
            }`}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{mood}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MoodSelector;