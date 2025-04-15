
import React, { useState, useEffect } from "react";
import axios from "axios";
import { keyframes } from "@emotion/react";
import { Helmet } from "react-helmet";
import Header from "./components/Header"
import { Box, Heading, Text } from "@chakra-ui/react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { readFileAsDataUrl } from "./Helper/file-hepler.js";

<Helmet>
  <title>Product Management</title>
  <meta name="description" content="Manage your product listings with image upload and pricing." />
</Helmet>
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

  const handleAddProduct = async () => {
    if (!newProductName || !newProductPrice || newProductPrice === -1 || !newProductImage) return;
    const fileData = await readFileAsDataUrl(newProductImage)
    axios
      .post(API_BASE, {
        name: newProductName,
        price: newProductPrice,
        image: fileData,
      })
      .then((res) => {
        setProducts((prev) => [...prev, res.data.data]);
        setNewProductName("");
        setNewProductPrice(-1);
        setNewProductImage("");
      })
      .catch((err) => console.error("Add error:", err));
  };
  const resetForm = () => {
    setNewProductName("");
    setNewProductPrice(-1);
    setNewProductImage("");

  }

  const handleDeleteProduct = (id) => {
    axios
      .delete(`${API_BASE}/${id}`)
      .then(() => setProducts((prev) => prev.filter((p) => p._id !== id)))
      .catch((err) => console.error("Delete error:", err));
  };

  return (<>
    <Header />
    <Box as="main" role="main" py={12} borderRadius="lg" p={4} bgGradient="linear(to-r, teal.100, blue.100, pink.100)"
      backgroundSize="400% 400%" animation={`${gradient} 15s ease infinite`} mt={5}>

      <Heading py={5} fontSize="25" fontWeight="bold" textAlign="center">
        Create Products List
      </Heading>

      <ProductForm
        newProductName={newProductName}
        setNewProductName={setNewProductName}
        newProductPrice={newProductPrice}
        setNewProductPrice={setNewProductPrice}
        newProductImage={newProductImage}
        setNewProductImage={setNewProductImage}
        handleAddProduct={handleAddProduct}
        onResetForm={resetForm}
      />

      <ProductList products={products} handleDeleteProduct={handleDeleteProduct} setProducts={setProducts} />
    </Box>
  </>
  );
};

export default App;

