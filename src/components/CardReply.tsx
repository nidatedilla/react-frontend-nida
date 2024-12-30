import { Box, Button, HStack, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Avatar } from './ui/avatar';
import { HiOutlineHeart } from 'react-icons/hi2';
import { ReplyTypes } from 'types/reply.types';

interface CardReplyProps {
  replies: ReplyTypes[];
}

export default function CardReply({ replies }: CardReplyProps) {
  if (replies.length === 0) {
    return (
      <Text color="whiteAlpha.600" px={4} py={4}>
        No replies yet...
      </Text>
    );
  }

  return (
    <Box>
      {replies.map((r) => (
        <Box
          key={r.id}
          width="auto"
          bg="gray.900"
          borderBottomWidth={'1px'}
          borderColor={'gray.700'}
          pt={4}
          px={4}
        >
          <Box display={'flex'} flexDirection={'row'} p={0}>
            <Link to={''}>
              <Avatar
                size={'sm'}
                src={r.author.avatarImage || ''}
                name={r.author.fullname}
              />
            </Link>
            <Box display={'flex'} flexDirection={'column'} pl={3}>
              <HStack mb={1} gap="2" color={'white'}>
                <Link to={''}>
                  <Text fontWeight="semibold" textStyle="sm">
                    {r.author.fullname}
                  </Text>
                </Link>
                <Text color="whiteAlpha.600" textStyle="sm">
                  @{r.author.username}
                </Text>
                <Text as={'span'} color="whiteAlpha.600" textStyle="sm">
                  • {r.duration}
                </Text>
              </HStack>
              <Box color={'white'}>{r.content}</Box>
              {r.image && (
                <Box pt={2}>
                  <Box width="full" height="200px" overflow="hidden">
                    <Image
                      src={r.image}
                      width="full"
                      height="full"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
          <Button
            fontWeight="normal"
            pl={12}
            justifyContent={'start'}
            color={'whiteAlpha.600'}
          >
            <HiOutlineHeart />
            <Text color="whiteAlpha.600">{r.likesCount}</Text>
          </Button>
        </Box>
      ))}
    </Box>
  );
}