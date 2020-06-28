import React from "react";
import { NavBar, Wrapper, Text, Box, Button, Flex, theme } from "sriracha-ui";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { isAuthQuery, logoutMutation } from "../../graphql";

interface Props {
  children: React.ReactNode;
}

export default function Navbar({ children }: Props) {
  const navHeight = "5rem";
  const { data } = useQuery(isAuthQuery);
  const [logout] = useMutation(logoutMutation);
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
        {data?.isAuth ? (
          <Button
            red
            onClick={() =>
              logout({
                refetchQueries: [{ query: isAuthQuery }],
              })
            }
          >
            Logout
          </Button>
        ) : null}
      </NavBar>
      <Box h={navHeight} />
      {children}
    </Wrapper>
  );
}
