import React from "react";
import { Modal, Flex, Button, Text, Card, theme } from "sriracha-ui";
import { useHistory } from "react-router-dom";

export default function FolderModal({
  isFolderModal,
  toggleFolderModal,
  togglePubFilesModal,
  files,
}: any) {
  const history = useHistory();
  return (
    <Modal active={isFolderModal} toggle={toggleFolderModal}>
      <Flex drape w="36rem" maxW="94vw" m="0">
        <Button
          orange
          sink
          onClick={() => {
            togglePubFilesModal();
            toggleFolderModal();
          }}
        >
          Edit Files
        </Button>
        <Text bold>Files currently published to this folder:</Text>
        {files?.map((pub: any) => {
          return (
            <Card
              row
              aiCenter
              stretch
              radius="0.5rem"
              bg={theme.colors.gray4}
              key={pub.id}
              sink
              pointer
              taLeft
              onClick={() => history.push(`/preview/${pub.slug}`)}
            >
              <Text bold pointer>
                {pub.title}
              </Text>
            </Card>
          );
        })}
      </Flex>
    </Modal>
  );
}
