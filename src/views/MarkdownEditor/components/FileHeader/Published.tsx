import React, { useState, useCallback, useEffect } from "react";
import { Flex, Input, Button, Box, Card, theme } from "sriracha-ui";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { storage } from "../../../../config/firebase";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { publishFileMutation, getPubFileQuery } from "../../../../graphql";

interface FileHeaderProps {
  userId: string;
  currFile: any;
  toggleModal: () => boolean;
}

export default function Published({
  userId,
  currFile,
  toggleModal,
}: FileHeaderProps) {
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { data } = useQuery(getPubFileQuery, {
    variables: {
      id: currFile?.id,
    },
  });

  useEffect(() => {
    if (data?.getPubFile?.thumbnail.length > 0) {
      setImage(data?.getPubFile?.thumbnail);
    }
  }, [data]);

  const [publishFile] = useMutation(publishFileMutation);

  const { handleSubmit, register } = useForm();

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
    setLoading(true);
    await storage.ref(`/images/${acceptedFiles[0].name}`).put(acceptedFiles[0]);
    await storage
      .ref("images")
      .child(acceptedFiles[0].name)
      .getDownloadURL()
      .then((fireBaseUrl: string) => {
        setImage(fireBaseUrl);
        setLoading(false);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Flex drape as="form" onSubmit={handleSubmit(onSubmit)}>
      <Input
        as="textarea"
        name="description"
        ref={register}
        placeholder="Description..."
        defaultValue={data?.getPubFile?.description}
      />
      {image ? (
        <Flex drape m="2rem 0">
          <Box maxW="25rem">
            <img src={image} alt="preview" />
          </Box>
          <Button amber onClick={() => setImage("")}>
            Change Image
          </Button>
        </Flex>
      ) : loading ? (
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
            <p>Drag 'n' drop some files here, or click to select files</p>
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
  );
}
