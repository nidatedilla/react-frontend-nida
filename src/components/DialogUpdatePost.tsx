import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import { LuFileEdit, LuImagePlus, LuX } from 'react-icons/lu';
import useUserStore from 'store/UserStore';
import useThreadStore from 'store/ThreadStore';
import { updateThread } from 'api/threadApi';
import { useState, useEffect } from 'react';
import { useLoadingStore } from 'store/LoadingStore';
import { Avatar } from './ui/avatar';
import {
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
import Swal from 'sweetalert2'; // Import SweetAlert2

interface DialogUpdatePostProps {
  threadId: number;
  initialContent: string;
  initialImage: string;
  onClose: () => void;
}

const DialogUpdatePost = ({
  threadId,
  initialContent,
  initialImage,
  onClose,
}: DialogUpdatePostProps) => {
  const user = useUserStore((state) => state.user);
  const { threads, setThreads } = useThreadStore();
  const token = localStorage.getItem('token');
  const [content, setContent] = useState(initialContent || '');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialImage || null
  );
  const [fileKey, setFileKey] = useState(0);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  const handleUpdatePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: 'Are you sure you want to update this post?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#48BB78',
      cancelButtonColor: 'dark',
      confirmButtonText: 'Yes, update it!',
      background: '#2c2c2c',
      color: '#ffffff',
    });

    if (result.isConfirmed) {
      if (token && threadId && content) {
        setIsLoading(true);
        try {
          const updatedThread = await updateThread(
            threadId,
            { content, image },
            token
          );

          const updatedThreads = threads.map((thread) =>
            thread.id === threadId
              ? {
                  ...thread,
                  content: updatedThread.content,
                  image: updatedThread.image,
                }
              : thread
          );

          setThreads(updatedThreads);

          onClose();

          setContent('');
          setImage(null);
          setImagePreview(null);
          setFileKey((prev) => prev + 1);

          Swal.fire({
            title: 'Updated!',
            text: 'Your post has been updated.',
            icon: 'success',
            background: '#2c2c2c',
            color: '#ffffff',
            confirmButtonColor: '#48BB78',
          });
        } catch (error) {
          console.error('Error updating thread:', error);

          Swal.fire({
            title: 'Error',
            text: 'There was an error updating your post.',
            icon: 'error',
            background: '#2c2c2c',
            color: '#ffffff',
            confirmButtonColor: '#FF6B6B',
          });
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    setFileKey((prev) => prev + 1);
  };

  useEffect(() => {
    setContent(initialContent);
    setImagePreview(initialImage);
  }, [initialContent, initialImage]);

  return (
    <DialogRoot size={'md'}>
      <DialogBackdrop />
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          justifyContent="flex-start"
          color="whiteAlpha.800"
          fontSize="sm"
          _hover={{ bg: 'gray.700', color: 'white' }}
        >
          <Flex align="center" gap="2">
            <Box>
              <LuFileEdit />
            </Box>
            <Text>Edit</Text>
          </Flex>
        </Button>
      </DialogTrigger>
      <DialogContent bg="gray.900" color={'white'}>
        <DialogCloseTrigger
          borderColor={'whiteAlpha.600'}
          color={'whiteAlpha.600'}
          borderRadius={'full'}
          _hover={{ bg: 'gray.700' }}
        />
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <HStack>
            <Avatar
              size={'sm'}
              src={user?.avatarImage}
              name={user?.fullname || 'User'}
            />
            <Input
              value={content}
              placeholder={'Edit your post...'}
              variant={'flushed'}
              px={2}
              color="white"
              border={'none'}
              _placeholder={{ color: 'whiteAlpha.600', fontSize: '18px' }}
              onChange={(e) => setContent(e.target.value)}
            />
          </HStack>
          {imagePreview && (
            <Box mt={2} position="relative">
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
              <IconButton
                aria-label="Remove Image"
                position="absolute"
                top="0"
                right="0"
                size="sm"
                bg="gray.800"
                color="white"
                onClick={handleRemoveImage}
              >
                <LuX />
              </IconButton>
            </Box>
          )}
        </DialogBody>
        <DialogFooter
          mx={3}
          justifyContent={'space-between'}
          borderTopWidth={'1px'}
          borderColor={'gray.700'}
          p={1}
          pb={3}
        >
          <Box position="relative">
            <label htmlFor="image-upload">
              <IconButton
                as="span"
                aria-label="Upload Image"
                fontSize="2xl"
                color="green"
                size="lg"
              >
                <LuImagePlus />
              </IconButton>
            </label>

            <Input
              key={fileKey}
              type="file"
              id="image-upload"
              accept="image/*"
              display="none"
              onChange={handleImageChange}
            />
          </Box>

          <Button
            bg="green"
            color="white"
            size="xs"
            borderRadius="2xl"
            fontSize="14px"
            px={4}
            _hover={{ bg: 'green.600' }}
            onClick={handleUpdatePost}
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default DialogUpdatePost;
