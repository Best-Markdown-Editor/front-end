import React from "react";
import Navbar from "../../utils/Navbar";
import { Text } from "sriracha-ui";

export default function Cancel() {
  return (
    <Navbar>
      <Text>
        Sorry. You're payment could not be processed.{" "}
        <span role="img" aria-label="fire">
          💩
        </span>
      </Text>
      <Text as="a" href="/" pointer>
        Go back home
      </Text>
    </Navbar>
  );
}
