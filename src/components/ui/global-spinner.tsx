import React from 'react';
import { Spinner, Box, Text } from '@chakra-ui/react';
import { useLoadingStore } from 'store/LoadingStore';

const GlobalSpinner: React.FC = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      zIndex="1000"
      bg="rgba(0, 0, 0, 0.8)"
      display="flex"
      flexDirection={'column'}
      justifyContent="center"
      alignItems="center"
      p={4}
      borderRadius="md"
    >
      <Spinner size="xl" color="green.500" />
      <Text color={'green.500'}>Loading...</Text>
    </Box>
  );
};

export default GlobalSpinner;
