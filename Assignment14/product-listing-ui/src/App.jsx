import React, { useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";

function App() {

  const productsData = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  },
  {
    id: 2,
    name: "Smartphone",
    price: 20000,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
  },
  {
    id: 3,
    name: "Shirt",
    price: 1000,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
  },
  {
    id: 4,
    name: "Shoes",
    price: 3000,
    category: "Clothing",
    image:  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
  }
];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(100000);

  const filteredProducts = productsData.filter(product => {
    return (
      (category === "All" || product.category === category) &&
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      product.price <= maxPrice
    );
  });

  return (
    <div className="container">

      <h2>🛒 E-Commerce Store</h2>

      <div className="filters">

        <input
          type="text"
          placeholder="Search product..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
        </select>

        <input
          type="range"
          min="0"
          max="100000"
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <p>Max Price: ₹{maxPrice}</p>

      </div>

      <div className="product-list">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
}

export default App;