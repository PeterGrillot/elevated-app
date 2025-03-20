import { Box, Flex, Spinner } from "@radix-ui/themes";

const Loading = () => {
  return (
    <Flex width="100vw" height="100vh" align="center" justify="center">
      <Spinner size="3" />
    </Flex>
  );
}

export default Loading;