import axios from 'axios';

export const submitContactForm = async (formData) => {
  try {
    // Send to Express backend API
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/contact`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.success) {
      return { success: true, ...response.data };
    } else {
      throw new Error(response.data.message || 'Failed to submit contact form');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};