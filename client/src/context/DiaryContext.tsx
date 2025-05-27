import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { DiaryEntry, Mood, PaginationInfo } from '../types/diary';
import * as diaryService from '../services/diaryServices';

interface DiaryContextType {
  entries: DiaryEntry[];
  loading: boolean;
  error: string | null;
  pagination: PaginationInfo;
  currentEntry: DiaryEntry | null;
  fetchEntries: (page?: number) => Promise<void>;
  fetchEntryById: (id: string) => Promise<void>;
  createEntry: (entry: Partial<DiaryEntry>) => Promise<void>;
  updateEntry: (id: string, entry: Partial<DiaryEntry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  setCurrentEntry: (entry: DiaryEntry | null) => void;
}

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

export const useDiary = () => {
  const context = useContext(DiaryContext);
  if (context === undefined) {
    throw new Error('useDiary must be used within a DiaryProvider');
  }
  return context;
};

interface DiaryProviderProps {
  children: ReactNode;
}

export const DiaryProvider: React.FC<DiaryProviderProps> = ({ children }) => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentEntry, setCurrentEntry] = useState<DiaryEntry | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    totalEntries: 0,
    totalPages: 0,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false
  });

  const fetchEntries = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await diaryService.getAllEntries(page);
      setEntries(response.entries);
      setPagination(response.pagination);
    } catch (err) {
      setError('Failed to fetch diary entries');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEntryById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const entry = await diaryService.getEntryById(id);
      setCurrentEntry(entry);
    } catch (err) {
      setError('Failed to fetch diary entry');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createEntry = async (entry: Partial<DiaryEntry>) => {
    setLoading(true);
    setError(null);
    try {
      await diaryService.createEntry(entry);
      await fetchEntries(1); // Refresh to first page
    } catch (err) {
      setError('Failed to create diary entry');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateEntry = async (id: string, entry: Partial<DiaryEntry>) => {
    setLoading(true);
    setError(null);
    try {
      await diaryService.updateEntry(id, entry);
      await fetchEntries(pagination.currentPage);
      if (currentEntry && currentEntry._id === id) {
        setCurrentEntry({ ...currentEntry, ...entry });
      }
    } catch (err) {
      setError('Failed to update diary entry');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await diaryService.deleteEntry(id);
      await fetchEntries(pagination.currentPage);
      if (currentEntry && currentEntry._id === id) {
        setCurrentEntry(null);
      }
    } catch (err) {
      setError('Failed to delete diary entry');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const value = {
    entries,
    loading,
    error,
    pagination,
    currentEntry,
    fetchEntries,
    fetchEntryById,
    createEntry,
    updateEntry,
    deleteEntry,
    setCurrentEntry
  };

  return <DiaryContext.Provider value={value}>{children}</DiaryContext.Provider>;
};