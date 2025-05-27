export type Mood = 
  | 'Happy' 
  | 'OverJoyed' 
  | 'Sad' 
  | 'Depressed' 
  | 'Tensed' 
  | 'Relaxed' 
  | 'Angry' 
  | 'Neutral';

export interface DiaryEntry {
  _id: string;
  content: string;
  date: string;
  mood: Mood;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationInfo {
  totalEntries: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}