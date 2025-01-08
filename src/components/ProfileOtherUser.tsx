import { Box, Card, Center, Flex, Image, Tabs, Text } from '@chakra-ui/react';
import { Avatar } from 'components/ui/avatar';
import CardPost from 'components/CardPost';
import { useEffect, useState } from 'react';
import { getThreadsByUserId } from 'api/threadApi';
import { getUserById } from 'api/userApi';
import useThreadStore from 'store/ThreadStore';
import { useParams } from 'react-router-dom';
import { User } from 'types/user.types';
import { Button } from './ui/button';
import { toggleFollowUser } from 'api/interactionApi';
import useUserStore from 'store/UserStore';
import { LuFileText, LuUser } from 'react-icons/lu';

function ProfileOtherUser() {
  const { id } = useParams();
  const { user: loggedInUser, setUser: setLoggedInUser } = useUserStore();
  const [user, setUser] = useState<User | null>(null);
  const { threads, setThreads } = useThreadStore();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserDataById = async () => {
      if (token && id) {
        try {
          const userData = await getUserById(parseInt(id), token);
          console.log('Other User:', userData);
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data by ID:', error);
        }
      }
    };

    fetchUserDataById();
  }, [id, token]);

  useEffect(() => {
    const fetchUserThreadsById = async () => {
      if (token && id) {
        try {
          const userThreadsById = await getThreadsByUserId(parseInt(id), token);
          console.log('User Threads:', userThreadsById);
          if (Array.isArray(userThreadsById)) {
            setThreads(userThreadsById);
          } else if (
            userThreadsById &&
            userThreadsById.threads &&
            Array.isArray(userThreadsById.threads)
          ) {
            setThreads(userThreadsById.threads);
          } else {
            setThreads([]);
          }
        } catch (error) {
          console.error('Error fetching user threads by ID:', error);
          setThreads([]);
        }
      }
    };

    fetchUserThreadsById();
  }, [id, token, setThreads]);

  const handleToggleFollow = async (followingId: number) => {
    try {
      if (user && loggedInUser && token) {
        await toggleFollowUser(followingId, token);

        const updatedIsFollowed = !user.isFollowed;
        const updatedFollowableUsers = loggedInUser?.followableUsers.map((u) =>
          u.id === followingId ? { ...u, isFollowed: !u.isFollowed } : u
        );

        const updatedFollowersCount = user.followersCount ?? 0;
        const newFollowersCount = updatedIsFollowed
          ? updatedFollowersCount + 1
          : updatedFollowersCount - 1;

        const updatedFollowingCount = loggedInUser.followingCount ?? 0;
        const newFollowingCount = updatedIsFollowed
          ? updatedFollowingCount + 1
          : updatedFollowingCount - 1;

        setUser({
          ...user,
          isFollowed: updatedIsFollowed,
          followersCount: newFollowersCount,
        });

        setLoggedInUser({
          ...loggedInUser,
          followableUsers: updatedFollowableUsers,
          followingCount: newFollowingCount,
        });
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  return (
    <Card.Root
      width="full"
      height="auto"
      bg="gray.900"
      color={'white'}
      border={'none'}
      borderRadius={'none'}
    >
      {user ? (
        <Box>
          <Text fontSize={'24px'} px={4}>
            {user.fullname}
          </Text>
          <Card.Body px={4}>
            <Image
              src={
                user.coverImage ||
                'https://img.freepik.com/free-vector/background-gradient-green-tones_23-2148360340.jpg'
              }
              borderRadius={'md'}
              height={'100px'}
            ></Image>
            <Box
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'space-between'}
              alignItems={'end'}
              height={'42px'}
            >
              <Avatar
                src={user.avatarImage}
                name={user.fullname}
                width={'80px'}
                height={'80px'}
                shape="full"
                borderWidth={'3px'}
                borderColor={'black'}
                insetY={'-1'}
                insetX={'3'}
              />
              <Button
                height={'7'}
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
                insetY={'-1'}
                onClick={() => handleToggleFollow(user.id)}
              >
                {user.isFollowed
                  ? 'Following'
                  : user.isFollowedByTarget
                    ? 'Follow Back'
                    : 'Follow'}
              </Button>
            </Box>
            <Text fontSize={'17px'} pt={2}>
              {user.fullname}
            </Text>
            <Text color="whiteAlpha.500" textStyle="sm">
              @{user.username}
            </Text>
            <Text fontSize={'14px'}>{user.bio || 'No bio available'}</Text>
            <Box
              display={'flex'}
              fontSize={'14px'}
              flexDirection={'row'}
              gap={1}
              pt={3}
            >
              <Text>{user.followingCount}</Text>
              <Text color={'whiteAlpha.500'}>Following</Text>
              <Text pl={2}>{user.followersCount}</Text>
              <Text color={'whiteAlpha.500'}>Followers</Text>
            </Box>
          </Card.Body>
        </Box>
      ) : (
        <Center h="300px">
          <Flex
            flexDirection={'column'}
            alignItems={'center'}
            textAlign="center"
          >
            <LuUser size={50} color="gray" />
            <Text color="whiteAlpha.500" fontSize="lg" mt={4}>
              No user data found
            </Text>
          </Flex>
        </Center>
      )}

      <Tabs.Root fitted defaultValue={'allPost'}>
        <Tabs.List border={'none'}>
          <Tabs.Trigger
            value="allPost"
            color="whiteAlpha.500"
            _selected={{ color: 'white' }}
          >
            All Posts
          </Tabs.Trigger>
          <Tabs.Trigger
            value="media"
            color="whiteAlpha.500"
            _selected={{ color: 'white' }}
          >
            Media
          </Tabs.Trigger>
          <Tabs.Indicator bg="green.500" height="3px" bottom={0} />
        </Tabs.List>
        <Tabs.Content p={0} value="allPost">
          {threads.length ? (
            <CardPost threads={threads} />
          ) : (
            <Center h="300px">
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                textAlign="center"
              >
                <LuFileText size={50} color="gray" />
                <Text color="whiteAlpha.500" fontSize="lg" mt={4}>
                  No threads found for this user
                </Text>
              </Box>
            </Center>
          )}
        </Tabs.Content>
        <Tabs.Content p={0} value="media">
          <CardPost
            threads={threads.filter((thread) => thread.image)}
            displayOnlyImages
          />
        </Tabs.Content>
      </Tabs.Root>
    </Card.Root>
  );
}

export default ProfileOtherUser;
