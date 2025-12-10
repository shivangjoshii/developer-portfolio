export const submitContactForm = async (data) => {
  try {
    // Check if we're in production (Netlify) or development (localhost)
    const apiUrl = process.env.NODE_ENV === 'production' 
      ? '/.netlify/functions/contact'  // Netlify function endpoint
      : '/api/contact';                 // Next.js API route for local dev

    const response = await fetch(apiUrl, {
      method:  'POST',
      headers:  {
        'Content-Type':  'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send message');
    }

    return await response.json();
  } catch (error) {
    console.error('Contact service error:', error);
    throw error;
  }
};