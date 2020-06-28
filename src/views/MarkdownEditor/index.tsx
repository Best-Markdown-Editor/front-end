import React, { useState } from "react";
import Editor from "for-editor";
import Navbar from "../../utils/Navbar";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getFileQuery, editFileMutation } from "../../graphql";

export default function MarkdownEditor() {
  const { slug } = useParams();
  const { data: fileData } = useQuery(getFileQuery, {
    variables: {
      slug,
    },
  });
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
          id: fileData?.getFile?.id,
          title: fileData?.getFile?.title,
          body: value,
        },
      },
    });
  }
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
