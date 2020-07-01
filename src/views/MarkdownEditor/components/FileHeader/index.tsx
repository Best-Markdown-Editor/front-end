import React, { useState } from "react";
import { Flex, Box, Text, ToolTip, Button, theme } from "sriracha-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "./Title";
import { saveAs } from "file-saver";

interface FileHeaderProps {
  title: string;
  currFile: any;
  loading: boolean;
}

export default function FileHeader({
  title,
  currFile,
  loading,
}: FileHeaderProps) {
  const [edit, setEdit] = useState(false);

  async function exportMarkdownFile(file: any) {
    const blob = new Blob([file.body], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, `${file.slug}.md`);
  }

  function toggleEdit() {
    setEdit(!edit);
  }

  return (
    <Flex stretch h="4rem" aiCenter jcBetween>
      <Flex aiCenter>
        <Box w="2rem" />
        <Title edit={edit} title={title} file={currFile} toggle={toggleEdit} />

        <Box w="2rem" />
        <Text bold color={theme.colors.red5}>
          {loading ? (
            <Flex aiCenter>
              <FontAwesomeIcon icon="spinner" spin />
              <Box w="1rem" />
              Loading file upload...
            </Flex>
          ) : null}
        </Text>
      </Flex>
      <Flex>
        <ToolTip ttRight="4.6rem" ttTop="5.6rem">
          <Button
            blue
            p="0.5rem 1rem"
            onClick={() => exportMarkdownFile(currFile)}
          >
            <FontAwesomeIcon icon="file-download" />
            {/* <Box sqr="1.2rem" bg={theme.colors.lightBlue1} window /> */}
          </Button>
          <div className="tooltip">
            <Text color={theme.colors.gray9}>Export as markdown file.</Text>
          </div>
        </ToolTip>
        <Box w="0.5rem" />
      </Flex>
    </Flex>
  );
}
