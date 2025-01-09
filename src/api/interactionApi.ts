import axios, { AxiosResponse } from 'axios';
import { API_ENDPOINTS } from 'utils/constants';

export const getThreadReplies = async (threadId: number, token: string) => {
  try {
    const res: AxiosResponse = await axios.get(
      `${API_ENDPOINTS.INTERACTION}/replies/${threadId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Replies:", res.data);
    
    return res.data.replies;
  } catch (error) {
    console.error('Error fetching replies:', error);
    throw error;
  }
};

export const createReply = async (
  replyData: { content: string; image: File | null },
  threadId: number,
  token: string
) => {
  try {
    const formData = new FormData();
    formData.append('content', replyData.content);
    if (replyData.image) {
      formData.append('image', replyData.image);
    }
    console.log('FormData content:', [...formData.entries()]);

    const response = await axios.post(
      `${API_ENDPOINTS.INTERACTION}/reply/${threadId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    return response.data.reply;
  } catch (error) {
    console.error('Error creating reply:', error);
    throw error;
  }
};

export const toggleLikeThread = async (threadId: number, token: string) => {
  try {
    const res: AxiosResponse = await axios.post(
      `${API_ENDPOINTS.INTERACTION}/like/${threadId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Something went wrong');
    } else {
      throw error;
    }
  }
};

export const toggleFollowUser = async (followingId: number, token: string) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.INTERACTION}/follow/${followingId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error toggling follow:', error);
    throw error;
  }
};

export const toggleReplyLike = async (replyId: number, token: string) => {
  try {
    const res: AxiosResponse = await axios.post(
      `${API_ENDPOINTS.INTERACTION}/reply/like/${replyId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Something went wrong');
    } else {
      throw error;
    }
  }
};

export const deleteReply = async (replyId: number, token: string) => {
  try {
    const response = await axios.delete(`${API_ENDPOINTS.INTERACTION}/reply/${replyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting reply:', error);
    throw error;
  }
};
