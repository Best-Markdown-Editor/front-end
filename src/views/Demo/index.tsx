import React, { useState } from "react";
import Editor from "for-editor";
import Navbar from "../../utils/Navbar";

export default function Demo() {
  const initValue = localStorage.getItem("demo")
    ? localStorage.getItem("demo")
    : "";
  const [value, setValue] = useState(initValue);
  async function handleChange(value: string) {
    setValue(value);
    localStorage.setItem("demo", value);
  }
  return (
    <Navbar>
      <div className="demo-container">
        {window.matchMedia("(min-width: 768px)").matches ? (
          <Editor
            language="en"
            value={value ? value : undefined}
            onChange={handleChange}
            height="calc(100vh - 5rem)"
            toolbar={{
              undo: true,
              redo: true,
              h1: true,
              h2: true,
              h3: true,
              h4: true,
              // img: true,
              link: true,
              code: true,
              // save: true,
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
            onChange={handleChange}
            height="calc(100vh - 5rem)"
            toolbar={{
              undo: true,
              redo: true,
              h1: true,
              h2: true,
              h3: true,
              h4: true,
              // img: true,
              link: true,
              code: true,
              // save: true,
              preview: true,
              expand: true,
              subfield: true,
            }}
            subfield={true}
            expand={false}
            preview={false}
          />
        )}
      </div>
    </Navbar>
  );
}
