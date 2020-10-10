import React from "react";
import Markdown from "../../../assets/markdown.png";
import { Wrapper, AppWrapper, Img } from "sriracha-ui";

export default function Loading() {
  return (
    <AppWrapper bg="#e6e6e6">
      <Wrapper jcc>
        <Img maxW="100%" src={Markdown} alt="loading" />
      </Wrapper>
    </AppWrapper>
  );
}
