import React from "react";
import { Card, Text } from "sriracha-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  return (
    <Card sqr="40rem" jcCenter aiCenter>
      <Text>
        <FontAwesomeIcon icon="spinner" spin />
      </Text>
    </Card>
  );
}
