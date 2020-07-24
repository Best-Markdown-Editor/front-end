import React, { useState, useEffect, useRef } from "react";
import Editor from "for-editor";
import Navbar from "../../utils/Navbar";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getFileBySlugQuery, editFileMutation } from "../../graphql";
import { useSelector } from "react-redux";
// import FileHeader from "./components/FileHeader";
import { storage } from "../../config/firebase";

export default function PubPreview() {
  const uid = useSelector((state: any) => state.auth?.uid);

  const { slug } = useParams();

  const imgRef = useRef();

  const [loading, setLoading] = useState<boolean>(false);
  const { data: fileData } = useQuery(getFileBySlugQuery, {
    variables: {
      data: {
        slug,
        userId: uid,
      },
    },
  });

  const [currTitle, setCurrTitle] = useState<any>("");

  const [editFile] = useMutation(editFileMutation);

  const [value, setValue] = useState("");

  async function handleChange(value: string) {
    setValue(value);
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

  return (
    <Navbar>
      {/* <FileHeader
        userId={uid}
        title={currTitle}
        currFile={fileData?.getFileBySlug}
        loading={loading}
      /> */}
      <div className="demo-container">
        {window.matchMedia("(min-width: 768px)").matches ? (
          <Editor
            language="en"
            // @ts-ignore
            ref={imgRef}
            value={value ? value : undefined}
            onChange={handleChange}
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
            // @ts-ignore
            ref={imgRef}
            value={value ? value : undefined}
            onChange={handleChange}
            addImg={addImg}
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
