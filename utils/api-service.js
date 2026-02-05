import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Projects API
export const projectsAPI = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await apiClient.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  },

  getFeatured: async () => {
    try {
      const response = await apiClient.get('/projects/featured/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      throw error;
    }
  },
};

// Contact API
export const contactAPI = {
  submit: async (formData) => {
    try {
      const response = await apiClient.post('/contact', formData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact:', error);
      throw error;
    }
  },
};

// Admin API
export const adminAPI = {
  // Projects
  getAllProjects: async (adminKey) => {
    try {
      const response = await apiClient.get('/admin/projects', {
        headers: {
          'x-admin-key': adminKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching admin projects:', error);
      throw error;
    }
  },

  createProject: async (projectData, adminKey) => {
    try {
      const response = await apiClient.post('/admin/projects', projectData, {
        headers: {
          'x-admin-key': adminKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  updateProject: async (id, projectData, adminKey) => {
    try {
      const response = await apiClient.put(`/admin/projects/${id}`, projectData, {
        headers: {
          'x-admin-key': adminKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  deleteProject: async (id, adminKey) => {
    try {
      const response = await apiClient.delete(`/admin/projects/${id}`, {
        headers: {
          'x-admin-key': adminKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  reorderProjects: async (projects, adminKey) => {
    try {
      const response = await apiClient.patch('/admin/projects/reorder', { projects }, {
        headers: {
          'x-admin-key': adminKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error reordering projects:', error);
      throw error;
    }
  },

  // Contacts
  getContacts: async (adminKey) => {
    try {
      const response = await apiClient.get('/contact', {
        headers: {
          'x-admin-key': adminKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  markAsRead: async (id, adminKey) => {
    try {
      const response = await apiClient.patch(`/contact/${id}/read`, {}, {
        headers: {
          'x-admin-key': adminKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error marking contact as read:', error);
      throw error;
    }
  },

  deleteContact: async (id, adminKey) => {
    try {
      const response = await apiClient.delete(`/contact/${id}`, {
        headers: {
          'x-admin-key': adminKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  },
};

export default apiClient;
