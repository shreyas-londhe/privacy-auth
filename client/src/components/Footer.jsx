import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      borderTopWidth={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ md: "space-between" }}
        align={{ md: "center" }}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <Text>Privacy Auth Portal</Text>
        </Stack>
        <Text>About the Privacy Auth Portal</Text>
      </Container>
    </Box>
  );
}
