
import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

const ProductList = ({ products, handleDeleteProduct, setProducts }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleEdit = (product) => {
    setEditingId(product._id);
    setEditedProduct({
      name: product.name,
      price: product.price,
      image: product.image || "",
    });
  };

  const handleSave = (id) => {
    axios
      .put(`http://localhost:5000/api/products/${id}`, editedProduct)
      .then((res) => {
        const updatedProduct = res.data.data;
        const updatedProducts = products.map((p) =>
          p._id === id ? updatedProduct : p
        );
        setProducts(updatedProducts);
        setEditingId(null);
      })
      .catch((err) => {
        console.error("Update error:", err);
      });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedProduct({ name: "", price: "", image: "" });
  };

  return (
    <Box mt={30} bg="blue.50">
      <Text fontSize="30" fontWeight="bold" mb={4} textAlign="center">
        Product List
      </Text>
      <Grid
        bg={useColorModeValue("white", "gray.800")}
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={6}
        justifyContent="center"
      >
        {products.map((product) => (
          <GridItem key={product._id}>
            <Box borderWidth="1px" borderRadius="lg" p={4} textAlign="center">
              {editingId === product._id ? (
                <>
                  <Input
                    value={editedProduct.name}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        name: e.target.value,
                      })
                    }
                    mb={2}
                  />
                  <Input
                    value={editedProduct.price}
                    type="number"
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        price: e.target.value,
                      })
                    }
                    mb={2}
                  />
                  <Input
                    value={editedProduct.image}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        image: e.target.value,
                      })
                    }
                    placeholder="Enter new image URL"
                    mb={2}
                  />
                </>
              ) : (
                <>
                  <Text fontWeight="bold">Name: {product.name}</Text>
                  <Text>Price: ${product.price}</Text>
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

              <Stack direction="row" mt={2} justify="center">
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDeleteProduct(product._id)}
                  aria-label="Delete"
                />
                {editingId === product._id ? (
                  <>
                    <IconButton
                      icon={<CheckIcon />}
                      colorScheme="green"
                      onClick={() => handleSave(product._id)}
                      aria-label="Save"
                    />
                    <IconButton
                      icon={<CloseIcon />}
                      colorScheme="gray"
                      onClick={handleCancel}
                      aria-label="Cancel"
                    />
                  </>
                ) : (
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    onClick={() => handleEdit(product)}
                    aria-label="Edit"
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

export default ProductList;
