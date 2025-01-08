import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import ResetPasswordForm from './components/resetPassword-form';

const ResetPassword: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bg="gray.900"
      minH="100vh"
      pt={10}
    >
      <Box width="350px" p={6} rounded="md" shadow="md">
        <Flex direction="column" align="flex-start">
          <Text fontSize="4xl" fontWeight="bold" color="green" mb={4}>
            circle
          </Text>
          <Text fontSize="2xl" fontWeight="semibold" color="white" mb={6}>
            Reset Password
          </Text>
        </Flex>
        <ResetPasswordForm />
      </Box>
    </Box>
  );
};

export default ResetPassword;