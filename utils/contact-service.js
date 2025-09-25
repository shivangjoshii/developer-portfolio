import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export const submitContactForm = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...formData,
      timestamp: serverTimestamp(),
    });

    // Send email notification using API route
    const emailResponse = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!emailResponse.ok) {
      throw new Error('Failed to send email notification');
    }

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};