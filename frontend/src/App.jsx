
import React, { useState, useEffect } from "react";
import axios from "axios";
import { keyframes } from "@emotion/react";

import { Box, Text } from "@chakra-ui/react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const API_BASE = "http://localhost:5000/api/products";

const App = () => {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(-1);
  const [newProductImage, setNewProductImage] = useState("");

  useEffect(() => {
    axios
      .get(API_BASE)
      .then((res) => setProducts(res.data.data || []))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleAddProduct = () => {
    if (!newProductName || !newProductPrice || newProductPrice === -1 || !newProductImage) return;

    axios
      .post(API_BASE, {
        name: newProductName,
        price: newProductPrice,
        image: newProductImage,
      })
      .then((res) => {
        setProducts((prev) => [...prev, res.data.data]);
        setNewProductName("");
        setNewProductPrice(-1);
        setNewProductImage("");
      })
      .catch((err) => console.error("Add error:", err));
  };

  const handleDeleteProduct = (id) => {
    axios
      .delete(`${API_BASE}/${id}`)
      .then(() => setProducts((prev) => prev.filter((p) => p._id !== id)))
      .catch((err) => console.error("Delete error:", err));
  };

  return (
    <Box  py={12} borderRadius="lg" p={4}  bgGradient="linear(to-r, teal.100, blue.100, pink.100)"
    backgroundSize="400% 400%"
    animation={`${gradient} 15s ease infinite`} mt={5}>
      <Text fontSize="30" fontWeight="bold" textAlign="center">
        Product Management
      </Text>
      <Text  py={5} fontSize="25" fontWeight="bold" textAlign="center">
      Create Products List
      </Text>

      <ProductForm
        newProductName={newProductName}
        setNewProductName={setNewProductName}
        newProductPrice={newProductPrice}
        setNewProductPrice={setNewProductPrice}
        newProductImage={newProductImage}
        setNewProductImage={setNewProductImage}
        handleAddProduct={handleAddProduct}
       
      />

      <ProductList products={products} handleDeleteProduct={handleDeleteProduct} setProducts={setProducts} />
    </Box>
  );
};

export default App;

