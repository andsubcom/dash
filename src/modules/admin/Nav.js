import React from "react"
import {
  Flex,
  Container,
  Image,
  Stack,
  Link,
  Text,
  Icon,
  Button,
  Menu,
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuList,
  MenuButton
} from "@chakra-ui/react"

import { FaCog, FaChevronDown } from "react-icons/fa"

export default function Nav() {
  return (
    <Flex
      position={{ md: "fixed" }}
      bg="#ffffff"
      minH="4rem"
      w="100%"
      marginTop={{ md: "-4rem" }}
      zIndex="99"
    >
      <Container maxW="1260px" paddingTop="5px">
        <Stack
          mt="4px"
          direction={["column", "row"]}
          alignItems={["flex-end", "center"]}
        >
          <Image
            marginLeft='6px'
            boxSize="42px"
            src="/logo.png"
          />
          <Text fontSize="xl" fontWeight="500">
            Andsub
          </Text>
          <Stack direction={["column", "row"]} style={{ marginLeft: "5rem" }}>
            <Button colorScheme="navItem" variant="ghost">
              Dashboard
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                colorScheme="navItem"
                variant="ghost"
                rightIcon={<Icon as={FaChevronDown} color="navItem.500" />}
              >
                Users
              </MenuButton>
              <MenuList>
                <MenuItem>View All</MenuItem>
                <MenuDivider />
                <MenuItem>Add New</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
          <Stack direction={["column", "row"]} style={{ marginLeft: "auto" }}>
            <Menu>
              <MenuButton
                as={Button}
                colorScheme="navItem"
                variant="ghost"
                rightIcon={<Icon as={FaCog} color="navItem.500" />}
              >
                Settings
              </MenuButton>
              <MenuList>
                <MenuGroup title="Profile">
                  <MenuItem>My Account</MenuItem>
                  <MenuItem>Payments </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Help">
                  <MenuItem>Docs</MenuItem>
                  <MenuItem>FAQ</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
}
