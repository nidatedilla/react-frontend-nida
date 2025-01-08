import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Flex, Input, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { forgotPassword } from '../services/auth-service';
import { useLoadingStore } from 'store/LoadingStore';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormInputs = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    try {
      setIsLoading(true);
      await forgotPassword(data.email);
      Swal.fire({
        title: 'Success!',
        text: 'Password reset instructions have been sent to your email.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#48BB78',
        background: '#2c2c2c',
        color: '#ffffff',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while sending password reset instructions.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d9534f',
        background: '#2c2c2c',
        color: '#ffffff',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box width="350px" p={6} rounded="md" shadow="md">
        <Flex direction="column" align="flex-start">
          <Text fontSize="4xl" fontWeight="bold" color="green" mb={4}>
            circle
          </Text>
          <Text fontSize="2xl" fontWeight="semibold" color="white" mb={6}>
            Forgot Password
          </Text>
        </Flex>
        <VStack gap={4} align="stretch">
          <Box>
            <Input
              {...register('email')}
              placeholder="Email *"
              color="white"
              borderWidth="1px"
              borderColor="gray.300"
              padding={2}
            />
            {errors.email && (
              <Text color="red.500" fontSize="sm" mt={2}>
                {errors.email.message}
              </Text>
            )}
          </Box>
          <Button
            type="submit"
            bg="green"
            color="white"
            _hover={{ bg: 'green.600' }}
            size="lg"
            borderRadius="full"
          >
            Send Instruction
          </Button>
          <Text textAlign="center" fontSize="sm" color="white" mt={4}>
            Already have an account?{' '}
            <Link style={{ color: 'green', fontWeight: 'bold' }} to="/login">
              Login
            </Link>
          </Text>
        </VStack>
      </Box>
    </form>
  );
};

export default ForgotPasswordForm;
