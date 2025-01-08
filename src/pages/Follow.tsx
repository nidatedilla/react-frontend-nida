import { Box, Tabs, Text } from '@chakra-ui/react';
import { toggleFollowUser } from 'api/interactionApi';
import { getAllUsers } from 'api/userApi';
import CardUser from 'components/CardUser';
import { useEffect } from 'react';
import useUserStore from 'store/UserStore';

export default function Follow() {
  const { user, setUser } = useUserStore();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      try {
        if (!user?.followableUsers) {
          const users = await getAllUsers(token!);
          console.log('Fetcing users:', users);

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
  
      const updatedFollowingCount = user?.followingCount ?? 0;
      const newFollowingCount = updatedFollowableUsers?.find(
        (u) => u.id === followingId
      )?.isFollowed
        ? updatedFollowingCount + 1
        : updatedFollowingCount - 1;
  
      if (updatedFollowableUsers) {
        setUser({
          ...user!,
          followableUsers: updatedFollowableUsers,
          followingCount: newFollowingCount,
        });
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };  

  const followers =
    user?.followableUsers?.filter((u) => u.isFollowedByTarget) || [];
  const following = user?.followableUsers?.filter((u) => u.isFollowed) || [];

  return (
    <Box>
      <Box px={4} pb={4}>
        <Text color={'white'} fontSize={'24px'} fontWeight={'medium'} mb={3}>
          Follows
        </Text>
        <Tabs.Root fitted variant="line" defaultValue="followers">
          <Tabs.List border={'none'}>
            <Tabs.Trigger
              value="followers"
              color="whiteAlpha.500"
              _selected={{
                color: 'white',
              }}
            >
              Followers
            </Tabs.Trigger>
            <Tabs.Trigger
              value="following"
              color="whiteAlpha.500"
              _selected={{
                color: 'white',
              }}
            >
              Following
            </Tabs.Trigger>
            <Tabs.Indicator
              bg="green.500"
              height="3px"
              position={'absolute'}
              bottom={0}
            />
          </Tabs.List>
          <Tabs.Content value="followers">
            <CardUser listUser={followers} toggleFollow={handleToggleFollow} />
          </Tabs.Content>
          <Tabs.Content value="following">
            <CardUser listUser={following} toggleFollow={handleToggleFollow} />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Box>
  );
}
