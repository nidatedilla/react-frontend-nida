import { Box, Button, Card, Image, Tabs, Text } from '@chakra-ui/react';
import { Avatar } from 'components/ui/avatar';
import CardPost from 'components/CardPost';
import useUserStore from 'store/UserStore';
import DialogEditProfile from 'components/DialogEditProfile';
import { useEffect } from 'react';
import { getThreadsByUser } from 'api/threadApi';
import { getCurrentUser } from 'api/userApi';
import useThreadStore from 'store/ThreadStore';

function Profile() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const { threads, setThreads } = useThreadStore();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const userData = await getCurrentUser(token);
          console.log('User Data:', userData); 
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [token, setUser]);

  useEffect(() => {
    const fetchUserThreads = async () => {
      if (token) {
        try {
          const userThreads = await getThreadsByUser(token);
          setThreads(userThreads);  // Menyimpan threads ke store
        } catch (error) {
          console.error('Error fetching user threads:', error);
        }
      }
    };

    fetchUserThreads();
  }, [token, setThreads]);

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
                borderColor={'white'}
                borderRadius={'full'}
                insetY={'-1'}
                onClick={() => {}}
              >
                <DialogEditProfile />
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
        <Text px={10} my={3} color={'white'}>
          No user data found
        </Text>
      )}

      <Tabs.Root fitted defaultValue={'allPost'}>
        <Tabs.List border={'none'}>
          <Tabs.Trigger
            value="allPost"
            color="whiteAlpha.500"
            _selected={{
              color: 'white',
            }}
          >
            All Posts
          </Tabs.Trigger>
          <Tabs.Trigger
            value="media"
            color="whiteAlpha.500"
            _selected={{
              color: 'white',
            }}
          >
            Media
          </Tabs.Trigger>
          <Tabs.Indicator bg="green.500" height="3px" bottom={0} />
        </Tabs.List>
        <Tabs.Content p={0} value="allPost">
          {threads.length ? ( 
            <CardPost threads={threads} />
          ) : (
            <Text mx={4} my={4}>
              No threads found
            </Text>
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

export default Profile;