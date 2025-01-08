import axios, { AxiosResponse } from 'axios';
import { API_ENDPOINTS } from 'utils/constants';
import { LoginFormProps } from '../types/AuthTypes';

export const fetchLogin = async (data: LoginFormProps) => {
  try {
    const res: AxiosResponse = await axios.post(
      `${API_ENDPOINTS.AUTH}/login`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Something went wrong');
    } else {
      console.error('Unexpected Error', error);
      throw error;
    }
  }
};

export const registerUser = async (
  fullname: string,
  email: string,
  username: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.AUTH}/register`, {
      fullname,
      email,
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.AUTH}/forgot-password`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.AUTH}/reset-password`, {
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
