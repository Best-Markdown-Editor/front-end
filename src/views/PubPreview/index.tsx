import React, { useState, useEffect } from "react";
import Editor from "for-editor";
import Navbar from "../../utils/Navbar";
import { useParams } from "react-router";
import { useQuery } from "@apollo/react-hooks";
import { getPubFileBySlugQuery } from "../../graphql";
import { useSelector } from "react-redux";
import FileHeader from "./components/FileHeader";

export default function PubPreview() {
  const uid = useSelector((state: any) => state.auth?.uid);

  const { slug } = useParams();

  const { data: fileData } = useQuery(getPubFileBySlugQuery, {
    variables: {
      data: {
        slug,
        userId: uid,
      },
    },
  });

  const [currTitle, setCurrTitle] = useState<any>("");

  const [value, setValue] = useState("");

  useEffect(() => {
    if (value === "") {
      if (fileData?.getPubFileBySlug?.body) {
        setValue(fileData?.getPubFileBySlug?.body);
      }
    }
    setCurrTitle(fileData?.getPubFileBySlug?.title);
  }, [fileData, value]);

  return (
    <Navbar>
      <FileHeader title={currTitle} currFile={value} />
      <div className="demo-container">
        {window.matchMedia("(min-width: 768px)").matches ? (
          <Editor
            language="en"
            value={value ? value : undefined}
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
              preview: true,
              expand: true,
              subfield: true,
            }}
            subfield={true}
            expand={false}
            preview={true}
          />
        ) : (
          <Editor
            language="en"
            value={value ? value : undefined}
            height="calc(100vh - 9rem)"
            toolbar={{
              undo: true,
              redo: true,
              img: true,
              link: true,
              code: true,
              preview: true,
              expand: true,
              subfield: true,
            }}
            subfield={false}
            expand={false}
            preview={false}
          />
        )}
      </div>
    </Navbar>
  );
}
