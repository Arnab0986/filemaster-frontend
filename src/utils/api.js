const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api/files';

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
