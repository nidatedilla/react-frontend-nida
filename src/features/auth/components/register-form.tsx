import { Box, Button, Flex, Input, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordInput } from 'components/ui/password-input';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import useUserStore from 'store/UserStore';
import { registerUser } from '../services/auth-service';
import Swal from 'sweetalert2';
import { useLoadingStore } from 'store/LoadingStore';

const registerSchema = z.object({
  fullname: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    setIsLoading(true);
    try {
      const res = await registerUser(
        data.fullname,
        data.email,
        data.username,
        data.password
      );

      console.log('Register response:', res);

      if (res.user) {
        setUser(res.user);
        localStorage.setItem('user', JSON.stringify(res.user));

        Swal.fire({
          title: 'Success!',
          text: 'Registration successful. Please log in.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#48BB78',
          background: '#2c2c2c',
          color: '#ffffff',
        }).then(() => {
          setIsLoading(false);
          navigate('/login');
        });
      } else {
        throw new Error('Registration failed');
      }
    } catch (error: any) {
      console.error('Error caught:', error);

      let errorMessage = 'An unexpected error occurred';

      if (error.message === 'Email already exists') {
        errorMessage = 'Email already exists';
      } else if (error.message === 'Username already exists') {
        errorMessage = 'Username already exists';
      }

      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#48BB78',
        background: '#2c2c2c',
        color: '#ffffff',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box width={'350px'} p={6} rounded="md" shadow="md">
        <Flex direction={'column'} align={'flex-start'}>
          <Text fontSize="4xl" fontWeight="bold" color="green" mb={4}>
            circle
          </Text>
          <Text fontSize="2xl" fontWeight="semibold" color="white" mb={6}>
            Create account Circle
          </Text>
        </Flex>
        <VStack gap={4} align="stretch">
          <Box>
            <Input
              {...register('fullname')}
              placeholder="Full Name *"
              color={'white'}
              borderWidth="1px"
              borderColor="gray.300"
              padding={2}
            />
            {errors.fullname && (
              <Text color="red.500" fontSize="sm" mt={2}>
                {errors.fullname.message}
              </Text>
            )}
          </Box>
          <Box>
            <Input
              {...register('email')}
              placeholder="Email *"
              color={'white'}
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
          <Box>
            <Input
              {...register('username')}
              placeholder="Username *"
              color={'white'}
              borderWidth="1px"
              borderColor="gray.300"
              padding={2}
            />
            {errors.username && (
              <Text color="red.500" fontSize="sm" mt={2}>
                {errors.username.message}
              </Text>
            )}
          </Box>
          <Box>
            <PasswordInput
              {...register('password')}
              placeholder="Password *"
              color={'white'}
              borderWidth="1px"
              borderColor="gray.300"
              padding={2}
            />
            {errors.password && (
              <Text color="red.500" fontSize="sm" mt={2}>
                {errors.password.message}
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
            Create
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
