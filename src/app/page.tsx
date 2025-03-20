import Image from "next/image";
import Navigation from "@/components/navigation";
import { Box, Flex, Heading, Link as RadixLink, Text } from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
  return (
    <Flex p="4" gap="3" direction="column">
      <Heading>Welcome!</Heading>
      <Text>This  project was built with Next.js, React, Typescript, Radix and Motion.</Text>
      <Box p="2">
        <ul>
          <li>
            <RadixLink asChild><Link href="/users">See Users in List format</Link></RadixLink>
          </li>
          <li>
            <RadixLink asChild><Link href="/users/carousel">See Users in Carousel format</Link></RadixLink>
          </li>
        </ul>
      </Box>
    </Flex>
  );
}
