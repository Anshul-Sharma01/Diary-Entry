import type { DiaryEntry, ApiResponse, PaginationInfo } from '../types/diary';
import { apiConfig } from '../config/api';

const API_URL = apiConfig.diaryUrl;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  
  const responseData: ApiResponse<T> = await response.json();
  if (!responseData.success) {
    throw new Error(responseData.message || 'Operation failed');
  }
  
  return responseData.data;
}

export async function getAllEntries(page: number = 1): Promise<{entries: DiaryEntry[], pagination: PaginationInfo}> {
  const response = await fetch(`${API_URL}/entries?page=${page}`, {
    credentials: 'include'
  });
  return handleResponse<{entries: DiaryEntry[], pagination: PaginationInfo}>(response);
}

export async function getEntryById(id: string): Promise<DiaryEntry> {
  const response = await fetch(`${API_URL}/entries/${id}`, {
    credentials: 'include'
  });
  return handleResponse<DiaryEntry>(response);
}

export async function createEntry(entry: Partial<DiaryEntry>): Promise<DiaryEntry> {
  const response = await fetch(`${API_URL}/entries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(entry),
  });
  return handleResponse<DiaryEntry>(response);
}

export async function updateEntry(id: string, entry: Partial<DiaryEntry>): Promise<DiaryEntry> {
  const response = await fetch(`${API_URL}/entries/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entry),
    credentials: 'include'
  });
  return handleResponse<DiaryEntry>(response);
}

export async function deleteEntry(id: string): Promise<DiaryEntry> {
  const response = await fetch(`${API_URL}/entries/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  return handleResponse<DiaryEntry>(response);
}