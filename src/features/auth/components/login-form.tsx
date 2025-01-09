import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Flex, Input, Text, VStack } from '@chakra-ui/react';
import { PasswordInput } from 'components/ui/password-input';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLogin } from '../services/auth-service';
import useUserStore from 'store/UserStore';
import { LoginFormProps } from '../types/AuthTypes';
import Swal from 'sweetalert2';
import { useLoadingStore } from 'store/LoadingStore';

const loginSchema = z.object({
  identifier: z
    .string()
    .min(4, 'Identifier must be at least 4 characters')
    .refine(
      (val) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || val.length >= 4;
      },
      {
        message: 'Must be a valid email or at least 4 characters',
      }
    ),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormProps) => {
    setIsLoading(true);

    fetchLogin(data)
      .then((res) => {
        console.log(res);
        if (res.token) {
          setUser(res.user);
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('token', res.token);

          Swal.fire({
            title: 'Success!',
            text: 'You have successfully logged in.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#48BB78',
            background: '#2c2c2c',
            color: '#ffffff',
          }).then(() => {
            setIsLoading(false);
            navigate('/');
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: 'Login failed. Please check your credentials.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#48BB78',
          background: '#2c2c2c',
          color: '#ffffff',
        });
      }).finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box width={'350px'} p={6} rounded="md" shadow="md">
        <Flex direction={'column'} align={'flex-start'}>
          <Text fontSize="4xl" fontWeight="bold" color="green" mb={4}>
            circle
          </Text>
          <Text fontSize="2xl" fontWeight="semibold" color="white" mb={6}>
            Login to Circle
          </Text>
        </Flex>
        <VStack gap={4} align="stretch">
          <Box>
            <Input
              {...register('identifier')}
              placeholder="Email/Username *"
              color={'white'}
              borderWidth="1px"
              borderColor="gray.300"
              padding={2}
            />
            {errors.identifier && (
              <Text color="red.500" fontSize="sm" mt={2}>
                {errors.identifier.message}
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
          <Link
            style={{ fontSize: 'sm', textAlign: 'end', color: 'white' }}
            to="/forgot-password"
            color={'white'}
          >
            Forgot password?
          </Link>
          <Button
            type="submit"
            bg="green"
            color="white"
            _hover={{ bg: 'green.600' }}
            size="lg"
            borderRadius="full"
          >
            Login
          </Button>
          <Text textAlign="center" fontSize="sm" color="white" mt={4}>
            Don't have an account yet?{' '}
            <Link style={{ fontWeight: 'bold', color: 'green' }} to="/register">
              Create account
            </Link>
          </Text>
        </VStack>
      </Box>
    </form>
  );
};
