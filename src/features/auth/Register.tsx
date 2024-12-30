import { Box } from '@chakra-ui/react';
import { RegisterForm } from './components/register-form';
import React from 'react';

const Register: React.FC = () => {

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bg="gray.900"
      minH="100vh"
      pt={10}
    >
      <RegisterForm />
    </Box>
  );
}

export default Register;
