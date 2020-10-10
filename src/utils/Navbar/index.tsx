import React from "react";
import { NavBar, Wrapper, Text, Box, Flex, theme } from "sriracha-ui";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserOptions from "./components/UserOptions";

interface Props {
  children: React.ReactNode;
}

export default function Navbar({ children }: Props) {
  const uid = useSelector((state: any) => state.auth?.uid);
  const navHeight = "5rem";

  return (
    <Wrapper>
      <NavBar radius="0" bg="gray9" h={navHeight} aic jca maxW="100vw">
        <Flex>
          <Link to="/">
            <Text
              as="h1"
              bold
              lf
              color={theme.colors.gray1}
              w="36rem"
              p="0 1rem"
              pointer
            >
              {window.matchMedia("(min-width: 870px)").matches
                ? "Best Markdown Editor"
                : "BME"}
            </Text>
          </Link>
        </Flex>
        <Flex className="user-info" w="100%" jce>
          {uid ? <UserOptions uid={uid} /> : null}
        </Flex>
      </NavBar>
      <Box h={navHeight} />
      {children}
    </Wrapper>
  );
}
