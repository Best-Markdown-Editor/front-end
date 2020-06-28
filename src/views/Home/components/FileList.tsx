import React, { useState } from "react";
import Loading from "./Loading";
import {
  Card,
  Text,
  Modal,
  Button,
  Form,
  Input,
  // Box,
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

export default function FileList() {
  const history = useHistory();
  const [currTitle, setCurrTitle] = useState("");
  const { data, loading } = useQuery(getMyFilesQuery);
  const [addFile] = useMutation(addNewFileMutation);
  const [deleteFile] = useMutation(deleteFileMutation);
  const { handleSubmit, register } = useForm();

  const { isModal, toggleModal } = useModal();
  const { isModal: isDeleteModal, toggleModal: toggleDeleteModal } = useModal();

  async function onSubmit({ title }: any) {
    const { data } = await addFile({
      variables: {
        title: title,
      },
    });
    history.push(`/${data?.addFile?.slug}`);
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
            // as="a"
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
            <Button
              onClick={() => {
                toggleDeleteModal();
                setCurrTitle(file.title);
              }}
              p="0 0.5rem"
              radius="0.3rem"
              sink
              pointer
            >
              <Text
                bold
                fontSize="1.2rem"
                color={theme.colors.red5}
                hvrColor={theme.colors.red7}
                pointer
              >
                X
              </Text>
            </Button>
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
            await deleteFile({
              variables: {
                title: currTitle,
              },
              refetchQueries: [{ query: getMyFilesQuery }],
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
