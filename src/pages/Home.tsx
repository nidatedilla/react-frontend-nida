import { Box, Text } from '@chakra-ui/react';
import CardPost from 'components/CardPost';
import PostAndReplyInput from 'components/PostAndReplyInput';
import { useEffect } from 'react';
import { createThread, getAllThreads } from 'api/threadApi';
import useUserStore from 'store/UserStore';
import useThreadStore from 'store/ThreadStore';

function Home() {
  const user = useUserStore((state) => state.user);
  const { threads, setThreads } = useThreadStore();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchThreads = async () => {
      if (token) {
        try {
          const allThreads = await getAllThreads(token);
          setThreads(allThreads);
        } catch (error) {
          console.error('Error fetching threads:', error);
        }
      }
    };
  
    fetchThreads();
  }, [token, setThreads, threads]);

  const handleCreatePost = async (content: string, image: File | null) => {
    if (token) {
      try {
        const newThread = await createThread({ content, image }, token);
  
        const threadWithUser = {
          ...newThread,
          author: {
            fullname: user?.fullname || '',
            avatarImage: user?.avatarImage || '',
            username: user?.username || '',
          },
          likesCount: 0,
          isLiked: false,
          repliesCount: 0,
          duration: newThread.duration,
        };
  
        setThreads([threadWithUser, ...threads]);
      } catch (error) {
        console.error('Error creating thread:', error);
      }
    }
  };  

  return (
    <Box>
      <Box px={4} pb={4} borderBottomWidth="1px" borderColor="gray.700">
        <Text color="white" fontSize="24px" fontWeight="medium" mb={3}>
          Home
        </Text>
        <PostAndReplyInput
          placeholderText="What is happening?!"
          buttonText="Post"
          user={{
            name: user?.fullname || 'User',
            avatar: user?.avatarImage || '',
          }}
          onPost={handleCreatePost}
        />
      </Box>
      {threads.length > 0 ? (
        <CardPost threads={threads} />
      ) : (
        <Text color="white" px={4} py={4}>
          No threads available.
        </Text>
      )}
    </Box>
  );
}

export default Home;
