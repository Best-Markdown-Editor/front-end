import React from "react";
import { Flex, Box, Text, ToolTip, Button, theme } from "sriracha-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveAs } from "file-saver";

interface FileHeaderProps {
  title: string;
  currFile: any;
}

export default function FileHeader({ title, currFile }: FileHeaderProps) {
  async function exportMarkdownFile(file: any) {
    const blob = new Blob([file.body], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, `${file.slug}.md`);
  }

  return (
    <Flex stretch h="4rem" aiCenter jcBetween>
      <Flex aiCenter>
        <Box w="2rem" />
        <Text as="h2" bold lf>
          {title}
        </Text>
        <Box w="2rem" />
      </Flex>
      <Flex>
        <ToolTip ttRight="3rem" ttTop="8.6rem">
          <Button
            blue
            p="0.5rem 1rem"
            onClick={() => exportMarkdownFile(currFile)}
          >
            <FontAwesomeIcon icon="file-download" />
          </Button>
          <div className="tooltip">
            <Text
              color={theme.colors.gray9}
              bg={`radial-gradient(${theme.colors.gray0}, ${theme.colors.whiteAlpha5})`}
              p="0.2rem"
            >
              Export as markdown file
            </Text>
          </div>
        </ToolTip>
        <Box w="0.5rem" />
      </Flex>
    </Flex>
  );
}
