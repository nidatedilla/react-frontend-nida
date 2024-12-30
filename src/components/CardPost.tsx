import { Box, Button, HStack, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Avatar } from './ui/avatar';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';
import { LuMessageCircle } from 'react-icons/lu';
import DialogDetailImage from './DialogDetailImage';
import { ThreadTypes } from 'types/thread.types';
import { toggleLikeThread } from 'api/interactionApi';
import useThreadStore from 'store/ThreadStore';

interface PostProps {
  threads: ThreadTypes[];
  displayOnlyImages?: boolean;
}

export default function CardPost({
  threads,
  displayOnlyImages = false,
}: PostProps) {
  const { setThreads } = useThreadStore();

  const handleToggleLike = async (threadId: number) => {
    const token = localStorage.getItem('token') || '';

    try {
      const updatedData = await toggleLikeThread(threadId, token);

      const updatedThreads = threads.map((thread) => {
        if (thread.id === threadId) {
          const updatedLikeCount = updatedData.isLiked
            ? thread.likesCount + 1
            : thread.likesCount - 1;

          return {
            ...thread,
            isLiked: updatedData.isLiked,
            likesCount: updatedLikeCount,
          };
        }
        return thread;
      });

      setThreads(updatedThreads);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <Box>
      {displayOnlyImages ? (
        threads.length ? (
          <SimpleGrid pt={4} px={4} columns={{ base: 2, md: 3, lg: 3 }} gap={3}>
            {threads.map((thread) =>
              thread.image ? (
                <DialogDetailImage
                  key={thread.id}
                  threadId={thread.id}
                  threads={threads}
                  handleToggleLike={handleToggleLike}
                >
                  <Box
                    width="100%"
                    height="200px"
                    position="relative"
                    overflow="hidden"
                    mb={4}
                  >
                    <Image
                      src={thread.image}
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </Box>
                </DialogDetailImage>
              ) : null
            )}
          </SimpleGrid>
        ) : (
          <Text mx={4} my={4}>
            No media found
          </Text>
        )
      ) : (
        threads.map((thread) => (
          <Box
            key={thread.id}
            width="auto"
            bg="gray.900"
            fontSize={'14px'}
            borderBottomWidth={'1px'}
            borderColor={'gray.700'}
            borderRadius={'none'}
            pt={4}
            px={4}
          >
            <Link
              to={`/status/${thread.id}`}
              state={{ from: window.location.pathname }}
            >
              <Box display={'flex'} flexDirection={'row'} p={0}>
                <Link to={''}>
                  <Avatar
                    size={'sm'}
                    src={thread.author.avatarImage || undefined}
                    name={thread.author.fullname}
                  />
                </Link>
                <Box display={'flex'} flexDirection={'column'} pl={3}>
                  <HStack mb={1} gap="2" color={'white'}>
                    <Link to={''}>
                      <Text fontWeight="semibold" textStyle="sm">
                        {thread.author.fullname}
                      </Text>
                    </Link>
                    <Text color="whiteAlpha.600" textStyle="sm">
                      @{thread.author.username}
                    </Text>
                    <Text as={'span'} color="whiteAlpha.600" textStyle="sm">
                      • {thread.duration}
                    </Text>
                  </HStack>
                  <Box color={'white'}>{thread.content}</Box>
                  <Box pt={2}>
                    {thread.image && (
                      <Box width="full" height="300px" overflow="hidden">
                        <Image
                          src={thread.image}
                          width="full"
                          height="full"
                          objectFit="cover"
                          objectPosition="center"
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Link>

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

              <Button fontWeight={'normal'} p={0} color={'whiteAlpha.600'}>
                <LuMessageCircle />
                <Text color="whiteAlpha.600">
                  {(thread.repliesCount ?? 0).toLocaleString('id-ID')} Replies
                </Text>
              </Button>
            </HStack>
          </Box>
        ))
      )}
    </Box>
  );
}
