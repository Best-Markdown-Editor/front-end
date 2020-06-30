import React, { useState, useEffect, useRef } from "react";
import Editor from "for-editor";
import Navbar from "../../utils/Navbar";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getFileBySlugQuery, editFileMutation } from "../../graphql";
import { useSelector } from "react-redux";
import { Flex, Text, Box, Button, ToolTip, theme } from "sriracha-ui";
import { storage } from "../../config/firebase";
import { saveAs } from "file-saver";

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

  async function exportMarkdownFile(file: any) {
    await handleSave(localStorage.getItem(slug));
    const blob = new Blob([file.body], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, `${file.slug}.md`);
  }

  useEffect(() => {
    if (value === "") {
      if (fileData?.getFileBySlug?.body) {
        setValue(fileData?.getFileBySlug?.body);
      }
    }
    setCurrTitle(fileData?.getFileBySlug?.title);
  }, [fileData, value]);

  return (
    <Navbar>
      <Flex stretch h="4rem" aiCenter jcBetween>
        <Flex>
          <Box w="2rem" />
          <Text as="h2" bold lf>
            {currTitle}
          </Text>
          <Box w="2rem" />
          <Text bold color={theme.colors.red5}>
            {loading ? "Loading file upload..." : null}
          </Text>
        </Flex>
        <Flex>
          <ToolTip ttRight="4.2rem" ttTop="5.6rem">
            <Button
              blue
              p="0.5rem 1rem"
              onClick={() => exportMarkdownFile(fileData?.getFileBySlug)}
            >
              <Box sqr="1.2rem" bg={theme.colors.lightBlue1} window />
            </Button>
            <div className="tooltip">
              <Text sf color={theme.colors.gray9} w="14rem">
                Export as markdown file. (Don't forget to save first!)
              </Text>
            </div>
          </ToolTip>
        </Flex>
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
