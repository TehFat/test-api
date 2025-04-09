import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom"; // Remove BrowserRouter import
import { Button, Box, Input, Stack, Text } from "@chakra-ui/react";

const API_BASE = "http://localhost:5000/api/products"

const App = () => {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(-1);
  const [newProductImage, setNewProductImage] = useState("");

  // Fetch products from the backend API
  useEffect(() => {
    axios.get(API_BASE)
      .then(response => {
        if (response.data.data && response.data.data.length > 0) { // response.data is axios default property, the response object from the serverside is {status:"",data:[]} so we need to access it using response.data.data
          setProducts(response.data.data);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  // Add product
  const handleAddProduct = () => {
    if (!newProductName || !newProductPrice || newProductPrice === -1 || !newProductImage) return;

    axios.post(API_BASE, { name: newProductName, price: newProductPrice, image: newProductImage })
      .then(response => {
        setProducts(prevProducts => [...prevProducts, response.data.data]);
        setNewProductName("");
        setNewProductPrice(-1);
        setNewProductImage("");
      })
      .catch(error => {
        console.error("There was an error adding the product!", error);
      });
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    axios.delete(`${API_BASE}/${id}`)
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
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={4} mt={4}>
        <Input
          placeholder="Enter product price"
          value={newProductPrice === -1 ? "" : newProductPrice}
          type="number"
          onChange={(e) => setNewProductPrice(e.target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={4} mt={4}>
        <Input
          placeholder="Enter product image"
          value={newProductImage}
          onChange={(e) => setNewProductImage(e.target.value)}
        />
      </Stack>
      <Button onClick={handleAddProduct}>Add Product</Button>
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
