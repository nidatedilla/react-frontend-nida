import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { PasswordInput } from 'components/ui/password-input';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../services/auth-service';
import { useLoadingStore } from 'store/LoadingStore';

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type ResetPasswordFormInputs = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setToken(params.get('token'));
  }, [location]);

  const onSubmit = async (data: ResetPasswordFormInputs) => {
    if (!token) {
      return;
    }
    
    try {
      setIsLoading(true);
      await resetPassword(token, data.newPassword);
      Swal.fire({
        title: 'Success!',
        text: 'Your password has been reset successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#48BB78',
        background: '#2c2c2c',
        color: '#ffffff',
      }).then(() => {
        navigate('/login');
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while resetting your password.',
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
      <Box width="auto" rounded="md">
        <VStack gap={4} align="stretch">
          <Box>
            <PasswordInput
              placeholder="New Password *"
              {...register('newPassword')}
              color="white"
              borderWidth="1px"
              borderColor="gray.300"
              padding={2}
            />
            {errors.newPassword && (
              <Text color="red.500" fontSize="sm" mt={2}>
                {errors.newPassword.message}
              </Text>
            )}
          </Box>
          <Box>
            <PasswordInput
              placeholder="Confirm New Password *"
              {...register('confirmPassword')}
              color="white"
              borderWidth="1px"
              borderColor="gray.300"
              padding={2}
            />
            {errors.confirmPassword && (
              <Text color="red.500" fontSize="sm" mt={2}>
                {errors.confirmPassword.message}
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
            Create New Password
          </Button>
        </VStack>
      </Box>
    </form>
  );
};

export default ResetPasswordForm;
