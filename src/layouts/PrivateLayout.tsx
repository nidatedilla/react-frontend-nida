import { Box } from '@chakra-ui/react';
import Footer from 'components/Footer';
import MyProfile from 'components/MyProfile';
import Navbar from 'components/Navbar';
import Suggestion from 'components/Suggestion';
import { Outlet, useNavigate } from 'react-router-dom';
import useUserStore from 'store/UserStore';

const PrivateLayout = () => {
  const navigate = useNavigate();
  const { logout } = useUserStore();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  const isProfilePage = location.pathname.startsWith('/profile');

  return (
    <Box
      display="flex"
      bg="gray.900"
      minH="100vh"
      height="100vh"
      overflow="hidden"
    >
      <Box width="20%" height="100vh" overflow="hidden">
        <Navbar onClick={onLogout} />
      </Box>
      <Box
        flex="1"
        overflowY="auto"
        css={{
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'gray.700',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'gray.800',
            borderRadius: 'md',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'gray.600',
          },
        }}
      >
        <Box
          borderXWidth="1px"
          borderColor="gray.700"
          pt={6}
          minH="100vh"
          height="auto"
        >
          <Outlet />
        </Box>
      </Box>

      <Box
        width="30%"
        py={6}
        height="100vh"
        overflowY="auto"
        css={{
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'gray.700',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'gray.800',
            borderRadius: 'md',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'gray.600',
          },
        }}
      >
        {!isProfilePage && <MyProfile />}
        <Suggestion />
        <Footer />
      </Box>
    </Box>
  );
};

export default PrivateLayout;
