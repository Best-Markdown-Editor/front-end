import React from "react";
import { Text, Card } from "sriracha-ui";
import Navbar from "../../utils/Navbar";
import FileList from "./components/FileList";

export default function Home() {
  return (
    <>
      <Navbar>
        <Card stretch>
          <Text as="h2" xlf bold m="3rem 0">
            Welcome to Best Markdown Editor!
          </Text>
        </Card>
        <FileList />
      </Navbar>
    </>
  );
}
