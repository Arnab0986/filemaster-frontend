// Automatically switch API base URL based on environment
const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api/files' // Development backend
    : 'https://filemaster-backend.onrender.com/api/files'; // Production backend

export const uploadFile = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong on the server.');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
