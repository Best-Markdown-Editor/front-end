import React from "react";
import { Modal, Card, Button, Text, Flex, Box, theme } from "sriracha-ui";
import { useMutation } from "@apollo/react-hooks";
import {
  AddPubToFolderMutation,
  UnPubToFolderMutation,
  getFilesInFolderByIdQuery,
} from "../../../../graphql";

export default function PubToFolderModal({
  isPubFilesModal,
  togglePubFilesModal,
  toggleFolderModal,
  pubFiles,
  files,
  currFolderId,
}: any) {
  const [addPubToFolder] = useMutation(AddPubToFolderMutation);
  const [unPubToFolder] = useMutation(UnPubToFolderMutation);

  return (
    <Modal active={isPubFilesModal} toggle={togglePubFilesModal}>
      <Flex drape w="36rem" maxW="94vw" m="0" visible>
        {pubFiles.map((pub: any) => (
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
          >
            <input
              type="checkbox"
              color={theme.colors.red5}
              name={pub.title}
              defaultChecked={files?.some((file: any) => file.id === pub.id)}
              onClick={async (e: any) => {
                console.log(`pubId: ${pub.id} \nfolderId: ${currFolderId}`);
                if (!e.target.checked) {
                  try {
                    await unPubToFolder({
                      variables: {
                        data: {
                          pubId: Number(pub.id),
                          folderId: Number(currFolderId),
                        },
                      },
                      refetchQueries: [
                        {
                          query: getFilesInFolderByIdQuery,
                          variables: { id: currFolderId },
                        },
                      ],
                    });
                  } catch (err) {
                    console.log("error:", err);
                  }
                } else {
                  try {
                    await addPubToFolder({
                      variables: {
                        data: {
                          pubId: Number(pub.id),
                          folderId: Number(currFolderId),
                        },
                      },
                      refetchQueries: [
                        {
                          query: getFilesInFolderByIdQuery,
                          variables: { id: currFolderId },
                        },
                      ],
                    });
                  } catch (err) {
                    console.log("error:", err);
                  }
                }
              }}
            />
            <Box w="0.6rem" />
            <Text bold>{pub.title}</Text>
          </Card>
        ))}
        <Button
          type="submit"
          green
          sink
          onClick={() => {
            toggleFolderModal();
            togglePubFilesModal();
          }}
        >
          Finished!
        </Button>
      </Flex>
    </Modal>
  );
}
