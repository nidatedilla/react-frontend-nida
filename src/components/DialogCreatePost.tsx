import { Box, Button, HStack, IconButton, Input } from '@chakra-ui/react';
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Avatar } from './ui/avatar';
import { LuImagePlus } from 'react-icons/lu';

const DialogCreatePost = () => {
  return (
    <DialogRoot size={'md'}>
      <DialogBackdrop />
      <DialogTrigger asChild>
        <Button
          fontSize={'15px'}
          bg={'green'}
          color={'white'}
          p={5}
          mx={5}
          borderRadius={'full'}
        >
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent bg="gray.900" color={'white'}>
        <DialogCloseTrigger
          borderColor={'whiteAlpha.600'}
          color={'whiteAlpha.600'}
          borderRadius={'full'}
          _hover={{ bg: 'gray.700' }}
        />
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <DialogBody>
          <HStack>
            <Avatar size={'sm'} src="" name="Nida Tedilla" />
            <Input
              placeholder={'What is happening?!'}
              variant={'flushed'}
              px={2}
              color="white"
              border={'none'}
              _placeholder={{ color: 'whiteAlpha.600', fontSize: '18px' }}
            />
          </HStack>
        </DialogBody>
        <DialogFooter
          mx={3}
          justifyContent={'space-between'}
          borderTopWidth={'1px'}
          borderColor={"gray.700"}
          p={1}
          pb={3}
        >
          <Box position="relative">
            <label htmlFor="image-upload">
              <IconButton
                as="span"
                aria-label="Upload Image"
                fontSize="2xl"
                color="green"
                size="lg"
              >
                <LuImagePlus />
              </IconButton>
            </label>

            <Input
              type="file"
              id="image-upload"
              accept="image/*"
              display="none"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files[0]) {
                  alert(`File uploaded: ${files[0].name}`);
                } else {
                  alert('No file selected');
                }
              }}
            />
          </Box>

          <Button
            bg="green"
            color="white"
            size="xs"
            borderRadius="2xl"
            fontSize="14px"
            px={4}
            _hover={{ bg: 'green.600' }}
          >
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
export default DialogCreatePost;
