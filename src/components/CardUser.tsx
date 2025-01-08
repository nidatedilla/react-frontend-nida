import { Box, Button, HStack, Stack, Text } from '@chakra-ui/react';
import { Avatar } from 'components/ui/avatar';
import { Link } from 'react-router-dom';
import { User } from 'types/user.types';

type CardUserProps = {
  listUser: User[];
  toggleFollow: (id: number) => void;
};

export default function CardUser({ listUser, toggleFollow }: CardUserProps) {
  return (
    <Box>
      {listUser.map((user) => (
        <HStack key={user.id} alignItems={'start'} pb={2}>
          <Link to={`/profile/${user.id}`}>
            <Avatar size={'sm'} src={user.avatarImage} name={user.fullname} />
          </Link>
          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            width={'full'}
          >
            <Stack mb={1} gap={0} color={'white'}>
            <Link to={`/profile/${user.id}`}>
                <Text fontWeight="semibold" textStyle="sm">
                  {user.fullname}
                </Text>
              </Link>
              <Text color="whiteAlpha.600" textStyle="sm">
                @{user.username}
              </Text>
              <Text color="whiteAlpha.600" textStyle="sm">
                {user.bio}
              </Text>
            </Stack>
            <Button
              height={'7'}
              fontSize={'13px'}
              px={3}
              borderWidth={'1px'}
              borderColor={
                user.isFollowed
                  ? 'whiteAlpha.600'
                  : user.isFollowedByTarget
                    ? 'green.500'
                    : 'white'
              }
              color={
                user.isFollowed
                  ? 'whiteAlpha.600'
                  : user.isFollowedByTarget
                    ? 'green.500'
                    : 'white'
              }
              borderRadius={'full'}
              onClick={() => toggleFollow(user.id)}
            >
              {user.isFollowed
                ? 'Following'
                : user.isFollowedByTarget
                  ? 'Follow Back'
                  : 'Follow'}
            </Button>
          </Box>
        </HStack>
      ))}
    </Box>
  );
}
