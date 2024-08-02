const BASE_URL = 'http://localhost:5001/api/users';
let token = ''; // Variable to store JWT token

// Function to set JWT token
export const setToken = (newToken) => {
  token = newToken;
};

// Function to clear JWT token
export const clearToken = () => {
  token = '';
};

// Function to handle fetch requests with JWT token
const fetchWithToken = async (url, options = {}) => {
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

export const loginUser = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    setToken(data.token); // Store JWT token
    return data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    setToken(data.token); // Store JWT token
    return data;
  } catch (error) {
    throw error;
  }
};

export const createComplaint = async (formData) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/complaints`, {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to create complaint');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
