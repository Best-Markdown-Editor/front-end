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
  useTheme,
  theme,
} from "sriracha-ui";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  getMyFilesQuery,
  addNewFileMutation,
  deleteFileMutation,
  unPublishFileMutation,
  getPubFilesQuery,
} from "../../../graphql";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FileList() {
  const { theme: colorTheme } = useTheme();
  const { colors } = colorTheme;
  const uid = useSelector((state: any) => state.auth?.uid);
  const history = useHistory();
  const [currFileId, setCurrFileId] = useState("");
  const { data, loading } = useQuery(getMyFilesQuery, {
    variables: {
      userId: uid,
    },
  });
  const { data: pubFileData } = useQuery(getPubFilesQuery, {
    variables: {
      userId: uid,
    },
  });

  const publishedFileIdList: Number[] = pubFileData?.getPubFiles.map(
    (pubFiles: any) => {
      return pubFiles.id;
    }
  );

  const [addFile] = useMutation(addNewFileMutation);
  const [deleteFile] = useMutation(deleteFileMutation);
  const [unPublishFile] = useMutation(unPublishFileMutation);
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
    history.push(`/file/${data?.addFile?.slug}`);
  }

  if (loading) return <Loading />;

  return (
    <>
      <Card w="40rem" maxW="94vw" shade>
        <Button green sink onClick={toggleModal}>
          Add New File
        </Button>
        {data?.getFiles.map((file: any) => (
          <Card
            radius="0.5rem"
            bg={colors.gray4}
            key={file.id}
            stretch
            sink
            pointer
            row
            jcCenter
            aiCenter
            taLeft
          >
            {publishedFileIdList.includes(file.id) ? (
              <FontAwesomeIcon
                icon="upload"
                style={{ color: colors.purple9 }}
              />
            ) : (
              <FontAwesomeIcon
                icon="file-alt"
                style={{ color: colors.amber6 }}
              />
            )}
            <Box w="1rem" />
            <Text
              bold
              as="a"
              color={theme.colors.gray9}
              hvrColor={theme.colors.gray7}
              href={`/file/${file.slug}`}
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
        <Card>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Text as="label" lg>
              Title for your new file:
            </Text>
            <Input
              type="text"
              name="title"
              autoFocus
              ref={register}
              placeholder="Title"
            />
            <Button type="submit" blue>
              Create
            </Button>
          </Form>
        </Card>
      </Modal>
      <Modal active={isDeleteModal} toggle={toggleDeleteModal}>
        <Card>
          <Text>Are you sure you want to delete this file?</Text>
          <Button
            red
            onClick={async () => {
              await deleteFile({
                variables: {
                  id: currFileId,
                },
                refetchQueries: [
                  { query: getMyFilesQuery, variables: { userId: uid } },
                ],
              });
              await unPublishFile({
                variables: {
                  id: currFileId,
                },
                refetchQueries: [
                  { query: getPubFilesQuery, variables: { userId: uid } },
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
    </>
  );
}
