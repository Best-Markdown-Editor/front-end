import React, { useState } from "react";
import { Text, Card, Button, Box } from "sriracha-ui";
import Navbar from "../../utils/Navbar";
import FileList from "./components/FileList";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import { getUserQuery, getPubFilesQuery } from "../../graphql";
import Iframe from "react-iframe";
import PubFileList from "./components/PubFileList";
import FolderList from "./components/FolderList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  const uid = useSelector((state: any) => state.auth?.uid);
  const [activeTab, setActiveTab] = useState<number>(1);
  const { data: userData } = useQuery(getUserQuery, {
    variables: {
      id: uid,
    },
  });
  const { data: pubFileData, loading } = useQuery(getPubFilesQuery, {
    variables: {
      userId: uid,
    },
  });
  return (
    <Navbar>
      <Card stretch>
        <Text as="h2" xlf bold m="3rem 0">
          Welcome to Best Markdown Editor!
        </Text>
      </Card>
      {userData?.user?.subscriber ? null : (
        <>
          {window.matchMedia("(min-width: 728px)").matches ? (
            <Iframe
              url="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=48&l=ur1&category=audiblefreetrial&banner=04YSFJHVY8QYH4YVBXG2&f=ifr&linkID={{link_id}}&t=jimmymcbride-20&tracking_id=jimmymcbride-20"
              scrolling="no"
              title="desktop banner"
              width="728px"
              height="90px"
              frameBorder={0}
            />
          ) : (
            <Iframe
              url="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ur1&category=audiblefreetrial&banner=0YMF8P30ZEBG4A1N9J82&f=ifr&linkID={{link_id}}&t=jimmymcbride-20&tracking_id=jimmymcbride-20"
              scrolling="no"
              title="mobile banner"
              width="300px"
              height="250px"
              frameBorder={0}
            />
          )}
        </>
      )}

      {!userData?.user?.subscriber ? null : (
        <Card w="40rem" maxW="94vw" shade across>
          <Button
            row
            aiCenter
            blue
            indigo={activeTab === 1 ? "true" : ""}
            w="calc(100% / 3)"
            rounded
            m="0"
            onClick={() => setActiveTab(1)}
          >
            <FontAwesomeIcon icon="file-alt" />
            <Box w="1rem" /> Files
          </Button>
          <Button
            row
            aiCenter
            blue
            indigo={activeTab === 2 ? "true" : ""}
            w="calc(100% / 3)"
            rounded
            m="0"
            onClick={() => setActiveTab(2)}
          >
            <FontAwesomeIcon icon="upload" />
            <Box w="1rem" />
            Published
          </Button>
          <Button
            row
            aiCenter
            blue
            indigo={activeTab === 3 ? "true" : ""}
            w="calc(100% / 3)"
            rounded
            m="0"
            onClick={() => setActiveTab(3)}
          >
            <FontAwesomeIcon icon="folder" />
            <Box w="1rem" />
            Folders
          </Button>
        </Card>
      )}

      {activeTab === 1 ? (
        <FileList />
      ) : activeTab === 2 ? (
        <PubFileList
          loading={loading}
          pubFiles={pubFileData?.getPubFiles}
          userId={uid}
        />
      ) : activeTab === 3 ? (
        <FolderList pubFiles={pubFileData?.getPubFiles} />
      ) : (
        <FileList />
      )}

      {/* </Switch> */}

      {/* {!userData?.user?.subscriber ||
      pubFileData?.getPubFiles?.length === 0 ? null : (
        <PubFileList
          loading={loading}
          pubFile={pubFileData?.getPubFiles}
          userId={uid}
        />
      )} */}
    </Navbar>
  );
}
