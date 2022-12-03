import {
  Box,
  Flex,
  Link,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Collapse,
  HStack,
  useColorMode,
  Center,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { Link as RouterLink } from "react-router-dom";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useParams, useLocation } from "react-router-dom";
const Links = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Privacy Auth",
    path: "/auth",
  },
];

const NavLink = ({ children, current }) => (
  <Link
    as={RouterLink}
    to={children.path}
    px={2}
    py={1}
    rounded={"md"}
    fontWeight={current === children.path ? "900" : "400"}
    color={current === children.path ? "accent" : "gray.100"}
    _hover={{
      textDecoration: "none",
      color: "gray.300",
    }}
  >
    {children.label}
  </Link>
);

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box>
      <Flex
        zIndex={12}
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        width={"100%"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        display={{ base: "flex", md: "none" }}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Center alignContent={"center"}></Center>
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
          <Center alignContent={"center"}></Center>
        </Flex>

        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
      <DesktopNav />

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { page } = useParams();
  const location = useLocation();
  //console.log(location.pathname);
  return (
    <>
      {console.log(page)}
      <Box
        zIndex={12}
        bg={" rgba(10, 12, 32, 0.45)"}
        px={4}
        position={"fixed"}
        width={"100%"}
        display={{ base: "none", md: "block" }}
      >
        <Flex h={70} alignItems={"center"} justifyContent={"space-between"}>
          <Box mt={4}>
            <Stack direction={"row"} spacing={1} alignItems={"center"}></Stack>
          </Box>
          <Stack direction={"row"} alignItems={"center"}>
            <HStack spacing={8} alignItems={"center"} ml={-50}>
              <HStack
                as={"nav"}
                spacing={9}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map((link) => (
                  <NavLink key={link.path} current={location.pathname}>
                    {link}
                  </NavLink>
                ))}
              </HStack>
            </HStack>
          </Stack>
          <Flex alignItems={"center"} ml={138}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      pt={15}
      display={{ md: "none" }}
    >
      {Links.map((link) => (
        <MobileNavItem key={link.path}>{link}</MobileNavItem>
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ children }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={RouterLink}
        to={children.path ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {children.label}
        </Text>
      </Flex>
    </Stack>
  );
};
