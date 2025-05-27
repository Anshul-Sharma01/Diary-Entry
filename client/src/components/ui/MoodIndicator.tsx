import React from 'react';
import type { Mood } from '../../types/diary';
import { getMoodIcon, getMoodColor } from '../../utils/moodUtils';

interface MoodIndicatorProps {
  mood: Mood;
  size?: 'sm' | 'md' | 'lg';
}

const MoodIndicator: React.FC<MoodIndicatorProps> = ({ mood, size = 'md' }) => {
  const Icon = getMoodIcon(mood);
  const { bgColor, textColor } = getMoodColor(mood);
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1 space-x-1',
    md: 'text-sm px-3 py-1.5 space-x-1.5',
    lg: 'text-base px-4 py-2 space-x-2'
  };
  
  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className={`flex items-center rounded-full ${bgColor} ${textColor} ${sizeClasses[size]}`}>
      <Icon className={iconSizes[size]} />
      <span className="font-medium">{mood}</span>
    </div>
  );
};

export default MoodIndicator;