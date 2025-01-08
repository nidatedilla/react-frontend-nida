import PrivateRoute from 'routes/PrivateRoute';
import { Routes, Route } from 'react-router-dom';
import Login from 'features/auth/Login';
import Register from 'features/auth/Register';
import ForgotPassword from 'features/auth/ForgotPassword';
import ResetPassword from 'features/auth/ResetPassword';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import Status from 'pages/Status';
import Search from 'pages/Search';
import Follow from 'pages/Follow';
import { UserProvider } from 'hooks/contexts/UserContexts';
import useUserStore from 'store/UserStore';
import GlobalSpinner from 'components/ui/global-spinner';
import ProfileOtherUser from 'components/ProfileOtherUser';
import { Box, Text } from '@chakra-ui/react';

export default function App() {
  const { user } = useUserStore();

  return (
    <div>
      <Box
        p={2}
        display={{ base: 'flex', lg: 'none' }}
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        bg="rgba(0, 0, 0, 0.8)"
        color="white"
        justifyContent="center"
        alignItems="center"
        zIndex="overlay"
      >
        <Text fontSize="2xl" textAlign={'center'}>
          This website is best viewed on a desktop device.
        </Text>
      </Box>

      <GlobalSpinner />
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<PrivateRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<ProfileOtherUser />} />
            <Route path="/status/:id" element={<Status />} />
            <Route path="/search" element={<Search />} />
            <Route path="/follow" element={<Follow />} />
          </Route>
        </Routes>
      </UserProvider>
    </div>
  );
}
