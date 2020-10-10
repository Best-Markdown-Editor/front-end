import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Tooltip,
  Button,
  Card,
  Modal,
  useModal,
  theme,
} from "sriracha-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveAs } from "file-saver";
import { useQuery } from "@apollo/react-hooks";
import { getUserQuery } from "../../../../graphql";
import Title from "./Title";
import Published from "./Published";

interface FileHeaderProps {
  userId: string;
  title: string;
  currFile: any;
  loading: boolean;
}

export default function FileHeader({
  userId,
  title,
  currFile,
  loading,
}: FileHeaderProps) {
  const [edit, setEdit] = useState(false);
  const { isModal, toggleModal } = useModal();

  console.log("curr file id:", currFile?.id);

  const { data: userData } = useQuery(getUserQuery, {
    variables: {
      id: userId,
    },
  });

  async function exportMarkdownFile(file: any) {
    const blob = new Blob([file.body], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, `${file.slug}.md`);
  }

  function toggleEdit() {
    setEdit(!edit);
  }

  return (
    <Flex stretch h="4rem" aic jcb>
      <Flex aic>
        <Box w="2rem" />
        <Title edit={edit} title={title} file={currFile} toggle={toggleEdit} />

        <Box w="2rem" />
        <Text bold color={theme.colors.red5}>
          {loading ? (
            <Flex aic>
              <FontAwesomeIcon icon="spinner" spin />
              <Box w="1rem" />
              Loading file upload...
            </Flex>
          ) : null}
        </Text>
      </Flex>
      <Flex>
        {userData?.user?.subscriber ? (
          <Tooltip ttRight="7.4rem" ttTop="8.2rem">
            <Button purple p="0.5rem 1rem" onClick={toggleModal}>
              <FontAwesomeIcon icon="file-powerpoint" />
            </Button>
            <div className="tooltip">
              <Card invert m="0">
                <Text>Publish file</Text>
              </Card>
            </div>
            <Modal active={isModal} toggle={toggleModal}>
              <Card>
                <Published
                  toggleModal={toggleModal}
                  userId={userId}
                  currFile={currFile}
                />
              </Card>
            </Modal>
          </Tooltip>
        ) : null}
        <Tooltip ttRight="3rem" ttTop="8.2rem">
          <Button
            blue
            p="0.5rem 1rem"
            onClick={() => exportMarkdownFile(currFile)}
          >
            <FontAwesomeIcon icon="file-download" />
          </Button>
          <div className="tooltip">
            <Card invert m="0">
              <Text>Export as markdown file</Text>
            </Card>
          </div>
        </Tooltip>
        <Box w="0.5rem" />
      </Flex>
    </Flex>
  );
}
