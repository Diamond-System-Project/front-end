// ListProduct.js
import React, { useState, useEffect } from "react";
import { Checkbox, Collapse, Pagination } from "antd";
import { Link } from "react-router-dom";
import ProductAPI from "../api/ProductAPI"; // Adjust the import path as per your project structure

const { Panel } = Collapse;

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductAPI.products();
        setProducts(data.data.data); // Assuming data is an array of products from the API
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
        // Handle error state or display a message to the user
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedFilteredProducts = products;
    if (selectedCategories.length > 0) {
      updatedFilteredProducts = products.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }
    setFilteredProducts(updatedFilteredProducts);
    setCurrentPage(1);
  }, [selectedCategories, products]);

  const handleCategoryChange = (category, subCategories) => {
    const allCategories = [category, ...subCategories];
    if (selectedCategories.some((c) => allCategories.includes(c))) {
      setSelectedCategories(
        selectedCategories.filter((c) => !allCategories.includes(c))
      );
    } else {
      setSelectedCategories([...selectedCategories, ...allCategories]);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <h2 className="text-lg font-semibold mb-4">Filter by Mount</h2>
        <Collapse>
          {/* Category filter UI */}
          { /* ... */}
        </Collapse>
      </div>
      <div className="w-3/4 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Display products */}
          {paginatedProducts.map((product) => (
            <Link to={`/product-detail/${product.id}`} key={product.id}>
              <div className="border p-4 rounded-lg shadow-lg cursor-pointer">
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="w-full h-64 object-cover mb-4 rounded"
                />
                <h3 className="text-lg font-semibold">{product.productName}</h3>
                <p className="text-gray-600">{product.mountId.mountName}</p>
                <p className="text-gray-800 font-bold">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          {/* Pagination */}
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredProducts.length}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
