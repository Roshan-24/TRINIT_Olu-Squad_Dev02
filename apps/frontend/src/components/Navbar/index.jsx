import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
  VStack
} from "@chakra-ui/react";
import { transparentize } from "@chakra-ui/theme-tools";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useContext } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { Link } from "react-router-dom";
import { navbarHeight } from "../../config/constants";
import { userContext } from "../../contexts/UserContext";
import HamburgerMenuButton from "./../MenuButton";
import navItems from "./navbarItems";
import Search from "./search";

const MotionVStack = motion(VStack);

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navbarBg = useColorModeValue("white", "gray.900");
  const hamburgerIconColor = useColorModeValue("black", "white");

  const [isLargerThanSm] = useMediaQuery(["(min-width: 48em)"]);
  const { isOpen, onToggle } = useDisclosure();

  const { isLoggedIn, user, logout } = useContext(userContext);

  return (
    <>
      <HStack
        w={"full"}
        h={navbarHeight}
        pos={"fixed"}
        spacing={4}
        py={4}
        px={[4, 8, 16, 32, 64]}
        bg={transparentize(navbarBg, 0.8)}
        backdropFilter={"blur(4px)"}
        borderBottom={"1px"}
        borderColor={"gray.700"}
        zIndex={"10"}
      >
        <Link to={"/"}>
          <Heading fontSize={"2xl"} fontWeight={"bold"}>
            Bug tracker
          </Heading>
        </Link>
        {isLargerThanSm && (
          <HStack spacing={0} pl={4}>
            {/* {navItems
              .filter(navItem => navItem.mainNav)
              .map((navItem, idx) => (
                <Link to={navItem.href} key={idx}>
                  <Button fontWeight={"normal"} variant={"ghost"}>
                    {navItem.name}
                  </Button>
                </Link>
              ))} */}
            <Link to={"/organizations"}>
              <Button fontWeight={"normal"} variant={"ghost"}>
                Orgs
              </Button>
            </Link>
          </HStack>
        )}
        <Spacer />
        {isLargerThanSm ? (
          <>
            <Box pos={"relative"}>
              <Search />
            </Box>
            <IconButton
              onClick={toggleColorMode}
              icon={colorMode === "dark" ? <FiSun /> : <FiMoon />}
            />
            {!isLoggedIn ? (
              <Link to="/signIn">
                <Button colorScheme={"brand"}>Sign in</Button>
              </Link>
            ) : (
              <Box boxSize={"40px"}>
                <Menu placement="bottom-end">
                  <MenuButton
                    boxSize={"40px"}
                    rounded={"md"}
                    overflow={"hidden"}
                    cursor={"pointer"}
                  >
                    <Image src={`https://gravatar.com/avatar/${user.hashedEmail}?d=retro`} />
                  </MenuButton>
                  <MenuList bg={navbarBg}>
                    <Text px={3} py={1}>
                      Hey, {user.firstName}!
                    </Text>
                    <MenuDivider />
                    <MenuItem>Profile</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            )}
          </>
        ) : (
          <IconButton
            onClick={onToggle}
            icon={
              <HamburgerMenuButton
                width={18}
                height={18}
                color={hamburgerIconColor}
                isOpen={isOpen}
              />
            }
          />
        )}
      </HStack>
      <AnimatePresence>
        {isOpen && !isLargerThanSm && (
          <MotionVStack
            mt={navbarHeight}
            py={4}
            px={8}
            spacing={2}
            w={"full"}
            align={"stretch"}
            pos={"fixed"}
            bg={transparentize(navbarBg, 0.8)}
            backdropFilter={"blur(4px)"}
            borderBottom={"1px"}
            borderColor={"gray.700"}
            initial={{ y: "-200%" }}
            animate={{ y: 0 }}
            exit={{ y: "-200%" }}
            transition={{ type: "tween" }}
          >
            {navItems
              .filter(navItem => navItem.dropdown)
              .map((navItem, idx) => (
                <Fragment key={idx}>
                  <Link to={navItem.href}>
                    <Text cursor={"pointer"}>{navItem.name}</Text>
                  </Link>
                  {idx < navItems.length - 1 && <Divider />}
                </Fragment>
              ))}
            <Spacer />
            <Spacer />
            <HStack spacing={4}>
              {isLoggedIn ? (
                <Button onClick={logout} w={"full"} colorScheme={"brand"}>
                  Logout
                </Button>
              ) : (
                <Link to="/signIn" style={{ flex: 1 }}>
                  <Button w={"full"} colorScheme={"brand"}>
                    Sign in
                  </Button>
                </Link>
              )}
              <IconButton
                onClick={toggleColorMode}
                icon={colorMode === "dark" ? <FiSun /> : <FiMoon />}
              />
            </HStack>
          </MotionVStack>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
