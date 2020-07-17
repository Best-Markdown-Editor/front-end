import React, { useCallback, useState } from "react";
import { Flex, Text, Box, Input, Card, Button, theme } from "sriracha-ui";
import { useDropzone } from "react-dropzone";
import { storage } from "../../../config/firebase";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import { editUserMutation } from "../../../graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SettingsProps {
  user: any;
  toggle: () => any;
}

export default function Settings({ user, toggle }: SettingsProps) {
  const { handleSubmit, register } = useForm();
  const [editUser] = useMutation(editUserMutation);

  const [image, setImage] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    setLoading(true);
    // console.log("acceptedFiles", acceptedFiles);
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

  async function onSubmit(data: any) {
    await editUser({
      variables: {
        data: {
          id: user.id,
          username: data.username ? data.username : user.username,
          email: user.email,
          avatar: image ? image : user.avatar,
        },
      },
    });
    toggle();
  }

  return (
    <Flex as="form" drape w="35rem" onSubmit={handleSubmit(onSubmit)}>
      <Text as="label" for="username">
        Username...
      </Text>
      {edit ? (
        <Flex aiCenter>
          <Input name="username" ref={register} defaultValue={user.username} />
          <Box
            onClick={() => setEdit(false)}
            m="0 0 0 1rem"
            color={theme.colors.red6}
            hvrColor={theme.colors.red8}
          >
            <FontAwesomeIcon icon="window-close" size="lg" />
          </Box>
        </Flex>
      ) : (
        <Flex aiCenter>
          <Text bold lf>
            {user.username}
          </Text>
          <Box w="1rem" />
          <Box
            m="0.4rem 0 0 0"
            hvrColor={theme.colors.gray6}
            onClick={() => setEdit(true)}
          >
            <FontAwesomeIcon icon="edit" />
          </Box>
        </Flex>
      )}

      <Text as="label" for="avatar" m="2rem 0">
        Profile image...
      </Text>
      {image ? (
        <Flex drape>
          <Box maxW="25rem">
            <img src={image} alt="preview" />
          </Box>
        </Flex>
      ) : loading ? (
        <Card invert>
          <FontAwesomeIcon icon="spinner" spin />
        </Card>
      ) : (
        <Flex
          {...getRootProps()}
          border={`0.2rem dashed ${theme.colors.gray6}`}
          hvrBorder={`0.2rem dashed ${theme.colors.gray4}`}
          sqr="10rem"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </Flex>
      )}
      <Button amber type="green" m="2rem 0">
        Save changes...
      </Button>
    </Flex>
  );
}
