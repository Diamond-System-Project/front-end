import { useState, useEffect } from "react";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import ProductAPI from "../api/ProductAPI";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductAPI.products();
        const data = response.data.data;
        setProducts(data);

        // Extract unique product types
        const types = [...new Set(data.map((product) => product.mountId.type))];
        setProductTypes(types);
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedFilteredProducts = products;
    if (selectedTypes.length > 0) {
      updatedFilteredProducts = products.filter((product) =>
        selectedTypes.includes(product.mountId.type)
      );
    }
    setFilteredProducts(updatedFilteredProducts);
    setCurrentPage(1);
  }, [selectedTypes, products]);

  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
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
        <div className="border p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Filter by Type</h3>
          {productTypes.map((type) => (
            <div key={type}>
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
              />
              <label className="ml-2">{type}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <Link
              to={`/product-detail/${product.productId}`}
              key={product.productId}
            >
              <div className="border p-4 rounded-lg shadow-lg cursor-pointer">
                <img
                  src={product.url}
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
