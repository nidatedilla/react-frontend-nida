import { Box, Button, VStack, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { LuDelete } from 'react-icons/lu';
import DialogUpdatePost from './DialogUpdatePost';
import useThreadStore from 'store/ThreadStore';
import { deleteThread } from 'api/threadApi';
import Swal from 'sweetalert2';
import { useLoadingStore } from 'store/LoadingStore';
import { HiEllipsisHorizontal } from 'react-icons/hi2';

const MenuUpdateAndDelete = ({
  threadId,
  content,
  image,
}: {
  threadId: number;
  content: string;
  image: string;
}) => {
  const { threads, setThreads } = useThreadStore();
  const { setIsLoading } = useLoadingStore();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleDeleteThread = async () => {
    const token = localStorage.getItem('token') || '';

    setIsLoading(true);

    const result = await Swal.fire({
      title: 'Are you sure you want to delete this post?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E53E3E',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      background: '#2c2c2c',
      color: '#ffffff',
    });

    if (result.isConfirmed) {
      try {
        await deleteThread(threadId, token);

        const updatedThreads = threads.filter(
          (thread) => thread.id !== threadId
        );
        setThreads(updatedThreads);

        Swal.fire({
          title: 'Deleted!',
          text: 'Your post has been deleted.',
          icon: 'success',
          confirmButtonColor: '#48BB78',
          background: '#2c2c2c',
          color: '#ffffff',
        });
      } catch (error) {
        console.error('Error deleting thread:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong while deleting the post.',
          icon: 'error',
          confirmButtonColor: '#E53E3E',
          background: '#2c2c2c',
          color: '#ffffff',
        });
      } finally {
        setIsLoading(false);
        closeMenu();
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Box position="relative" display="inline-block">
      <Button
        width={'5px'}
        height={"auto"}
        bg="transparent"
        _hover={{ bg: 'rgba(103, 255, 103, 0.2)', color:"rgb(0, 255, 0)" }}
        borderRadius={'full'}
        color={"white"}
        onClick={() => setIsOpen(!isOpen)}
      >
        <HiEllipsisHorizontal />
      </Button>

      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          right="0"
          mt="2"
          bg="gray.800"
          borderRadius="md"
          boxShadow="lg"
          zIndex="999"
          minWidth="100px"
        >
          <VStack align="stretch" gap={1} py={2}>
            <DialogUpdatePost
              threadId={threadId}
              initialContent={content}
              initialImage={image}
              onClose={() => setIsOpen(false)}
            />

            <Button
              variant="ghost"
              justifyContent="flex-start"
              color="whiteAlpha.800"
              fontSize="sm"
              _hover={{ bg: 'gray.700', color: 'white' }}
              onClick={handleDeleteThread}
            >
              <Flex align="center" gap="2">
                <Box>
                  <LuDelete />
                </Box>
                <Text>Delete</Text>
              </Flex>
            </Button>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default MenuUpdateAndDelete;
