// components/Header.js
import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box as="header" bg="blue.500" p={4} color="white" textAlign="center">
      <Heading fontSize="2xl" fontWeight="bold">
        Product Management
      </Heading>
    </Box>
  );
};

export default Header;
