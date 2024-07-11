import { useState, useEffect } from "react";
import { Pagination, Checkbox } from "antd";
import { Link } from "react-router-dom";
import ProductAPI from "../api/ProductAPI";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
  };

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
    <div className="container mx-auto px-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Filter by Type</h3>
        <div className="flex flex-wrap gap-2">
          {productTypes.map((type) => (
            <Checkbox
              key={type}
              onChange={() => handleTypeChange(type)}
              checked={selectedTypes.includes(type)}
            >
              {type}
            </Checkbox>
          ))}
        </div>
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
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1 truncate">{product.productName}</h3>
              <p className="text-sm text-gray-600 mb-2 truncate">{product.mountId.mountName}</p>
              <p className="text-lg font-bold text-blue-600">{formatCurrency(Number(product.price))}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
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
