import React from "react";
import { NavBar, Wrapper, Text, Box, Button, Flex, theme } from "sriracha-ui";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "../../config/firebase";

interface Props {
  children: React.ReactNode;
}

export default function Navbar({ children }: Props) {
  const uid = useSelector((state: any) => state.auth?.uid);
  const navHeight = "5rem";
  return (
    <Wrapper>
      <NavBar bg={theme.colors.gray9} h={navHeight} aiCenter jcBetween>
        <Flex>
          <Box w="1rem" />
          <Link to="/">
            <Text as="h1" bold lf color={theme.colors.gray1} pointer>
              Best Markdown Editor
            </Text>
          </Link>
        </Flex>
        {uid ? (
          <Button red onClick={async () => firebase.auth().signOut()}>
            Logout
          </Button>
        ) : null}
      </NavBar>
      <Box h={navHeight} />
      {children}
    </Wrapper>
  );
}
