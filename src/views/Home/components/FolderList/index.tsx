import React, { useState } from "react";
import Loading from "../Loading";
import {
  Card,
  Text,
  Modal,
  Button,
  Form,
  Input,
  Box,
  useModal,
  theme,
} from "sriracha-ui";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  getUserFoldersQuery,
  AddFolderMutation,
  DeleteFolderMutation,
  getFilesInFolderByIdQuery,
} from "../../../../graphql";
import { useForm } from "react-hook-form";
// import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PubToFolderModal from "./PubToFolderModal";
import FolderModal from "./FolderModal";

interface FolderListProps {
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

export default function FolderList({ pubFiles }: FolderListProps) {
  const uid = useSelector((state: any) => state.auth?.uid);
  // const history = useHistory();
  const [currFolderId, setCurrFolderId] = useState("");
  // const [currFileList, setCurrFileList] = useState<number[]>([]);
  const { data, loading } = useQuery(getUserFoldersQuery, {
    variables: {
      userId: uid,
    },
  });
  const { data: pubFilesData } = useQuery(getFilesInFolderByIdQuery, {
    variables: {
      id: currFolderId,
    },
  });
  const files = pubFilesData?.getFilesInFolderById;
  console.log("user folders:", data);
  const [addFolder] = useMutation(AddFolderMutation);
  const [deleteFolder] = useMutation(DeleteFolderMutation);
  const { handleSubmit, register } = useForm();

  const { isModal, toggleModal } = useModal();
  const { isModal: isDeleteModal, toggleModal: toggleDeleteModal } = useModal();
  const { isModal: isFolderModal, toggleModal: toggleFolderModal } = useModal();
  const { isModal: isPubFilesModal, toggleModal: togglePubFilesModal } =
    useModal();

  async function onSubmit({ name }: any) {
    await addFolder({
      variables: {
        data: {
          name,
          userId: uid,
        },
      },
      refetchQueries: [
        { query: getUserFoldersQuery, variables: { userId: uid } },
      ],
    });
    toggleModal();
    // history.push(`/file/${data?.addFolder?.slug}`);
  }

  if (loading) return <Loading />;

  return (
    <>
      <Card w="40rem" maxW="94vw" shade>
        <Button green row aiCenter sink onClick={toggleModal}>
          Add New Folder
        </Button>
        {data?.getUserFolders?.map((folder: any) => (
          <Card
            radius="0.5rem"
            bg={theme.colors.gray4}
            key={folder.id}
            stretch
            sink
            pointer
            across
            jcEvenly
            aiCenter
            taLeft
          >
            <FontAwesomeIcon icon="folder" />
            <Box w="1rem" />
            <Text
              bold
              as="a"
              color={theme.colors.gray9}
              hvrColor={theme.colors.gray7}
              // href={`/file/${file.slug}`}
              onClick={() => {
                setCurrFolderId(folder.id);
                toggleFolderModal();
              }}
              stretch
              pointer
            >
              {folder.name}
            </Text>
            <Box
              onClick={() => {
                toggleDeleteModal();
                setCurrFolderId(folder.id);
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
      <Modal active={isModal} toggle={toggleModal}>
        <Card>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Text as="label" lg>
              Title for your new folder:
            </Text>
            <Input
              type="text"
              name="name"
              autoFocus
              ref={register}
              placeholder="Name..."
            />
            <Button type="submit" blue sink>
              Create
            </Button>
          </Form>
        </Card>
      </Modal>
      <Modal active={isDeleteModal} toggle={toggleDeleteModal}>
        <Card>
          <Text>Are you sure you want to delete this folder?</Text>
          <Button
            red
            onClick={async () => {
              await deleteFolder({
                variables: {
                  id: currFolderId,
                },
                refetchQueries: [
                  { query: getUserFoldersQuery, variables: { userId: uid } },
                ],
              });
              toggleDeleteModal();
            }}
          >
            Delete
          </Button>
          <Button blue onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </Card>
      </Modal>
      <FolderModal
        isFolderModal={isFolderModal}
        toggleFolderModal={toggleFolderModal}
        togglePubFilesModal={togglePubFilesModal}
        getUserFolders={data?.getUserFolders}
        files={files}
      />
      <PubToFolderModal
        isPubFilesModal={isPubFilesModal}
        togglePubFilesModal={togglePubFilesModal}
        toggleFolderModal={toggleFolderModal}
        pubFiles={pubFiles}
        files={files}
        currFolderId={currFolderId}
      />
    </>
  );
}
