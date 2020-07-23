import React, { useState, useCallback } from "react";
import {
  Flex,
  Box,
  Text,
  ToolTip,
  Button,
  Input,
  Card,
  Modal,
  useModal,
  theme,
} from "sriracha-ui";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "./Title";
import { saveAs } from "file-saver";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  publishFileMutation,
  isFilePubQuery,
  getUserQuery,
} from "../../../../graphql";
import { useForm } from "react-hook-form";
import { storage } from "../../../../config/firebase";
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
  const [image, setImage] = useState<string>("");
  const [imgLoading, setImgLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState(false);
  const { isModal, toggleModal } = useModal();
  const { handleSubmit, register } = useForm();
  const [publishFile] = useMutation(publishFileMutation);

  const { data } = useQuery(isFilePubQuery, {
    variables: {
      id: currFile?.id,
    },
  });

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

  async function onSubmit(data: any) {
    await publishFile({
      variables: {
        data: {
          id: currFile.id,
          userId,
          description: data.description,
          thumbnail: image,
        },
      },
    });
    toggleModal();
  }

  const onDrop = useCallback(async (acceptedFiles) => {
    setImgLoading(true);
    await storage.ref(`/images/${acceptedFiles[0].name}`).put(acceptedFiles[0]);
    await storage
      .ref("images")
      .child(acceptedFiles[0].name)
      .getDownloadURL()
      .then((fireBaseUrl: string) => {
        setImage(fireBaseUrl);
        setImgLoading(false);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Flex stretch h="4rem" aiCenter jcBetween>
      <Flex aiCenter>
        <Box w="2rem" />
        <Title edit={edit} title={title} file={currFile} toggle={toggleEdit} />

        <Box w="2rem" />
        <Text bold color={theme.colors.red5}>
          {loading ? (
            <Flex aiCenter>
              <FontAwesomeIcon icon="spinner" spin />
              <Box w="1rem" />
              Loading file upload...
            </Flex>
          ) : null}
        </Text>
      </Flex>
      <Flex>
        {userData?.user?.subscriber ? (
          <ToolTip ttRight="3rem" ttTop="8.6rem">
            <Button purple p="0.5rem 1rem" onClick={toggleModal}>
              <FontAwesomeIcon icon="file-powerpoint" />
            </Button>
            <div className="tooltip">
              <Text
                color={theme.colors.gray9}
                bg={`radial-gradient(${theme.colors.gray0}, ${theme.colors.whiteAlpha5})`}
              >
                Publish file
              </Text>
            </div>
            <Modal active={isModal} toggle={toggleModal}>
              {data?.isFilePub ? (
                <Published
                  toggleModal={toggleModal}
                  userId={userId}
                  currFile={currFile}
                />
              ) : (
                <Flex drape as="form" onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    as="textarea"
                    name="description"
                    ref={register}
                    placeholder="Description..."
                  />
                  {image ? (
                    <Flex drape m="2rem 0">
                      <Box maxW="25rem">
                        <img src={image} alt="preview" />
                      </Box>
                    </Flex>
                  ) : imgLoading ? (
                    <Card invert m="2rem 0">
                      <FontAwesomeIcon icon="spinner" spin />
                    </Card>
                  ) : (
                    <Flex
                      {...getRootProps()}
                      border={`0.2rem dashed ${theme.colors.gray6}`}
                      hvrBorder={`0.2rem dashed ${theme.colors.gray4}`}
                      sqr="10rem"
                      m="2rem 0"
                    >
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      )}
                    </Flex>
                  )}
                  <Flex>
                    <Button red onClick={toggleModal}>
                      Cancel
                    </Button>
                    <Button green type="submit">
                      Publish
                    </Button>
                  </Flex>
                </Flex>
              )}
            </Modal>
          </ToolTip>
        ) : null}
        <ToolTip ttRight="3rem" ttTop="8.6rem">
          <Button
            blue
            p="0.5rem 1rem"
            onClick={() => exportMarkdownFile(currFile)}
          >
            <FontAwesomeIcon icon="file-download" />
          </Button>
          <div className="tooltip">
            <Text
              color={theme.colors.gray9}
              bg={`radial-gradient(${theme.colors.gray0}, ${theme.colors.whiteAlpha5})`}
              p="0.2rem"
            >
              Export as markdown file
            </Text>
          </div>
        </ToolTip>
        <Box w="0.5rem" />
      </Flex>
    </Flex>
  );
}
