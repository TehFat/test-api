
import React, { createRef, useEffect } from "react";
import { Box, Button, Input, Stack, FormLabel, useColorModeValue } from "@chakra-ui/react";

const ProductForm = ({
  newProductName,
  setNewProductName,
  newProductPrice,
  setNewProductPrice,
  newProductImage,
  setNewProductImage,
  handleAddProduct,
  onResetForm
}) => {
  const formRef = createRef(null);

  useEffect(() => {
    if (!newProductImage || newProductImage === "") {
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }, [newProductImage,formRef.current])
  return (
    <form ref={formRef} onSubmit={()=>{}}>
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
    >
      {/* Product Name Field */}
      <div className="w-full">
        <FormLabel fontSize="20" fontWeight="bold" htmlFor="productName">
          Product Name
        </FormLabel>
        <Input
          id="productName"
          placeholder="Enter product name"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          borderBottom="2px solid"
          borderColor="blue.300"
          paddingBottom="10px"
          focusBorderColor="blue.500"
          _placeholder={{
            color: "blue.400",
            paddingBottom: "4px",
          }}
        />
      </div>

      {/* Product Price Field */}
      <div>
        <FormLabel fontSize="20" fontWeight="bold" htmlFor="productPrice">
          Product Price
        </FormLabel>
        <Input
          id="productPrice"
          placeholder="Enter product price"
          type="number"
          value={newProductPrice === -1 ? "" : newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
          borderBottom="2px solid"
          borderColor="blue.300"
          paddingBottom="8px"
          focusBorderColor="blue.500"
          _placeholder={{
            color: "blue.400",
            paddingBottom: "4px",
          }}
        />
      </div>

      {/* Product Image Field */}
      <div>
        <FormLabel fontSize="20" fontWeight="bold" htmlFor="productImage">
          Product Image URL
        </FormLabel>

        <Input
          type="file"
          accept="image/*"
          id="productImage"
          placeholder="Enter image URL"
          onChange={(e) => setNewProductImage(e.target.files[0])}
          borderBottom="2px solid"
          borderColor="blue.300"
          paddingBottom="8px"
          focusBorderColor="blue.500"
          _placeholder={{
            color: "blue.400",
            paddingBottom: "4px",
          }}
        />
      </div>
      <Box >
        {/* Add Button */}
        <Button margin={8} colorScheme="blue" onClick={handleAddProduct} size="lg">
          Add Product
        </Button>
        <Button margin={8} colorScheme="red" onClick={onResetForm} size="lg">
          Clear
        </Button>
      </Box>
    </Stack>
    </form>
  );
};

export default ProductForm;

