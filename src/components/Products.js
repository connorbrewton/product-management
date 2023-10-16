import React, { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Send a GET request to fetch products from the API
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Products</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by product name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {filteredProducts.map((product, index) => (
        <div key={index}>
          <h2>Name: {product.name}</h2>
          <p>UPC: {product.upc}</p>
          <p>Available On: {product.availableon}</p>
          <p>
            Properties:{' '}
            {product.properties.map((property, propertyIndex) => (
              <span key={propertyIndex}>
                {property.propertyName}: {property.propertyValue}
                {propertyIndex < product.properties.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Products;
