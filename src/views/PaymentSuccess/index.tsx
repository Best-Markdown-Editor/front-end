import React, { useEffect } from "react";
import Navbar from "../../utils/Navbar";
import { Text } from "sriracha-ui";
import { subUserMutation } from "../../graphql";
import { useMutation } from "@apollo/react-hooks";
import { useSelector } from "react-redux";

export default function Success() {
  const [subUser] = useMutation(subUserMutation);
  const uid = useSelector((state: any) => state.auth?.uid);

  useEffect(() => {
    async function sub() {
      await subUser({
        variables: {
          id: uid,
        },
      });
    }
    sub();
  }, [subUser, uid]);

  return (
    <Navbar>
      <Text>
        Thanks! You're payment was a success!{" "}
        <span role="img" aria-label="fire">
          🔥
        </span>
      </Text>
      <Text as="a" href="/" pointer>
        Go back home
      </Text>
    </Navbar>
  );
}
