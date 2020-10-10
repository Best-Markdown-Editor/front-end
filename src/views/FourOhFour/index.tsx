import React from "react";
import { Link } from "react-router-dom";
import { Wrapper, Card, Text, Box } from "sriracha-ui";

export default function FourOhFour() {
  return (
    <Wrapper>
      <Card mt="10rem">
        <Text as="h1" size="3xl" bold>
          404 Error
        </Text>
        <Box stretch h="0.1rem" bg="gray6" />
        <Text>Sorry, the page you are looking for cannot be found.</Text>
        <Text as={Link} to="/" pointer>
          Go to the home page.
        </Text>
      </Card>
    </Wrapper>
  );
}
