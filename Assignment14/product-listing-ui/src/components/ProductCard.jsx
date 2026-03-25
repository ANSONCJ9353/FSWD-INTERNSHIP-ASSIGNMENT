import React from "react";

function ProductCard({ product }) {
  return (
    <div className="card">

      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>

      <p className="price">₹{product.price}</p>

      <p>{product.category}</p>

      <button>Add to Cart</button>

    </div>
  );
}

export default ProductCard;