import axios, { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import { API_ENDPOINTS } from 'utils/constants';

export const getAllUsers = async (token: string) => {
  try {
    const res: AxiosResponse = await axios.get(`${API_ENDPOINTS.USERS}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);

    return res.data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getCurrentUser = async (token: string) => {
  try {
    const res: AxiosResponse = await axios.get(API_ENDPOINTS.USERS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Something went wrong');
    } else {
      throw error;
    }
  }
};

export const getUserById = async (id: number, token: string) => {
  try {
    const res: AxiosResponse = await axios.get(`${API_ENDPOINTS.USERS}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Something went wrong');
    } else {
      throw error;
    }
  }
};

export const updateUserData = async (updatedUserData: any) => {
  const token = localStorage.getItem('token');

  const formData = new FormData();
  formData.append('fullname', updatedUserData.fullname);
  formData.append('username', updatedUserData.username);
  formData.append('bio', updatedUserData.bio);

  if (updatedUserData.coverImage) {
    formData.append('coverImage', updatedUserData.coverImage);
  }
  if (updatedUserData.avatarImage) {
    formData.append('avatarImage', updatedUserData.avatarImage);
  }

  try {
    const response = await axios.put(API_ENDPOINTS.USERS, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    Swal.fire({
      title: 'Success!',
      text: 'Profile updated successfully!',
      icon: 'success',
      background: '#2c2c2c',
      color: '#ffffff',
      confirmButtonText: 'OK',
    });

    return response.data.user;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Failed to update profile.';

    Swal.fire({
      title: 'Error!',
      text: errorMessage,
      icon: 'error',
      background: '#2c2c2c',
      color: '#ffffff',
      confirmButtonText: 'OK',
    });
    console.error('Error updating user:', errorMessage);
  }
};
