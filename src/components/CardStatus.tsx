import {
  Box,
  Button,
  HStack,
  Text,
  Stack,
  Image,
  IconButton,
} from '@chakra-ui/react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';
import { LuMessageCircle, LuExpand } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { Avatar } from 'components/ui/avatar';
import { ThreadTypes } from 'types/thread.types';
import { useState } from 'react';

interface CardStatusProps {
  thread: ThreadTypes | null;
  onToggleLike: (threadId: number) => void;
}

export const CardStatus: React.FC<CardStatusProps> = ({
  thread,
  onToggleLike,
}) => {
  const [showFullImage, setShowFullImage] = useState(false);

  return (
    <Box>
      {thread ? (
        <Box
          width="auto"
          bg="gray.900"
          pt={4}
          borderBottomWidth={'1px'}
          borderColor={'gray.700'}
        >
          <Box display={'flex'} flexDirection={'row'} py={0} px={4}>
            <Link to={''}>
              <Avatar
                size={'sm'}
                src={thread.author.avatarImage || ''}
                name={thread.author.fullname}
              />
            </Link>
            <Box display={'flex'} flexDirection={'column'} pl={3}>
              <Stack mb={1} gap="0" color={'white'}>
                <Link to={''}>
                  <Text fontWeight="semibold" textStyle="sm">
                    {thread.author.fullname}
                  </Text>
                </Link>
                <Text color="whiteAlpha.600" textStyle="sm">
                  @{thread.author.username}
                </Text>
              </Stack>
            </Box>
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            color={'whiteAlpha.600'}
            pb={2}
          >
            <Box color={'white'} fontSize={'14px'} px={4}>
              {thread.content}
            </Box>
            {thread.image && (
              <Box
                mt={2}
                px={4}
                width="full"
                height="300px"
                position="relative"
                overflow="hidden"
              >
                <Image
                  src={thread.image}
                  width="full"
                  height="full"
                  objectFit="cover"
                  objectPosition="center"
                  borderRadius="md"
                />
                <IconButton
                  aria-label="View full image"
                  position="absolute"
                  top={2}
                  right={6}
                  size="sm"
                  colorScheme="blackAlpha"
                  bg="blackAlpha.600"
                  onClick={() => setShowFullImage(true)}
                >
                  <LuExpand />
                </IconButton>
              </Box>
            )}
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
            <Text as={'span'} px={4} pt={2} fontSize={'14px'}>
              {thread.createdAt.time} • {thread.createdAt.date}
            </Text>
            <HStack pl={4} gap={5}>
              <Button
                fontWeight="normal"
                p={0}
                color={thread.isLiked ? 'red.500' : 'whiteAlpha.600'}
                onClick={() => onToggleLike(thread.id)}
              >
                {thread.isLiked ? <HiHeart /> : <HiOutlineHeart />}
                <Text color="whiteAlpha.600">
                  {thread.likesCount.toLocaleString('id-ID')}
                </Text>
              </Button>
              <Button fontWeight={'normal'} p={0} color={'whiteAlpha.600'}>
                <LuMessageCircle />
                <Text color="whiteAlpha.600">
                  {thread.repliesCount.toLocaleString('id-ID')} Replies
                </Text>
              </Button>
            </HStack>
          </Box>
        </Box>
      ) : (
        <Text mx={4} my={4} color={"white"}>Thread not found</Text>
      )}
    </Box>
  );
};
