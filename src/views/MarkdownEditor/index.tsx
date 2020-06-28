import React, { useState } from "react";
import Editor from "for-editor";
import Navbar from "../../utils/Navbar";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getFileQuery, editFileMutation } from "../../graphql";

export default function MarkdownEditor() {
  const { slug } = useParams();
  const { data } = useQuery(getFileQuery, {
    variables: {
      slug,
    },
  });
  console.log("get file:", data);
  const [editFile, { error }] = useMutation(editFileMutation);

  console.log("error:", error);
  const initValue = localStorage.getItem(slug)
    ? localStorage.getItem(slug)
    : "";
  const [value, setValue] = useState(initValue);
  async function handleChange(value: string) {
    setValue(value);
    localStorage.setItem(slug, value);
  }
  async function handleSave(value: any) {
    console.log("saving value:", {
      id: data?.getFile?.id,
      title: data?.getFile?.title,
      body: value,
    });
    try {
      await editFile({
        variables: {
          data: {
            id: data?.getFile?.id,
            title: data?.getFile?.title,
            body: value,
          },
        },
        refetchQueries: [{ query: getFileQuery }],
      });
    } catch (err) {
      console.log("err message", err.graphQLErrors[0].message);
      return err.graphQLErrors[0].message;
    }
  }
  console.log(value);
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
