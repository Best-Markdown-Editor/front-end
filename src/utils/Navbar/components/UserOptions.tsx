import React from "react";
import {
  ToolTip,
  Box,
  Button,
  Card,
  Text,
  Flex,
  Modal,
  useModal,
  theme,
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
  const { isModal, toggleModal } = useModal();
  const { data, loading } = useQuery(getUserQuery, {
    variables: {
      id: uid,
    },
  });
  // console.log("user:", data);

  return (
    <>
      <ToolTip ttTop="3rem" ttRight="0">
        <Box>
          {loading ? (
            <FontAwesomeIcon
              icon="spinner"
              spin
              style={{ color: theme.colors.gray1, marginRight: "2rem" }}
            />
          ) : (
            <Flex aiCenter>
              <Text fontSize="2rem" color={theme.colors.gray1}>
                {data?.user?.username}
              </Text>
              <Box w="1.6rem" />
              <Box sqr="3rem" circle m="0 1rem 0 0">
                <img src={data?.user?.avatar} alt="user avatar" />
              </Box>
            </Flex>
          )}
        </Box>
        <div className="tooltip">
          <Card bg={theme.colors.gray8}>
            <Button row amber w="12rem" onClick={toggleModal}>
              <FontAwesomeIcon icon="user-cog" /> <Box w="1rem" /> Settings
            </Button>
            <Button
              row
              red
              w="12rem"
              onClick={async () => firebase.auth().signOut()}
            >
              <FontAwesomeIcon icon="sign-out-alt" /> <Box w="1.2rem" /> Logout
            </Button>
          </Card>
        </div>
      </ToolTip>
      <Modal active={isModal} toggle={toggleModal}>
        <Settings user={data?.user} toggle={toggleModal} />
      </Modal>
    </>
  );
}
