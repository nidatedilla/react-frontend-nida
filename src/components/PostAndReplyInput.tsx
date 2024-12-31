import { Box, Button, IconButton, Image, Input } from '@chakra-ui/react';
import { Avatar } from './ui/avatar';
import { LuImagePlus } from 'react-icons/lu';
import { useState } from 'react';
import { useLoadingStore } from 'store/LoadingStore';

interface PostAndReplyInputProps {
  placeholderText?: string;
  buttonText?: string;
  user: {
    name: string;
    avatar: string;
  };
  onPost?: (content: string, image: File | null) => Promise<void>;
  onReply?: (
    content: string,
    image: File | null,
    threadId: number
  ) => Promise<void>;
  threadId?: number | null;
}

export default function PostAndReplyInput({
  placeholderText = '',
  buttonText = '',
  user,
  onPost,
  onReply,
  threadId,
}: PostAndReplyInputProps) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileKey, setFileKey] = useState(0);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  const handleSubmit = async () => {
    setIsLoading(true);

    if (content.trim() || image) {
      if (onPost && !onReply) {
        await onPost(content, image);
      } else if (onReply && threadId) {
        await onReply(content, image, threadId);
      }

      setContent('');
      setImage(null);
      setPreview(null);
      setFileKey((prev) => prev + 1);
    }

    setIsLoading(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    setFileKey((prev) => prev + 1);
  };

  return (
    <Box display="flex" flexDirection="column" width="full" gap={3}>
      <Box display="flex" alignItems="center" gap={3} width="full">
        <Avatar size="sm" src={user.avatar} name={user.name} />
        <Input
          placeholder={placeholderText}
          variant="flushed"
          px={2}
          color="white"
          border="none"
          _placeholder={{ color: 'whiteAlpha.600', fontSize: '18px' }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Box position="relative">
          <label htmlFor="image">
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
            id="image"
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
          onClick={handleSubmit}
        >
          {buttonText}
        </Button>
      </Box>

      {preview && (
        <Box
          mt={2}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          width="full"
        >
          <Image
            src={preview}
            alt="Image preview"
            maxW="300px"
            maxH="300px"
            objectFit="cover"
            borderRadius="md"
          />
          <Button
            mt={2}
            colorScheme="red"
            size="xs"
            onClick={handleRemoveImage}
          >
            Remove Image
          </Button>
        </Box>
      )}
    </Box>
  );
}
