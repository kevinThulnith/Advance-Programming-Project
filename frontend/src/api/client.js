/**
 * Central API client for sending requests to the backend.
 * Automatically handles JWT token injection and standardizes error responses.
 */

const API_BASE = '/api';

const getHeaders = (requireAuth = true, isJson = true) => {
  const headers = {};
  
  if (isJson) {
    headers['Content-Type'] = 'application/json';
  }

  if (requireAuth) {
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        const user = JSON.parse(stored);
        if (user.token) {
          headers['Authorization'] = `Bearer ${user.token}`;
        }
      }
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
    }
  }

  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    try {
      const errData = await response.json();
      errorMessage = errData.message || errData.error || response.statusText;
    } catch {
      errorMessage = response.statusText || `HTTP status ${response.status}`;
    }
    throw new Error(errorMessage);
  }
  
  // Some endpoints (like delete) might return 204 No Content
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
};

export const api = {
  get: async (endpoint, requireAuth = true) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'GET',
      headers: getHeaders(requireAuth),
    });
    return handleResponse(response);
  },

  post: async (endpoint, data, requireAuth = true) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(requireAuth),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  put: async (endpoint, data, requireAuth = true) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(requireAuth),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
  
  patch: async (endpoint, data, requireAuth = true) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PATCH',
      headers: getHeaders(requireAuth),
      body: data ? JSON.stringify(data) : undefined,
    });
    return handleResponse(response);
  },

  delete: async (endpoint, requireAuth = true) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(requireAuth),
    });
    return handleResponse(response);
  }
};
