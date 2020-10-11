import React from "react";
import {
  Img,
  Box,
  Button,
  Card,
  Text,
  Flex,
  Modal,
  useModal,
  useTheme,
} from "sriracha-ui";
import firebase from "../../../config/firebase";
import { useQuery } from "@apollo/react-hooks";
import { getUserQuery } from "../../../graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Settings from "./Settings";

interface UserProps {
  uid: string;
}

export default function UserOptions({ uid }: UserProps) {
  const { isModal: isSettings, toggleModal: toggleSettings } = useModal();
  const { isModal: isOptions, toggleModal: toggleOptions } = useModal();
  const { data, loading } = useQuery(getUserQuery, {
    variables: {
      id: uid,
    },
  });

  const { themeString, toggleTheme, theme, lightTheme } = useTheme();

  return (
    <>
      <Box>
        {loading ? (
          <FontAwesomeIcon
            icon="spinner"
            spin
            style={{ color: theme.colors.gray1, marginRight: "2rem" }}
          />
        ) : (
          <Flex aic onClick={toggleOptions} pointer>
            <Text size="2rem" color={lightTheme.colors.gray1}>
              {data?.user?.username}
            </Text>
            <Box w="1.6rem" />
            <Img
              sqr="3rem"
              circle
              mr="1rem"
              src={data?.user?.avatar}
              alt="user avatar"
            />
          </Flex>
        )}
      </Box>
      <Modal active={isSettings} toggle={toggleSettings}>
        <Settings user={data?.user} toggle={toggleSettings} />
      </Modal>
      <Modal
        obg="none"
        top="2.2rem"
        left="auto"
        right="1.8rem"
        translate="0, 0"
        active={isOptions}
        toggle={toggleOptions}
      >
        <Card bg="gray8">
          <Button
            row
            orange
            w="16rem"
            onClick={() => {
              toggleSettings();
              toggleOptions();
            }}
          >
            <FontAwesomeIcon icon="user-cog" /> <Box w="1rem" />{" "}
            <Text bold>Settings</Text>
          </Button>
          <Button row bg="gray5" hvrBg="gray7" onClick={toggleTheme} w="16rem">
            {themeString === "dark" ? (
              <>
                <FontAwesomeIcon
                  icon="sun"
                  color={theme.colors.amber5}
                  size="lg"
                />
                <Box w="1rem" />
                <Text bold>Light Mode</Text>
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon="moon"
                  color={theme.colors.purple7}
                  size="lg"
                />
                <Box w="1rem" />
                <Text bold>Dark Mode</Text>
              </>
            )}
          </Button>
          <Button
            row
            red
            w="16rem"
            onClick={async () => firebase.auth().signOut()}
          >
            <FontAwesomeIcon icon="sign-out-alt" /> <Box w="1.2rem" />{" "}
            <Text bold>Logout</Text>
          </Button>
        </Card>
      </Modal>
    </>
  );
}
