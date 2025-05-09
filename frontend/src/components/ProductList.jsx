import React, { useState, useCallback } from "react";
import axios from "axios";
import {
  Box,
  Input,
  Stack,
  Text,
  IconButton,
  Grid,
  GridItem,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import config from "../config";

//  Accept products and setProducts as props
const ProductList = ({ products, setProducts, handleDeleteProduct }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleEdit = useCallback((product) => {
    setEditingId(product._id);
    setEditedProduct({
      name: product.name,
      price: product.price,
      image: product.image || "",
    });
  }, []);

  const handleSave = useCallback(() => {
    axios
      .put(`${config.API_BASE}/${editingId}`, editedProduct)
      .then((res) => {
        const updated = res.data.data;
        const updatedList = products.map((p) =>
          p._id === editingId ? updated : p
        );
        setProducts(updatedList);
        setEditingId(null);
      })
      .catch((err) => console.error("Update error:", err));
  }, [editedProduct, editingId, products, setProducts]);

  const handleCancel = useCallback(() => {
    setEditingId(null);
    setEditedProduct({ name: "", price: "", image: "" });
  }, []);

  return (
    <Box as="main" mt={10} bg="blue.50" px={4} py={6}>
      <Heading as="h2" fontSize="2xl" mb={4} textAlign="center">
        Product List
      </Heading>
      <Grid
        bg={useColorModeValue("white", "gray.800")}
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {products.map((product) => (
          <GridItem key={product._id}>
            <Box borderWidth="1px" borderRadius="lg" p={4} textAlign="center">
              {editingId === product._id ? (
                <>
                  <Input
                    value={editedProduct.name}
                    onChange={(e) =>
                      setEditedProduct((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Product name"
                    mb={2}
                  />
                  <Input
                    value={editedProduct.price}
                    type="number"
                    onChange={(e) =>
                      setEditedProduct((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    placeholder="Price"
                    mb={2}
                  />
                  <Input
                    value={editedProduct.image}
                    onChange={(e) =>
                      setEditedProduct((prev) => ({
                        ...prev,
                        image: e.target.value,
                      }))
                    }
                    placeholder="Image URL"
                    mb={2}
                  />
                </>
              ) : (
                <>
                  <Text fontWeight="bold" mb={1}>
                    Name: {product.name}
                  </Text>
                  <Text mb={2}>Price: ${product.price}</Text>
                  {product.image && (
                    <Box
                      mt={2}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      bg="gray.100"
                      borderRadius="md"
                      p={2}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </Box>
                  )}
                </>
              )}

              <Stack direction="row" mt={4} justify="center">
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDeleteProduct(product._id)}
                  aria-label={`Delete ${product.name}`}
                />
                {editingId === product._id ? (
                  <>
                    <IconButton
                      icon={<CheckIcon />}
                      colorScheme="green"
                      onClick={handleSave}
                      aria-label="Save changes"
                    />
                    <IconButton
                      icon={<CloseIcon />}
                      colorScheme="gray"
                      onClick={handleCancel}
                      aria-label="Cancel editing"
                    />
                  </>
                ) : (
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    onClick={() => handleEdit(product)}
                    aria-label={`Edit ${product.name}`}
                  />
                )}
              </Stack>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default React.memo(ProductList);
