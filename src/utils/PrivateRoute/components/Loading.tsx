import React from "react";
import Markdown from "../../../assets/markdown.png";
import { Wrapper, AppWrapper, Box } from "sriracha-ui";

export default function Loading() {
  return (
    <AppWrapper bg="#e6e6e6">
      <Wrapper jcCenter aiCenter>
        <Box w="40vw">
          <img src={Markdown} alt="loading" />
        </Box>
      </Wrapper>
    </AppWrapper>
  );
}
