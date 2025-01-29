import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/global.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // Handle errors

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(response => {
        console.log("Products fetched:", response.data); // Debugging
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
      });
  }, []);

  return (
    <div className="products">
      {error && <p className="error">{error}</p>}
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.title} />
            <p className="title">{product.title}</p>
            <p className="description">{product.description}</p>
            <p className="price">${product.price}</p>
            <button className="cart">Add to Cart</button>
          </div>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
}

export default ProductList;
