import {
  Box,
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Avatar } from './ui/avatar';
import { Link } from 'react-router-dom';

interface HoverCardProps {
  id: number;
  fullname: string;
  username: string;
  avatarImage?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
}

const HoverCardComponent: React.FC<HoverCardProps> = ({
  id,
  fullname,
  username,
  avatarImage,
  bio,
  followersCount,
  followingCount,
}) => {
  return (
    <HoverCardRoot size="sm" openDelay={500} closeDelay={200}>
      <HoverCardTrigger asChild>
        <Box position="relative">
          <Stack gap="normal">
            <Link to={`/profile/${id}`}>
              <Text
                fontWeight="semibold"
                textStyle="sm"
                color="white"
                _hover={{ textDecoration: 'none' }}
              >
                {fullname}
              </Text>
            </Link>
            <Link to={`/profile/${id}`}>
              <Text
                color="whiteAlpha.600"
                textStyle="sm"
                _hover={{ textDecoration: 'none' }}
              >
                @{username}
              </Text>
            </Link>
          </Stack>
        </Box>
      </HoverCardTrigger>
      <HoverCardContent
        bg="blackAlpha.800"
        p={4}
        borderRadius="lg"
        zIndex="popover"
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
      >
        <HoverCardArrow />
        <Avatar
          src={avatarImage}
          name={fullname}
          size="2xl"
          shape="full"
          borderWidth="3px"
          borderColor="black"
          right={'4%'}
        />
        <Text fontSize="16px">{fullname}</Text>
        <Text color="whiteAlpha.600" textStyle="sm">
          @{username}
        </Text>
        <Text fontSize="14px">{bio || 'No bio available'}</Text>
        <Box display="flex" fontSize="14px" flexDirection="row" gap={1} py={3}>
          <Text>{followingCount}</Text>
          <Text color="whiteAlpha.600">Following</Text>
          <Text pl={2}>{followersCount}</Text>
          <Text color="whiteAlpha.600">Followers</Text>
        </Box>
      </HoverCardContent>
    </HoverCardRoot>
  );
};

export default HoverCardComponent;
