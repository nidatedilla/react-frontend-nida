import { Box, Button, Card, Image, Text } from '@chakra-ui/react';
import { Avatar } from './ui/avatar';
import DialogEditProfile from './DialogEditProfile';
import useUserStore from 'store/UserStore';
import { useEffect } from 'react';
import { getCurrentUser } from 'api/userApi';

const MyProfile = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
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

  return (
    <Card.Root
      width="352px"
      bg={'gray.800'}
      color={'white'}
      mx={6}
      mb={3}
      border={'none'}
    >
      <Text px={4} mt={3}>
        My Profile
      </Text>
      {user ? (
        <Card.Body px={4} pb={2}>
          <Image
            src={
              user.coverImage ||
              'https://img.freepik.com/free-vector/background-gradient-green-tones_23-2148360340.jpg'
            }
            borderRadius={'md'}
            height={'80px'}
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
              size={'2xl'}
              shape="full"
              borderWidth={'3px'}
              borderColor={'black'}
              insetY={'-3'}
              insetX={'3'}
            />
            <Button
              height="6"
              px={3}
              borderWidth="1px"
              borderColor="white"
              borderRadius="full"
              insetY="-3"
            >
              <DialogEditProfile fontSize="11px" />
            </Button>
          </Box>
          <Text fontSize={'16px'}>{user.fullname}</Text>
          <Text color="whiteAlpha.600" textStyle="sm">
            @{user.username}
          </Text>
          <Text fontSize={'14px'}>{user.bio || 'No bio available'}</Text>
          <Box
            display={'flex'}
            fontSize={'14px'}
            flexDirection={'row'}
            gap={1}
            py={3}
          >
            <Text>{user.followingCount}</Text>
            <Text color={'whiteAlpha.600'}>Following</Text>
            <Text pl={2}>{user.followersCount}</Text>
            <Text color={'whiteAlpha.600'}>Followers</Text>
          </Box>
        </Card.Body>
      ) : (
        <Text mx={4} my={3} color={'white'}>
          No user data found
        </Text>
      )}
    </Card.Root>
  );
};

export default MyProfile;
