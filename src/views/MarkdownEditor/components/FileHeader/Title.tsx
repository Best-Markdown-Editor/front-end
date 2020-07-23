import React, { useState, useEffect } from "react";
import { Text, Input, Flex, Button, Box, theme } from "sriracha-ui";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import { editFileMutation } from "../../../../graphql";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TitleProps {
  edit: boolean;
  title: string;
  file: any;
  toggle: () => void;
}

export default function Title({ edit, title, file, toggle }: TitleProps) {
  const history = useHistory();
  const [thisFile, setThisFile] = useState<any>();
  const [thisTitle, setThisTitle] = useState<string>("");

  const { handleSubmit, register } = useForm();

  const [editFile] = useMutation(editFileMutation);

  async function onSubmit(data: any) {
    const res = await editFile({
      variables: {
        data: {
          id: file?.id,
          title: data.title,
          body: file?.body,
        },
      },
    });
    setThisTitle(data.title);
    toggle();
    history.replace(`/${res?.data?.editFile?.slug}`);
  }

  useEffect(() => {
    if (!thisTitle && title) {
      setThisTitle(title);
    }
  }, [thisTitle, title]);

  useEffect(() => {
    if (!thisFile && file) {
      setThisFile(file);
    }
  }, [file, thisFile]);

  return (
    <>
      {edit ? (
        <Flex as="form" onSubmit={handleSubmit(onSubmit)}>
          <Text as="h2">
            <Input
              p="0.7rem"
              name="title"
              ref={register}
              defaultValue={thisTitle}
            />
          </Text>
          <Button
            blue
            sink
            p="0.5rem 1rem"
            m="0.5rem 0 0.5rem 1rem"
            type="submit"
          >
            <Text>Submit</Text>
          </Button>
          <Button
            red
            sink
            p="0.5rem 1rem"
            m="0.5rem 0 0.5rem 1rem"
            onClick={() => {
              toggle();
            }}
          >
            <Text>Cancel</Text>
          </Button>
        </Flex>
      ) : (
        <Text as="h2" bold lf>
          {title}
        </Text>
      )}
      <Box
        className={edit ? "hidden" : null}
        m="0 0 0 1rem"
        hvrColor={theme.colors.gray5}
        onClick={toggle}
        pointer
      >
        <FontAwesomeIcon icon="edit" />
      </Box>
    </>
  );
}
