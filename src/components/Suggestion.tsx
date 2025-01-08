import { Box, Button, Text } from '@chakra-ui/react';
import { Avatar } from './ui/avatar';
import useUserStore from 'store/UserStore';
import { toggleFollowUser } from 'api/interactionApi';
import { getAllUsers } from 'api/userApi';
import { useEffect } from 'react';
import HoverCardComponent from './HoverCardUser';

function Suggestion() {
  const { user, setUser } = useUserStore();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => { 
      try {
        if (!user?.followableUsers) {
          const users = await getAllUsers(token);

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
  
      const updatedUser = {
        ...user!,
        followableUsers: updatedFollowableUsers ?? [],
        followingCount: (user?.followingCount ?? 0) + 1,
      };
  
      setUser(updatedUser);
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };    

  const sortedSuggestions = user?.followableUsers
    ?.filter((u) => !u.isFollowed)
    .sort((a, b) => {
      if (b.isFollowedByTarget !== a.isFollowedByTarget) {
        return Number(b.isFollowedByTarget) - Number(a.isFollowedByTarget);
      }
      return b.followersCount - a.followersCount;
    })
    .slice(0, 5);

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="352px"
      bg="gray.800"
      color="white"
      mb={3}
      mx={6}
      p={3}
      gap={2}
      borderRadius="lg"
    >
      <Text mb={2}>Suggested for you</Text>
      {sortedSuggestions?.map((suggestion) => (
        <Box
          key={suggestion.id}
          display="flex"
          flexDirection="row"
          alignItems="center"
          p={0}
          position="relative"
        >
          <Avatar
            size="sm"
            src={suggestion.avatarImage}
            name={suggestion.fullname}
            objectFit="cover"
          />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            pl={3}
            color="white"
            width="full"
            position={'relative'}
          >
            <HoverCardComponent
              id={suggestion.id}
              fullname={suggestion.fullname}
              username={suggestion.username}
              avatarImage={suggestion.avatarImage}
              bio={suggestion.bio}
              followersCount={suggestion.followersCount}
              followingCount={suggestion.followingCount}
            />
            <Button
              height="6"
              fontSize="11px"
              px={3}
              borderWidth="1px"
              borderColor={
                suggestion.isFollowed
                  ? 'whiteAlpha.600'
                  : suggestion.isFollowedByTarget
                    ? 'green.500'
                    : 'white'
              }
              color={
                suggestion.isFollowed
                  ? 'whiteAlpha.600'
                  : suggestion.isFollowedByTarget
                    ? 'green.500'
                    : 'white'
              }
              borderRadius="full"
              onClick={() => handleToggleFollow(suggestion.id)}
            >
              {suggestion.isFollowed
                ? 'Following'
                : suggestion.isFollowedByTarget
                  ? 'Follow Back'
                  : 'Follow'}
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default Suggestion;
