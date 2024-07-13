import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Pagination, Radio } from "antd";
import { Link } from "react-router-dom";
import ProductAPI from "../api/ProductAPI";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [productTypes, setProductTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const scrollPositionRef = useRef(0);

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductAPI.products();
        const data = response.data.data;
        setProducts(data);
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
    if (selectedType) {
      updatedFilteredProducts = products.filter((product) =>
        product.mountId.type === selectedType
      );
    }
    setFilteredProducts(updatedFilteredProducts);
    setCurrentPage(1);
  }, [selectedType, products]);

  useLayoutEffect(() => {
    window.scrollTo(0, scrollPositionRef.current);
  });

  const handleTypeChange = (e) => {
    scrollPositionRef.current = window.pageYOffset;
    setSelectedType(e.target.value);
  };

  const handlePageChange = (page) => {
    scrollPositionRef.current = window.pageYOffset;
    setCurrentPage(page);
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container mx-auto px-4 bg-pink-50">
      <div className="mb-8 p-6 bg-blue-100 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-blue-800">Filter by Type</h3>
        <Radio.Group 
          onChange={handleTypeChange} 
          value={selectedType}
          className="space-x-4"
        >
          <Radio value='' className="text-lg">All</Radio>
          {productTypes.map((type) => (
            <Radio key={type} value={type} className="text-lg">
              {type}
            </Radio>
          ))}
        </Radio.Group>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <Link
            to={`/product-detail/${product.productId}`}
            key={product.productId}
            className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="aspect-w-3 aspect-h-4">
              <img
                src={product.url || "default-image-url.jpg"}
                alt={product.productName}
                className="object-cover w-full h-96"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1 truncate">
                {product.productName}
              </h3>
              <p className="text-sm text-gray-600 mb-2 truncate">
                {product.mountId.mountName}
              </p>
              <p className="text-lg font-bold text-blue-600">
                {formatCurrency(Number(product.price))}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex justify-center pb-8">
        <Pagination
          current={currentPage}
          total={filteredProducts.length}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ListProduct;