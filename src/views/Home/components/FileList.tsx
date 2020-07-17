import React, { useState } from "react";
import Loading from "./Loading";
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
  getMyFilesQuery,
  addNewFileMutation,
  deleteFileMutation,
} from "../../../graphql";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FileList() {
  const uid = useSelector((state: any) => state.auth?.uid);
  const history = useHistory();
  const [currFileId, setCurrFileId] = useState("");
  const { data, loading } = useQuery(getMyFilesQuery, {
    variables: {
      userId: uid,
    },
  });
  const [addFile] = useMutation(addNewFileMutation);
  const [deleteFile] = useMutation(deleteFileMutation);
  const { handleSubmit, register } = useForm();

  const { isModal, toggleModal } = useModal();
  const { isModal: isDeleteModal, toggleModal: toggleDeleteModal } = useModal();

  async function onSubmit({ title }: any) {
    const { data } = await addFile({
      variables: {
        data: {
          title,
          userId: uid,
          body: `# ${title} \n\n`,
        },
      },
      refetchQueries: [{ query: getMyFilesQuery, variables: { userId: uid } }],
    });
    console.log("add file data:", data);
    history.push(`/${data?.addFile?.slug}`);
    // data && data.addFile && data.addFile.slug
  }

  if (loading) return <Loading />;

  return (
    <>
      <Card w="40rem" shade>
        <Button green sink onClick={toggleModal}>
          Add New File
        </Button>
        {data?.getFiles.map((file: any) => (
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
            <Text
              bold
              as="a"
              color={theme.colors.gray9}
              hvrColor={theme.colors.gray7}
              href={`/${file.slug}`}
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
      <Modal active={isModal} toggle={toggleModal}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Text as="label" lg>
            Title for your new file:
          </Text>
          <Input type="text" name="title" ref={register} placeholder="Title" />
          <Button type="submit" blue>
            Create
          </Button>
        </Form>
      </Modal>
      <Modal active={isDeleteModal} toggle={toggleDeleteModal}>
        <Text>Are you sure you want do delete this file?</Text>
        <Button
          red
          onClick={async () => {
            // console.log("curr file id:", currFileId);
            await deleteFile({
              variables: {
                id: currFileId,
              },
              refetchQueries: [
                { query: getMyFilesQuery, variables: { userId: uid } },
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
      </Modal>
    </>
  );
}
