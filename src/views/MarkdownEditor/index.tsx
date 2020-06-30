import React, { useState, useEffect, useRef } from "react";
import Editor from "for-editor";
import Navbar from "../../utils/Navbar";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getFileBySlugQuery, editFileMutation } from "../../graphql";
import { useSelector } from "react-redux";
import { Flex, Text, Box, theme } from "sriracha-ui";
import { storage } from "../../config/firebase";

export default function MarkdownEditor() {
  const uid = useSelector((state: any) => state.auth?.uid);

  const { slug } = useParams();

  let imgRef = useRef();

  const [loading, setLoading] = useState<boolean>(false);
  const { data: fileData } = useQuery(getFileBySlugQuery, {
    variables: {
      data: {
        slug,
        userId: uid,
      },
    },
  });

  console.log("file data:", fileData);
  const [currTitle, setCurrTitle] = useState<any>("");

  const [editFile] = useMutation(editFileMutation);

  const initValue = localStorage.getItem(slug)
    ? localStorage.getItem(slug)
    : "";

  const [value, setValue] = useState(initValue);

  async function handleChange(value: string) {
    setValue(value);
    localStorage.setItem(slug, value);
  }

  async function handleSave(value: any) {
    await editFile({
      variables: {
        data: {
          id: fileData?.getFileBySlug?.id,
          title: fileData?.getFileBySlug?.title,
          body: value,
        },
      },
    });
  }

  async function addImg(file: any) {
    setLoading(true);
    await storage.ref(`/images/${file.name}`).put(file);
    await storage
      .ref("images")
      .child(file.name)
      .getDownloadURL()
      .then((fireBaseUrl: string) => {
        // @ts-ignore
        imgRef.current?.$img2Url(file.name, fireBaseUrl);
        setLoading(false);
      });
  }

  useEffect(() => {
    if (value === "") {
      if (fileData?.getFileBySlug?.body) {
        setValue(fileData?.getFileBySlug?.body);
      }
    }
    setCurrTitle(fileData?.getFileBySlug?.title);
  }, [fileData, value]);

  useEffect(() => {
    if (value === "") {
      if (fileData?.getFileBySlug?.body) {
        setValue(fileData?.getFileBySlug?.body);
      }
    }
  }, [fileData, value]);

  return (
    <Navbar>
      <Flex stretch h="4rem" aiCenter>
        <Box w="2rem" />
        <Text as="h2" bold lf>
          {currTitle}
        </Text>
        <Box w="2rem" />
        <Text bold color={theme.colors.red5}>
          {loading ? "Loading file upload..." : null}
        </Text>
      </Flex>
      <div className="demo-container">
        <Editor
          language="en"
          // @ts-ignore
          ref={imgRef}
          value={value ? value : undefined}
          onChange={handleChange}
          onSave={handleSave}
          addImg={addImg}
          height="calc(100vh - 9rem)"
          toolbar={{
            undo: true,
            redo: true,
            h1: true,
            h2: true,
            h3: true,
            h4: true,
            img: true,
            link: true,
            code: true,
            save: true,
            preview: true,
            expand: true,
            subfield: true,
          }}
          subfield={true}
          expand={false}
          preview={true}
        />
      </div>
    </Navbar>
  );
}
