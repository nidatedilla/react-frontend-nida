import { Box, Button, HStack, Input, Stack, Text } from '@chakra-ui/react';
import { toggleFollowUser } from 'api/interactionApi';
import { getAllUsers } from 'api/userApi';
import { Avatar } from 'components/ui/avatar';
import { InputGroup } from 'components/ui/input-group';
import { useEffect, useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import useUserStore from 'store/UserStore';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, setUser } = useUserStore();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      try {
        if (!user?.followableUsers) {
          const users = await getAllUsers(token!);

          setUser({
            ...user!,
            followableUsers: users,
          });
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token, user, setUser]);

  const handleToggleFollow = async (followingId: number) => {
    try {
      await toggleFollowUser(followingId, token!);

      const updatedFollowableUsers = user?.followableUsers.map((u) =>
        u.id === followingId ? { ...u, isFollowed: !u.isFollowed } : u
      );

      if (updatedFollowableUsers) {
        setUser({
          ...user!,
          followableUsers: updatedFollowableUsers,
        });
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  const filteredUsers = Array.isArray(user?.followableUsers)
    ? user.followableUsers.filter(
        (u) =>
          u.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <Box px={4} pb={4}>
      <Box pb={3} color={'white'}>
        <InputGroup
          startElement={<LuSearch />}
          width={'full'}
          borderRadius={'full'}
          bg={'whiteAlpha.300'}
        >
          <Input
            onChange={(e) => setSearchQuery(e.target.value)}
            border={'none'}
            placeholder="Search your friend"
            _placeholder={{ color: 'whiteAlpha.500', fontSize: '14px' }}
          />
        </InputGroup>
      </Box>

      {searchQuery === '' ? (
        <Box
          width="250px"
          margin={'auto'}
          textAlign={'center'}
          height="calc(100vh - 100px)"
          display="flex"
          flexDirection={'column'}
          alignItems="center"
          justifyContent="center"
        >
          <Text color="white" fontSize="18px" fontWeight={'medium'}>
            Write and search something
          </Text>
          <Text color={'whiteAlpha.600'} fontSize={'12px'}>
            Try searching for something else or check the spelling of what you
            typed.
          </Text>
        </Box>
      ) : filteredUsers?.length ? (
        filteredUsers.map((user) => (
          <HStack key={user.id} alignItems={'start'} pb={2}>
            <Link to={''}>
              <Avatar size={'sm'} src={user.avatarImage} name={user.fullname} />
            </Link>
            <Box
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'space-between'}
              width={'full'}
            >
              <Stack mb={1} gap={0} color={'white'}>
                <Link to={''}>
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
                onClick={() => handleToggleFollow(user.id)}
              >
                {user.isFollowed
                  ? 'Following'
                  : user.isFollowedByTarget
                    ? 'Follow Back'
                    : 'Follow'}
              </Button>
            </Box>
          </HStack>
        ))
      ) : (
        <Box
          width="250px"
          margin={'auto'}
          textAlign={'center'}
          height="calc(100vh - 100px)"
          display="flex"
          flexDirection={'column'}
          alignItems="center"
          justifyContent="center"
        >
          <Text color="white" fontSize="18px" fontWeight={'medium'}>
            No results for "{searchQuery}"
          </Text>
          <Text color={'whiteAlpha.600'} fontSize={'12px'}>
            Try searching for something else or check the spelling of what you
            typed.
          </Text>
        </Box>
      )}
    </Box>
  );
}
