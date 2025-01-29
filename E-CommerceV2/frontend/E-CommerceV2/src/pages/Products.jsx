import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import "../assets/global.css";

function Products() {
    return (
      <div className="products-page">
        <h1 className="products-heading">Our Products</h1>
        <ProductList />
      </div>
    );
  }
  
  export default Products;

