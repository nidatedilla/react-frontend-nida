import { Box, Button, HStack, Text } from '@chakra-ui/react';
import PostAndReplyInput from 'components/PostAndReplyInput';
import CardReply from 'components/CardReply';
import { LuArrowLeft } from 'react-icons/lu';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getThreadById } from 'api/threadApi';
import { CardStatus } from 'components/CardStatus';
import { ThreadTypes } from 'types/thread.types';
import { ReplyTypes } from 'types/reply.types';
import {
  createReply,
  getThreadReplies,
  toggleLikeThread,
  toggleReplyLike,
} from 'api/interactionApi';

function Status() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();
  const location = useLocation();
  const previousPage = location.state?.from || '/';
  const { id } = useParams();
  const threadId = id ? parseInt(id) : null;
  const [thread, setThread] = useState<ThreadTypes | null>(null);
  const [replies, setReplies] = useState<ReplyTypes[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchThread = async () => {
      if (threadId && token) {
        try {
          const threadData = await getThreadById(threadId, token);
          setThread(threadData);
        } catch (err) {
          console.error('Error fetching thread:', err);
        }
      }
    };

    const fetchReplies = async () => {
      if (threadId && token) {
        try {
          const replyData = await getThreadReplies(threadId, token);

          console.log('Reply:', replyData);

          setReplies(replyData);
        } catch (err) {
          console.error('Error fetching replies:', err);
        }
      }
    };

    fetchThread();
    fetchReplies();
  }, [threadId, token]);

  const handleToggleLike = async (threadId: number) => {
    const token = localStorage.getItem('token') || '';

    try {
      const updatedData = await toggleLikeThread(threadId, token);

      if (updatedData) {
        setThread((prevThread) => {
          if (prevThread?.id === threadId) {
            const updatedLikeCount = updatedData.isLiked
              ? prevThread.likesCount + 1
              : prevThread.likesCount - 1;

            return {
              ...prevThread,
              isLiked: updatedData.isLiked,
              likesCount: updatedLikeCount,
            };
          }
          return prevThread;
        });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleCreateReply = async (content: string, image: File | null) => {
    if (threadId && token) {
      try {
        const newReply = await createReply({ content, image }, threadId, token);

        setReplies((prevReplies) => {
          const updatedReplies = [
            {
              ...newReply,
              author: {
                id: user.id,
                fullname: user?.fullname || 'User',
                avatarImage: user?.avatarImage || '',
                username: user?.username || '',
              },
              likesCount: 0,
              isLiked: false,
              duration: newReply.duration,
            },
            ...prevReplies,
          ];

          return updatedReplies.sort((a, b) => b.createdAt - a.createdAt);
        });

        setThread((prevThread) => {
          if (prevThread?.id === threadId) {
            return {
              ...prevThread,
              repliesCount: prevThread.repliesCount + 1,
            };
          }
          return prevThread;
        });
      } catch (error) {
        console.error('Error creating reply:', error);
      }
    }
  };

  const handleToggleReplyLike = async (replyId: number) => {
    const token = localStorage.getItem('token') || '';

    try {
      const updatedData = await toggleReplyLike(replyId, token);

      if (updatedData) {
        setReplies((prevReplies) =>
          prevReplies.map((reply) =>
            reply.id === replyId
              ? {
                  ...reply,
                  isLiked: updatedData.isLiked,
                  likesCount: updatedData.isLiked
                    ? reply.likesCount + 1
                    : reply.likesCount - 1,
                }
              : reply
          )
        );
      }
    } catch (error) {
      console.error('Error toggling reply like:', error);
    }
  };

  const handleDeleteReply = (replyId: number) => {
    setReplies((prevReplies) =>
      prevReplies.filter((reply) => reply.id !== replyId)
    );
    setThread((prevThread) => {
      if (prevThread) {
        return {
          ...prevThread,
          repliesCount: prevThread.repliesCount - 1,
        };
      }
      return prevThread;
    });
  };

  return (
    <Box>
      <HStack>
        <Button
          onClick={() => navigate(previousPage)}
          style={{ color: 'white', fontSize: '24px' }}
        >
          <LuArrowLeft />
        </Button>
        <Text
          color={'white'}
          justifyContent={'center'}
          fontSize={'24px'}
          fontWeight={'medium'}
        >
          Status
        </Text>
      </HStack>
      <CardStatus thread={thread} onToggleLike={handleToggleLike} />
      <Box borderBottomWidth={'1px'} borderColor={'gray.700'} px={4} py={3}>
        <PostAndReplyInput
          placeholderText="Type your reply!"
          buttonText="Reply"
          user={{
            name: user?.fullname || 'User',
            avatar: user?.avatarImage || '',
          }}
          onReply={handleCreateReply}
          threadId={threadId}
        />
      </Box>
      {threadId && (
        <CardReply
          replies={replies}
          onToggleReplyLike={handleToggleReplyLike}
          onReplyDeleted={handleDeleteReply}
          currentUserId={user.id}
          threadOwnerId={thread?.author.id || 0}
        />
      )}
    </Box>
  );
}

export default Status;
