
import React, { useRef, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  FormLabel,
  useColorModeValue,
  Flex,
  useToast, 
} from "@chakra-ui/react";

const ProductForm = ({
  newProductName,
  setNewProductName,
  newProductPrice,
  setNewProductPrice,
  newProductImage,
  setNewProductImage,
  handleAddProduct,
  onResetForm,
}) => {
  const formRef = useRef(null);
  const toast = useToast(); 

  useEffect(() => {
    if (!newProductImage && formRef.current) {
      formRef.current.reset();
    }
  }, [newProductImage]);

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (
        !newProductName.trim() ||
        isNaN(newProductPrice) ||
        newProductPrice <= 0 ||
        !newProductImage
    ) {
      toast({
        title: "Missing fields",
        description: "Please fill in all the fields before submitting.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    
    handleAddProduct();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <Stack
        bg={useColorModeValue("white", "gray.800")}
        spacing={6}
        mt={2}
        align="center"
        px={4}
        py={6}
        borderRadius="xl"
        boxShadow="lg"
        w={{ base: "100%", md: "80%", lg: "60%" }}
        mx="auto"
        role="form"
      >
        {/* Product Name */}
        <Box w="100%">
          <FormLabel htmlFor="productName">Product Name</FormLabel>
          <Input
            id="productName"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            placeholder="Enter product name"
            borderBottom="2px solid"
            borderColor="blue.600"
            paddingBottom="10px"
            focusBorderColor="blue.700"
            _placeholder={{ color: "gray.600", paddingBottom: "4px" }}
            required
            aria-required="true"
            aria-describedby="productNameDesc"
          />
        </Box>

        {/* Product Price */}
        <Box w="100%">
          <FormLabel htmlFor="productPrice">Product Price</FormLabel>
          <Input
            id="productPrice"
            type="number"
            value={newProductPrice === -1 ? "" : newProductPrice}
            onChange={(e) => setNewProductPrice(Number(e.target.value))}
            placeholder="Enter product price"
            borderBottom="2px solid"
            borderColor="blue.600"
            paddingBottom="8px"
            focusBorderColor="blue.700"
            _placeholder={{ color: "gray.600", paddingBottom: "4px" }}
            required
            aria-required="true"
            min="0"
          />
        </Box>

        {/* Product Image */}
        <Box w="100%">
          <FormLabel htmlFor="productImage">Product Image</FormLabel>
          <Input
            type="file"
            accept="image/*"
            id="productImage"
            onChange={(e) => setNewProductImage(e.target.files[0])}
            borderBottom="2px solid"
            borderColor="blue.600"
            paddingBottom="8px"
            focusBorderColor="blue.700"
            required
            aria-required="true"
          />
        </Box>

        {/* Action Buttons */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="center"
          align="center"
          gap={4}
          w="100%"
        >
          <Button
            colorScheme="blue"
            color="black"
            type="submit"
            size={{ base: "sm", md: "md", lg: "lg" }}
            w={{ base: "100%", md: "auto" }}
            aria-label="Add product"
          >
            Add Product
          </Button>
          <Button
            colorScheme="red"
            color="black"
            onClick={onResetForm}
            size={{ base: "sm", md: "md", lg: "lg" }}
            type="button"
            w={{ base: "100%", md: "auto" }}
            aria-label="Clear form"
          >
            Clear
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};

export default React.memo(ProductForm);
