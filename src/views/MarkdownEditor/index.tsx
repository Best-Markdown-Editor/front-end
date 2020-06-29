import React, { useState, useEffect } from "react";
import Editor from "for-editor";
import Navbar from "../../utils/Navbar";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getFileBySlugQuery, editFileMutation } from "../../graphql";
import { useSelector } from "react-redux";

export default function MarkdownEditor() {
  const uid = useSelector((state: any) => state.auth?.uid);
  const { slug } = useParams();
  const { data: fileData } = useQuery(getFileBySlugQuery, {
    variables: {
      data: {
        slug,
        userId: uid,
      },
    },
  });
  const [editFile] = useMutation(editFileMutation);

  const initValue = localStorage.getItem(slug)
    ? localStorage.getItem(slug)
    : "";
  const [value, setValue] = useState(initValue);

  console.log("value:", value);
  console.log("fileData body:", fileData?.getFileBySlug?.body);
  async function handleChange(value: string) {
    setValue(value);
    localStorage.setItem(slug, value);
  }
  async function handleSave(value: any) {
    console.log("Saving values:", {
      id: fileData?.getFileBySlug?.id,
      title: fileData?.getFileBySlug?.title,
      body: value,
    });
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
  useEffect(() => {
    if (value === "") {
      if (fileData?.getFileBySlug?.body) {
        setValue(fileData?.getFileBySlug?.body);
        console.log("file data body:", fileData?.getFileBySlug?.body);
      }
    }
  }, [fileData, value]);
  return (
    <Navbar>
      <div className="demo-container">
        <Editor
          language="en"
          value={value ? value : undefined}
          onChange={handleChange}
          onSave={handleSave}
          height="calc(100vh - 5rem)"
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
