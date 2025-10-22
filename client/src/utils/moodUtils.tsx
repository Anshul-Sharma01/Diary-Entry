import type { Mood } from '../types/diary';
import { 
  Smile, 
  Laugh, 
  Frown, 
  Meh, 
  AlertTriangle, 
  Coffee, 
  Angry, 
  CloudRain
} from 'lucide-react';

export const getMoodIcon = (mood: Mood) => {
  const icons = {
    Happy: Smile,
    OverJoyed: Laugh,
    Sad: Frown,
    Depressed: CloudRain,
    Tensed: AlertTriangle,
    Relaxed: Coffee,
    Angry: Angry,
    Neutral: Meh
  };
  
  return icons[mood];
};

export const getMoodColor = (mood: Mood) => {
  const colors = {
    Happy: {
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/40',
      textColor: 'text-yellow-700 dark:text-yellow-400',
      borderColor: 'border-yellow-400 dark:border-yellow-600'
    },
    OverJoyed: {
      bgColor: 'bg-orange-100 dark:bg-orange-900/40',
      textColor: 'text-orange-700 dark:text-orange-400',
      borderColor: 'border-orange-400 dark:border-orange-600'
    },
    Sad: {
      bgColor: 'bg-blue-100 dark:bg-blue-900/40',
      textColor: 'text-blue-700 dark:text-blue-400',
      borderColor: 'border-blue-400 dark:border-blue-600'
    },
    Depressed: {
      bgColor: 'bg-purple-100 dark:bg-purple-900/40',
      textColor: 'text-purple-700 dark:text-purple-400',
      borderColor: 'border-purple-400 dark:border-purple-600'
    },
    Tensed: {
      bgColor: 'bg-amber-100 dark:bg-amber-900/40',
      textColor: 'text-amber-700 dark:text-amber-400',
      borderColor: 'border-amber-400 dark:border-amber-600'
    },
    Relaxed: {
      bgColor: 'bg-green-100 dark:bg-green-900/40',
      textColor: 'text-green-700 dark:text-green-400',
      borderColor: 'border-green-400 dark:border-green-600'
    },
    Angry: {
      bgColor: 'bg-red-100 dark:bg-red-900/40',
      textColor: 'text-red-700 dark:text-red-400',
      borderColor: 'border-red-400 dark:border-red-600'
    },
    Neutral: {
      bgColor: 'bg-gray-100 dark:bg-gray-800',
      textColor: 'text-gray-700 dark:text-gray-400',
      borderColor: 'border-gray-400 dark:border-gray-600'
    }
  };
  
  return colors[mood];
};