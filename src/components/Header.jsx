/* eslint-disable react/prop-types */
import { Box, Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Button, useMediaQuery } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

function AppHeader({ setCat }) {
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  return (
    <Box bg="gray.100" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading as="h1" size="lg" fontWeight="bold" color="black">
          Newzy
        </Heading>
        {isMobile ? (
          <Menu>
            <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} variant="outline" />
            <MenuList>
              <MenuItem onClick={() => setCat('')}>Home</MenuItem>
              <MenuItem onClick={() => setCat('sports')}>Sports</MenuItem>
              <MenuItem onClick={() => setCat('business')}>Business</MenuItem>
              <MenuItem onClick={() => setCat('technology')}>Technology</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Flex alignItems="center">
            <Button variant="ghost" onClick={() => setCat('')}>Home</Button>
            <Button variant="ghost" onClick={() => setCat('sports')}>Sports</Button>
            <Button variant="ghost" onClick={() => setCat('business')}>Business</Button>
            <Button variant="ghost" onClick={() => setCat('technology')}>Technology</Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default AppHeader;
