import React, { useState } from "react";
import Loading from "./Loading";
import { Card, Text, Button, Box, Modal, useModal, theme } from "sriracha-ui";
import { useMutation } from "@apollo/react-hooks";
import { unPublishFileMutation, getPubFilesQuery } from "../../../graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PubFileListProps {
  loading: boolean;
  userId: string;
  pubFiles: [
    {
      id: number;
      title: string;
      slug: string;
      body: string;
      description: string;
      thumbnail: string;
      publishedOn: number;
      updatedAt: number;
    }
  ];
}

export default function PubFileList({
  loading,
  pubFiles,
  userId,
}: PubFileListProps) {
  const [currFileId, setCurrFileId] = useState("");
  const { isModal: isDeleteModal, toggleModal: toggleDeleteModal } = useModal();
  const [unPublishFile] = useMutation(unPublishFileMutation);

  if (loading) return <Loading />;

  return (
    <>
      <Card w="40rem" maxW="94vw" shade>
        <Text lf bold as="h3">
          Published Files
        </Text>
        <Box w="98%" h="0.2rem" bg={theme.colors.gary7} />
        {pubFiles.map((file: any) => (
          <Card
            radius="0.5rem"
            bg={theme.colors.gray4}
            key={file.id}
            stretch
            sink
            pointer
            across
            jcEvenly
            aiCenter
            taLeft
          >
            {console.log('pbFIles', pubFiles)}
            <FontAwesomeIcon icon="upload" />
            <Box w="1rem" />
            <Text
              bold
              as="a"
              color={theme.colors.gray9}
              hvrColor={theme.colors.gray7}
              href={`/preview/${file.slug}`}
              stretch
              pointer
            >
              {file.title}
            </Text>
            <Box
              onClick={() => {
                toggleDeleteModal();
                setCurrFileId(file.id);
              }}
              visible
              pointer
              color={theme.colors.red6}
              hvrColor={theme.colors.red9}
            >
              <FontAwesomeIcon icon="window-close" size="lg" />
            </Box>
          </Card>
        ))}
      </Card>
      <Modal active={isDeleteModal} toggle={toggleDeleteModal}>
        <Card>
          <Text>Are you sure you want to unpublish this file?</Text>
          <Button
            red
            onClick={async () => {
              await unPublishFile({
                variables: {
                  id: currFileId,
                },
                refetchQueries: [
                  { query: getPubFilesQuery, variables: { userId } },
                ],
              });
              toggleDeleteModal();
            }}
          >
            Unpublish
          </Button>
          <Button blue onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </Card>
      </Modal>
    </>
  );
}
