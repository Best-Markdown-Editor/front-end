import React, { useState } from "react";
import {
  Wrapper,
  Text,
  Card,
  Flex,
  Button,
  Box,
  Form,
  Input,
  Modal,
  useModal,
  theme,
} from "sriracha-ui";
import { useMutation } from "@apollo/react-hooks";
import { loginMutation, isAuthQuery, registerMutation } from "../../../graphql";
import { useForm } from "react-hook-form";

export default function Landing() {
  const [login] = useMutation(loginMutation);
  const [register] = useMutation(registerMutation);

  const { isModal: isLogin, toggleModal: toggleLogin } = useModal();
  const { isModal: isRegister, toggleModal: toggleRegister } = useModal();

  const { register: reg, handleSubmit } = useForm();

  const [errors, setErrors] = useState<any>();

  console.log("errors:", errors);
  async function onLogin({ email, password }: any) {
    try {
      const { data: apolloData } = await login({
        refetchQueries: [{ query: isAuthQuery }],
        variables: {
          data: {
            email,
            password,
          },
        },
      });
      console.log("apollo data:", apolloData);
      console.log("email", email, "password", password);
    } catch (err) {
      setErrors(err.graphQLErrors[0].message);
    }
  }

  async function onRegister({ email, username, password1, password2 }: any) {
    try {
      const { data: apolloData } = await register({
        refetchQueries: [{ query: isAuthQuery }],
        variables: {
          data: {
            email,
            username,
            password1,
            password2,
          },
        },
      });
      console.log("apollo data:", apolloData);
      console.log(
        "email",
        email,
        "username",
        username,
        "password1",
        password1,
        "password2",
        password2
      );
    } catch (err) {
      setErrors(err.graphQLErrors[0].message);
    }
  }
  return (
    <>
      <Wrapper jcAround>
        <Card stretch>
          <Text as="h2" xlf bold m="3rem 0">
            Welcome to Best Markdown Editor!
          </Text>
        </Card>
        <Flex stretch jcCenter visible>
          <Button green sink m="0 2rem" onClick={toggleLogin}>
            Login
          </Button>
          <Button amber sink m="0 2rem" onClick={toggleRegister}>
            Sign up
          </Button>
        </Flex>
        <Card taLeft p="3rem" stretch invert>
          <Flex drape>
            <Text as="a" lf bold href="/demo" pointer>
              Go to Demo page.
            </Text>
            <Text as="p" m="2rem 0" maxW="60rem">
              Best Markdown Editor is a online markdown editor progressive web
              app. You can install it to your any computer or mobile device. If
              you have the grammarly extension in the browser you used to
              install Best Markdown Editor, you will have an app that uses your
              grammarly account to spell check your work!
            </Text>
            <Text as="p" m="2rem 0" maxW="60rem">
              In addition, we also help you keep track of your files. You can
              create new files, edit files, and delete files. You can even
              export them as a markdown file to your computer.
            </Text>
            <Text as="p" m="2rem 0" maxW="60rem">
              All and all, this is a pretty simple web app that's meant to be
              simple. If you're like me, and you write markdown for multiple
              platforms and constantly posting blogs to different mediums, it's
              nice to have one simple place where you can keep track of
              everything.
            </Text>
          </Flex>
        </Card>
        <Box h="15vh" />
      </Wrapper>
      <Modal active={isLogin} toggle={toggleLogin}>
        <Form
          onSubmit={handleSubmit(onLogin)}
          maxW="90vw"
          maxH="90vh"
          w="30rem"
          h="20rem"
        >
          <Input
            m="0 0 1rem 0"
            ref={reg}
            type="text"
            name="email"
            placeholder="Email..."
          />
          <Input
            m="0 0 1rem 0"
            ref={reg}
            type="password"
            name="password"
            placeholder="Password..."
          />
          <Text color={theme.colors.red5} m="2rem 0">
            {errors ? errors : null}
          </Text>
          <Button type="submit" green>
            Login
          </Button>
        </Form>
      </Modal>
      <Modal active={isRegister} toggle={toggleRegister}>
        <Form
          onSubmit={handleSubmit(onRegister)}
          maxW="90vw"
          maxH="90vh"
          w="30rem"
          h="30rem"
        >
          <Input
            m="0 0 1rem 0"
            ref={reg}
            type="text"
            name="email"
            placeholder="Email..."
          />
          <Input
            m="0 0 1rem 0"
            ref={reg}
            type="text"
            name="username"
            placeholder="Username..."
          />
          <Input
            m="0 0 1rem 0"
            ref={reg}
            type="password"
            name="password1"
            placeholder="Password..."
          />
          <Input
            m="0 0 1rem 0"
            ref={reg}
            type="password"
            name="password2"
            placeholder="Repeat password..."
          />
          <Text color={theme.colors.red5} m="2rem 0">
            {errors ? errors : null}
          </Text>
          <Button type="submit" green>
            Login
          </Button>
        </Form>
      </Modal>
    </>
  );
}
