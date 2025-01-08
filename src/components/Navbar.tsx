import { Box, Button, Icon, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  HiHome,
  HiOutlineHome,
  HiOutlineLogout,
  HiOutlineSearch,
  HiSearch,
} from 'react-icons/hi';
import {
  HiHeart,
  HiOutlineHeart,
  HiOutlineUser,
  HiUser,
} from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import DialogCreatePost from './DialogCreatePost';
import Swal from 'sweetalert2';

type navbarProps = { onClick: () => void };

const Navbar: React.FC<navbarProps> = ({ onClick }) => {
  const [activeTab, setActiveTab] = useState<string>('');

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
      confirmButtonColor: '#48BB78',
      cancelButtonColor: 'dark',
      background: '#2c2c2c',
      color: '#ffffff',
    }).then((result) => {
      if (result.isConfirmed) {
        onClick();
      }
    });
  };

  return (
    <Box display="flex" flexDirection="column" bg="gray.900" gap={5} py={2}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems={'start'}
        color={'white'}
        gap={3}
        px={10}
      >
        <Text fontSize="5xl" fontWeight="bold" color="green">
          circle
        </Text>
        <Box display={'flex'} flexDirection={'row'} gap={2}>
          <Icon fontSize={'2xl'}>
            {activeTab == 'home' ? <HiHome /> : <HiOutlineHome />}
          </Icon>
          <Text
            fontWeight={activeTab === 'home' ? 'bold' : 'normal'}
            color="white"
          >
            <Link onClick={() => handleSetActiveTab('home')} to="/">
              Home
            </Link>
          </Text>
        </Box>
        <Box display={'flex'} flexDirection={'row'} gap={2}>
          <Icon fontSize={'2xl'}>
            {activeTab === 'serach' ? <HiSearch /> : <HiOutlineSearch />}
          </Icon>
          <Text fontWeight={activeTab === 'search' ? 'bold' : 'normal'}>
            <Link onClick={() => handleSetActiveTab('search')} to={'search'}>
              Search
            </Link>
          </Text>
        </Box>
        <Box display={'flex'} flexDirection={'row'} gap={2}>
          <Icon fontSize={'2xl'}>
            {activeTab === 'follow' ? <HiHeart /> : <HiOutlineHeart />}
          </Icon>
          <Text fontWeight={activeTab === 'follow' ? 'bold' : 'normal'}>
            <Link onClick={() => handleSetActiveTab('follow')} to={'/follow'}>
              Follow
            </Link>
          </Text>
        </Box>
        <Box display={'flex'} flexDirection={'row'} gap={2}>
          <Icon fontSize={'2xl'}>
            {activeTab === 'profile' ? <HiUser /> : <HiOutlineUser />}
          </Icon>
          <Text
            fontWeight={activeTab === 'profile' ? 'bold' : 'normal'}
            color="white"
          >
            <Link onClick={() => handleSetActiveTab('profile')} to={'/profile'}>
              Profile
            </Link>
          </Text>
        </Box>
      </Box>
      <DialogCreatePost />
      <Button
        onClick={handleLogout}
        px={10}
        color={'white'}
        justifyContent={'start'}
      >
        Logout
        <Icon fontSize={'2xl'}>
          <HiOutlineLogout />
        </Icon>
      </Button>
    </Box>
  );
};

export default Navbar;
