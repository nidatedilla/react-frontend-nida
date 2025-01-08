import { Box, Button, HStack, IconButton, Input } from '@chakra-ui/react';
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Avatar } from './ui/avatar';
import { LuImagePlus, LuX } from 'react-icons/lu';
import useUserStore from 'store/UserStore';
import useThreadStore from 'store/ThreadStore';
import { createThread } from 'api/threadApi';
import { useState } from 'react';
import { useLoadingStore } from 'store/LoadingStore';

const DialogCreatePost = () => {
  const user = useUserStore((state) => state.user);
  const { threads, setThreads } = useThreadStore();
  const token = localStorage.getItem('token');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileKey, setFileKey] = useState(0);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  const handleCreatePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (token && content) {
      setIsLoading(true);
      try {
        const newThread = await createThread({ content, image }, token);

        const threadWithUser = {
          ...newThread,
          author: {
            fullname: user?.fullname || '',
            avatarImage: user?.avatarImage || '',
            username: user?.username || '',
          },
          likesCount: 0,
          isLiked: false,
          repliesCount: 0,
          duration: newThread.duration,
        };

        setThreads([threadWithUser, ...threads]);

        setContent('');
        setImage(null);
        setImagePreview(null);
        setFileKey((prev) => prev + 1);
      } catch (error) {
        console.error('Error creating thread:', error);
      } finally {
        setIsLoading(false);
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

  return (
    <DialogRoot size={'md'}>
      <DialogBackdrop />
      <DialogTrigger asChild>
        <Button
          fontSize={'15px'}
          bg={'green'}
          color={'white'}
          p={5}
          mx={5}
          borderRadius={'full'}
        >
          Create Post
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
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <DialogBody>
          <HStack>
            <Avatar size={'sm'} src="" name="Nida Tedilla" />
            <Input
              value={content}
              placeholder={'What is happening?!'}
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
            onClick={handleCreatePost}
          >
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
export default DialogCreatePost;