import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom"; // Remove BrowserRouter import
import { Button, Box, Input, Stack, Text } from "@chakra-ui/react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");

  // Fetch products from the backend API
  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  // Add product
  const handleAddProduct = () => {
    if (!newProduct) return;

    axios.post("http://localhost:5000/products", { name: newProduct })
      .then(response => {
        setProducts( prevProducts =>[...prevProducts, response.data]);
        setNewProduct("");
      })
      .catch(error => {
        console.error("There was an error adding the product!", error);
      });
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    axios.delete(`http://localhost:5000/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product._id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the product!", error);
      });
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold">Product Management</Text>

      <Stack direction="row" spacing={4} mt={4}>
        <Input
          placeholder="Enter product name"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <Button onClick={handleAddProduct}>Add Product</Button>
      </Stack>

      <Routes>
        <Route
          path="/"
          element={
            <Box mt={6}>
              <Text fontSize="xl" mb={4}>Product List:</Text>
              <Stack spacing={4}>
                {products.map((product) => (
                  <Box key={product._id} borderWidth="1px" borderRadius="lg" p={4}>
                    <Text>{product.name}</Text>
                    <Button colorScheme="red" onClick={() => handleDeleteProduct(product._id)}>
                      Delete
                    </Button>
                  </Box>
                ))}
              </Stack>
            </Box>
          }
        />
      </Routes>
    </Box>
  );
};

export default App;
