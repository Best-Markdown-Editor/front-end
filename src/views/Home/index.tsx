import React from "react";
import { Text, Card } from "sriracha-ui";
import Navbar from "../../utils/Navbar";
import FileList from "./components/FileList";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import { getUserQuery } from "../../graphql";

export default function Home() {
  const uid = useSelector((state: any) => state.auth?.uid);
  const { data: userData } = useQuery(getUserQuery, {
    variables: {
      id: uid,
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
            <iframe
              src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=48&l=ur1&category=audiblefreetrial&banner=04YSFJHVY8QYH4YVBXG2&f=ifr&linkID={{link_id}}&t=jimmymcbride-20&tracking_id=jimmymcbride-20"
              scrolling="no"
              title="desktop banner"
              style={{
                border: "none",
                width: "728px",
                height: "90px",
              }}
            />
          ) : (
            <iframe
              src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ur1&category=audiblefreetrial&banner=0YMF8P30ZEBG4A1N9J82&f=ifr&linkID={{link_id}}&t=jimmymcbride-20&tracking_id=jimmymcbride-20"
              scrolling="no"
              title="mobile banner"
              style={{
                border: "none",
                width: "300px",
                height: "250px",
              }}
            />
          )}
        </>
      )}
      <FileList />
    </Navbar>
  );
}
