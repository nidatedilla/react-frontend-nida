import React from 'react';
import { Box } from '@chakra-ui/react';
import { LoginForm } from './components/login-form';

const Login: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bg="gray.900"
      minH="100vh"
      pt={10}
    >
      <LoginForm />
    </Box>
  );
};

export default Login;