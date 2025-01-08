import axios, { AxiosResponse } from 'axios';
import { API_ENDPOINTS } from 'utils/constants';

export const getAllThreads = async (token: string) => {
  try {
    const res: AxiosResponse = await axios.get(API_ENDPOINTS.THREADS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.threads;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Something went wrong');
    } else {
      throw error;
    }
  }
};

export const getThreadsByUser = async (token: string) => {
  try {
    const res: AxiosResponse = await axios.get(
      `${API_ENDPOINTS.THREADS}/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.threads;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Something went wrong');
    } else {
      throw error;
    }
  }
};

export const getThreadById = async (threadId: number, token: string) => {
  try {
    const res: AxiosResponse = await axios.get(
      `${API_ENDPOINTS.THREADS}/${threadId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error fetching thread:', error);
    throw error;
  }
};

export const getThreadsByUserId = async (userId: number, token: string) => {
  try {
    const res: AxiosResponse = await axios.get(
      `${API_ENDPOINTS.THREADS}/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error fetching threads for user:', error);
    throw error;
  }
};

export const createThread = async (
  threadData: { content: string; image: File | null },
  token: string
) => {
  try {
    const formData = new FormData();
    formData.append('content', threadData.content);
    if (threadData.image) {
      formData.append('image', threadData.image);
    }

    const response = await axios.post(API_ENDPOINTS.THREADS, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating thread:', error);
    throw error;
  }
};

export const updateThread = async (
  threadId: number,
  threadData: { content: string; image: File | null },
  token: string
) => {
  try {
    const formData = new FormData();
    formData.append('content', threadData.content);

    if (threadData.image) {
      formData.append('image', threadData.image);
    }

    const response = await axios.post(`${API_ENDPOINTS.THREADS}/${threadId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating thread:', error);
    throw error;
  }
};

export const deleteThread = async (threadId: number, token: string) => {
  try {
    const response = await axios.delete(`${API_ENDPOINTS.THREADS}/${threadId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting thread:', error);
    throw error;
  }
};
