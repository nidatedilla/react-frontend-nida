import axios, { AxiosResponse } from 'axios';
import { API_ENDPOINTS } from 'utils/constants';
import { LoginFormProps } from '../types/AuthTypes';

export const fetchLogin = async (data: LoginFormProps) => {
  try {
    const res: AxiosResponse = await axios.post(API_ENDPOINTS.LOGIN, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

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
    const response = await axios.post(API_ENDPOINTS.REGISTER, {
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
