import type { DiaryEntry, ApiResponse, PaginationInfo } from '../types/diary';

const API_URL = 'http://localhost:3000/diary';

function getAuthHeaders() {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

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
    headers: {
      ...getAuthHeaders(),
    },
    credentials: 'include',
  });
  return handleResponse<{entries: DiaryEntry[], pagination: PaginationInfo}>(response);
}

export async function getEntryById(id: string): Promise<DiaryEntry> {
  const response = await fetch(`${API_URL}/entries/${id}`, {
    headers: {
      ...getAuthHeaders(),
    },
    credentials: 'include',
  });
  return handleResponse<DiaryEntry>(response);
}

export async function createEntry(entry: Partial<DiaryEntry>): Promise<DiaryEntry> {
  const response = await fetch("http://localhost:3000/diary/entries", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(entry),
    credentials: 'include',
  });
  console.log("Response from creat-entry : ", response);
  return handleResponse<DiaryEntry>(response);
}

export async function updateEntry(id: string, entry: Partial<DiaryEntry>): Promise<DiaryEntry> {
  const response = await fetch(`${API_URL}/entries/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(entry),
    credentials: 'include',
  });
  return handleResponse<DiaryEntry>(response);
}

export async function deleteEntry(id: string): Promise<DiaryEntry> {
  const response = await fetch(`${API_URL}/entries/${id}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders(),
    },
    credentials: 'include',
  });
  return handleResponse<DiaryEntry>(response);
}