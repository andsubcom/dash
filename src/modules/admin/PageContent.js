import React from "react";
import { Box, Stack, Heading, Button } from "@chakra-ui/react";

export default function PageContent({
  title = "",
  primaryAction = null,
  secondaryActions = null,
  children
}) {
  const actions = [
    primaryAction ? (
      <Button
        key="0"
        onClick={primaryAction.onClick}
        colorScheme="main"
        size="sm"
      >
        {primaryAction.content}
      </Button>
    ) : (
      ""
    ),
    secondaryActions
      ? secondaryActions.map((action, i) => (
          <Button
            key={i}
            onClick={action.onClick}
            colorScheme="main"
            variant="outline"
            size="sm"
          >
            {action.content}
          </Button>
        ))
      : ""
  ];

  const header =
    title || actions ? (
      <Stack direction="row" alignItems="top" marginBottom="1.5rem">
        <Heading size="md">{title}</Heading>
        <Stack direction={["column", "row"]} style={{ marginLeft: "auto" }}>
          {actions}
        </Stack>
      </Stack>
    ) : (
      ""
    );
  return (
    <Box>
      {header}
      {children}
    </Box>
  );
}
