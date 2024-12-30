import { Box, Button, HStack, Image, Text, IconButton } from '@chakra-ui/react';
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
import PostAndReplyInput from './PostAndReplyInput';
import CardReply from './CardReply';
import { Link } from 'react-router-dom';
import { Avatar } from './ui/avatar';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';
import { LuMessageCircle, LuExpand } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { ThreadTypes } from 'types/thread.types';
import useUserStore from 'store/UserStore';
import { ReplyTypes } from 'types/reply.types';
import { createReply, getThreadReplies } from 'api/interactionApi';

interface DialogDetailImageProps {
  children: React.ReactNode;
  threadId: number;
  threads: ThreadTypes[];
  handleToggleLike: (threadId: number) => void;
}

const DialogDetailImage: React.FC<DialogDetailImageProps> = ({
  children,
  threadId,
  threads,
  handleToggleLike,
}) => {
  const user = useUserStore((state) => state.user);
  const token = localStorage.getItem('token');
  const thread = threads.find((t) => t.id === threadId);
  const [replies, setReplies] = useState<ReplyTypes[]>([]);
  const [showFullImage, setShowFullImage] = useState(false);

  useEffect(() => {
    if (threadId && token) {
      getThreadReplies(threadId, token)
        .then((data) => setReplies(data || []))
        .catch((error) => console.error('Failed to fetch replies:', error));
    }
  }, [threadId, token]);

  const handleCreateReply = async (content: string, image: File | null) => {
    if (threadId && token) {
      try {
        const newReply = await createReply({ content, image }, threadId, token);

        setReplies((prevReplies) => [
          ...prevReplies,
          {
            ...newReply,
            author: {
              fullname: user?.fullname || 'User',
              avatarImage: user?.avatarImage || '',
              username: user?.username || '',
            },
            likesCount: 0,
            isLiked: false,
            duration: newReply.duration,
          },
        ]);
      } catch (error) {
        console.error('Error creating reply:', error);
      }
    }
  };

  if (!thread)
    return (
      <Text color="white" px={4} py={4}>
        Thread not found!
      </Text>
    );

  return (
    <DialogRoot size="cover" placement="center">
      <DialogBackdrop />
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent bg="gray.900">
        <DialogCloseTrigger
          borderColor="whiteAlpha.600"
          color="whiteAlpha.600"
          borderRadius="full"
          _hover={{ bg: 'gray.700' }}
        />
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>
        <DialogBody>
          <Box display="flex" flexDirection="row" gap={4}>
            <Box
              flex={1}
              height={'450px'}
              position="relative"
              overflow="hidden"
            >
              <Image
                src={thread.image || ''}
                width="100%"
                height="100%"
                objectFit="cover"
                objectPosition="center"
              />
              <IconButton
                aria-label="View full image"
                position="absolute"
                top={2}
                right={2}
                size="sm"
                colorScheme="blackAlpha"
                bg="blackAlpha.600"
                onClick={() => setShowFullImage(true)}
              >
                <LuExpand />
              </IconButton>
            </Box>
            <Box
              width="500px"
              display="flex"
              flexDirection="column"
              borderXWidth="1px"
              borderColor="gray.700"
              height={'450px'}
              overflow="auto"
            >
              <Box borderBottomWidth="1px" borderColor="gray.700" px={4}>
                <Box display="flex" flexDirection="row">
                  <Link to="">
                    <Avatar
                      size="sm"
                      src={thread.author.avatarImage || ''}
                      name={thread.author.fullname}
                    />
                  </Link>
                  <Box display="flex" flexDirection="column" pl={3}>
                    <HStack mb={1} gap="2" color="white">
                      <Link to="">
                        <Text fontWeight="semibold" textStyle="sm">
                          {thread.author.fullname}
                        </Text>
                      </Link>
                      <Text color="whiteAlpha.600" textStyle="sm">
                        @{thread.author.username}
                      </Text>
                      <Text as="span" color="whiteAlpha.600" textStyle="sm">
                        • {thread.duration}
                      </Text>
                    </HStack>
                    <Box color="white">{thread.content}</Box>
                  </Box>
                </Box>
                <HStack pl={12} pb={2} gap={5}>
                  <Button
                    fontWeight="normal"
                    p={0}
                    color={thread.isLiked ? 'red.500' : 'whiteAlpha.600'}
                    onClick={() => handleToggleLike(thread.id)}
                  >
                    {thread.isLiked ? <HiHeart /> : <HiOutlineHeart />}
                    <Text color="whiteAlpha.600">
                      {(thread.likesCount ?? 0).toLocaleString('id-ID')}
                    </Text>
                  </Button>
                  <Button fontWeight="normal" p={0} color="whiteAlpha.600">
                    <LuMessageCircle />
                    <Text color="whiteAlpha.600">
                      {(thread.repliesCount ?? 0).toLocaleString('id-ID')}{' '}
                      Replies
                    </Text>
                  </Button>
                </HStack>
              </Box>
              <Box borderBottomWidth="1px" borderColor="gray.700" px={4} py={3}>
                <PostAndReplyInput
                  placeholderText="Type your reply!"
                  buttonText="Reply"
                  user={{
                    name: user?.fullname || 'User',
                    avatar: user?.avatarImage || '',
                  }}
                  onReply={handleCreateReply}
                  threadId={threadId}
                />
              </Box>
              <Box flex={1} overflow="auto">
                <CardReply replies={replies} />
              </Box>
            </Box>
          </Box>
        </DialogBody>
        <DialogFooter />
        {showFullImage && (
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="blackAlpha.900"
            zIndex={1000}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => setShowFullImage(false)}
          >
            <Image
              src={thread.image || ''}
              maxHeight="90vh"
              maxWidth="90vw"
              objectFit="contain"
              onClick={(e) => e.stopPropagation()}
            />
          </Box>
        )}
      </DialogContent>
    </DialogRoot>
  );
};

export default DialogDetailImage;
