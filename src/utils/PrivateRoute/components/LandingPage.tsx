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
import { loginMutation } from "../../../graphql";
import { useForm } from "react-hook-form";
import firebase from "../../../config/firebase";

export default function Landing() {
  const [login] = useMutation(loginMutation);

  const { isModal: isLogin, toggleModal: toggleLogin } = useModal();
  const { isModal: isRegister, toggleModal: toggleRegister } = useModal();

  const { register: reg, handleSubmit } = useForm();

  const [errors, setErrors] = useState<any>();

  async function onLogin({ email, password }: any) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      setErrors(err.message);
    }
  }

  async function onRegister({ email, username, password1, password2 }: any) {
    if (password1 !== password2) {
      setErrors("Passwords do not match... 💩");
      return;
    }
    if (password1.length < 6) {
      setErrors("Password must be 6 or more characters... 💩");
      return;
    }
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password1);
      await login({
        variables: {
          data: {
            id: res.user?.uid,
            username: username,
            email: res.user?.email,
            avatar: res.user?.photoURL
              ? res.user?.photoURL
              : "http://chrisalensula.org/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
          },
        },
      });
    } catch (err) {
      setErrors(err.message);
    }
  }
  return (
    <>
      <Wrapper jca>
        <Card stretch>
          <Text as="h2" size="3xl" bold m="3rem 0">
            Welcome to Best Markdown Editor!
          </Text>
        </Card>
        <Flex stretch jcc>
          <Button green sink m="0 2rem" onClick={toggleLogin}>
            Login
          </Button>
          <Button amber sink m="0 2rem" onClick={toggleRegister}>
            Sign up
          </Button>
        </Flex>
        <Card tal p="3rem" stretch invert>
          <Flex drape>
            <Text as="a" size="lg" bold href="/demo" pointer>
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
        <Card>
          <Text bold size="xl" mt="2rem" mb="1rem">
            Login
          </Text>
          <Form
            onSubmit={handleSubmit(onLogin)}
            maxW="90vw"
            maxH="90vh"
            w="30rem"
          >
            <Input
              mb="1rem"
              ref={reg}
              type="text"
              name="email"
              placeholder="Email..."
            />
            <Input
              mb="1rem"
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
        </Card>
      </Modal>
      <Modal active={isRegister} toggle={toggleRegister}>
        <Card>
          <Text bold size="xl" mt="2rem" mb="1rem">
            Register
          </Text>
          <Form
            onSubmit={handleSubmit(onRegister)}
            maxW="90vw"
            maxH="90vh"
            w="30rem"
          >
            <Input
              mb="1rem"
              ref={reg}
              type="text"
              name="email"
              placeholder="Email..."
            />
            <Input
              mb="1rem"
              ref={reg}
              type="text"
              name="username"
              placeholder="Username..."
            />
            <Input
              mb="1rem"
              ref={reg}
              type="password"
              name="password1"
              placeholder="Password..."
            />
            <Input
              mb="1rem"
              ref={reg}
              type="password"
              name="password2"
              placeholder="Repeat password..."
            />
            <Text color={theme.colors.red5} m="2rem 0">
              {errors ? errors : null}
            </Text>
            <Button type="submit" amber>
              Register
            </Button>
          </Form>
        </Card>
      </Modal>
    </>
  );
}
