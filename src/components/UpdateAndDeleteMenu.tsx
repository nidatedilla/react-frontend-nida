import {
  Box,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@chakra-ui/react';
import { Button } from './ui/button';
import { LuDelete, LuFileEdit, LuMenu } from 'react-icons/lu';

const menuItems = [
  { label: 'Edit', value: 'edit', icon: <LuFileEdit color="white" /> },
  { label: 'Delete', value: 'delete', icon: <LuDelete color="white" /> },
];

const MenuUpdateAndDelete = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          bg={"transparent"}
          _hover={{ bg: 'transparent' }}
        >
          <LuMenu color="white" />
        </Button>
      </MenuTrigger>
      <MenuContent
        zIndex={'999'}
        position={'absolute'}
        marginTop={'8px'}
        bg={'blackAlpha.900'}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            <Box flex="1" color={'white'}>
              {item.label}
            </Box>
            {item.icon}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
};

export default MenuUpdateAndDelete;
