import React from 'react';
import { Box } from '@chakra-ui/react';
import ForgotPasswordForm from './components/forgotPassword-form';

const ForgotPassword: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bg="gray.900"
      minH="100vh"
      pt={10}
    >
      <ForgotPasswordForm />
    </Box>
  );
};

export default ForgotPassword;