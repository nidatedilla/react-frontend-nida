import {
  Box,
  Button,
  Image,
  Input,
  Stack,
  Textarea,
  IconButton,
} from '@chakra-ui/react';
import {
  DialogActionTrigger,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
} from './ui/dialog';
import { Avatar } from './ui/avatar';
import { Field } from './ui/field';
import React, { useEffect, useState } from 'react';
import useUserStore from 'store/UserStore';
import Swal from 'sweetalert2';
import { HiCamera } from 'react-icons/hi';
import { updateUserData } from 'api/userApi';
import { useLoadingStore } from 'store/LoadingStore';

interface DialogEditProfileProps {
  fontSize?: string;
}

const DialogEditProfile: React.FC<DialogEditProfileProps> = ({
  fontSize = '14px',
}) => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [coverImage, setCoverImage] = useState<File | string>('');
  const [avatarImage, setAvatarImage] = useState<File | string>('');

  useEffect(() => {
    if (user) {
      setName(user.fullname || '');
      setUsername(user.username || '');
      setBio(user.bio || '');
      setCoverImage(
        user.coverImage ||
          'https://img.freepik.com/free-vector/background-gradient-green-tones_23-2148360340.jpg'
      );
      setAvatarImage(user.avatarImage || '');
    }
  }, [user]);

  const handleSave = () => {
    setIsLoading(true);
    Swal.fire({
      title: 'Are you sure?',
      text: "You're about to update your profile",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#48BB78',
      cancelButtonColor: 'dark',
      confirmButtonText: 'Yes, update it!',
      background: '#2c2c2c',
      color: '#ffffff',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedData = {
          fullname: name,
          username,
          bio,
          coverImage,
          avatarImage,
        };
        const updatedUser = await updateUserData(updatedData);
        setIsLoading(false);

        if (updatedUser) {
          setUser({
            ...user,
            ...updatedUser,
          });
          setAvatarImage(updatedUser.avatarImage || avatarImage);
          setCoverImage(updatedUser.coverImage || coverImage);
        }
      } else {
        setIsLoading(false);
      }
    });
  };

  if (!user) {
    return null;
  }

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'cover' | 'avatar'
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === 'cover') {
        setCoverImage(file);
      } else {
        setAvatarImage(file);
      }
    }
  };

  return (
    <DialogRoot size="md">
      <DialogBackdrop />
      <DialogTrigger asChild>
        <Button p={0} bg={'transparent'} fontSize={fontSize}>
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent bg="gray.900" color="white">
        <DialogCloseTrigger
          borderColor="whiteAlpha.600"
          color="whiteAlpha.600"
          borderRadius="full"
          _hover={{ bg: 'gray.700' }}
        />
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box height="160px" position="relative">
            <Box position="relative">
              <Image
                src={
                  typeof coverImage === 'string'
                    ? coverImage
                    : URL.createObjectURL(coverImage)
                }
                borderRadius="md"
                height="100px"
                width="full"
                objectFit="cover"
              />
              <IconButton
                aria-label="Change cover"
                size="sm"
                position="absolute"
                right={2}
                bottom={2}
                borderRadius="full"
                bg="blackAlpha.600"
                _hover={{ bg: 'blackAlpha.800' }}
                onClick={() => document.getElementById('coverInput')?.click()}
              >
                <HiCamera />
              </IconButton>
              <input
                id="coverInput"
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'cover')}
              />
            </Box>

            <Box position="relative" width="fit-content">
              <Avatar
                src={
                  typeof avatarImage === 'string'
                    ? avatarImage
                    : URL.createObjectURL(avatarImage)
                }
                name={name}
                width="80px"
                height="80px"
                shape="full"
                borderWidth="3px"
                borderColor="gray.900"
                insetY="-10"
                insetX="5"
                cursor="pointer"
              />
              <IconButton
                aria-label="Change avatar"
                size="xs"
                position="absolute"
                right={'1'}
                bottom={'16'}
                borderRadius="full"
                bg="blackAlpha.600"
                _hover={{ bg: 'blackAlpha.800' }}
                onClick={() => document.getElementById('avatarInput')?.click()}
              >
                <HiCamera />
              </IconButton>
              <input
                id="avatarInput"
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'avatar')}
              />
            </Box>
          </Box>

          <Stack p={0} gap={4}>
            <Field
              color="whiteAlpha.600"
              label="Name"
              borderWidth="1px"
              borderRadius="md"
              borderColor="gray.700"
              p={2}
              _hover={{ borderColor: 'gray.600' }}
              transition="all 0.2s"
            >
              <Input
                value={name}
                color="white"
                fontSize="sm"
                size="xs"
                border="none"
                variant="flushed"
                onChange={(e) => setName(e.target.value)}
                _focus={{ outline: 'none' }}
              />
            </Field>
            <Field
              color="whiteAlpha.600"
              label="Username"
              borderWidth="1px"
              borderRadius="md"
              borderColor="gray.700"
              p={2}
              _hover={{ borderColor: 'gray.600' }}
              transition="all 0.2s"
            >
              <Input
                value={username}
                color="white"
                fontSize="sm"
                size="xs"
                border="none"
                variant="flushed"
                onChange={(e) => setUsername(e.target.value)}
                _focus={{ outline: 'none' }}
              />
            </Field>
            <Field
              color="whiteAlpha.600"
              label="Bio"
              borderWidth="1px"
              borderRadius="md"
              borderColor="gray.700"
              p={2}
              _hover={{ borderColor: 'gray.600' }}
              transition="all 0.2s"
            >
              <Textarea
                value={bio}
                height="90px"
                color="white"
                fontSize="sm"
                size="xs"
                border="none"
                variant="flushed"
                onChange={(e) => setBio(e.target.value)}
                _focus={{ outline: 'none' }}
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              variant="outline"
              borderRadius="full"
              color="whiteAlpha.600"
              borderColor="whiteAlpha.600"
              _hover={{ bg: 'gray.700' }}
              onClick={() => setIsLoading(false)}
            >
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button
            onClick={handleSave}
            bg="green"
            borderRadius="full"
            _hover={{ bg: 'green.500' }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default DialogEditProfile;
