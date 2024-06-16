import React, { useState, useEffect } from "react";
import { Checkbox, Collapse, Pagination } from "antd";
import { Link } from "react-router-dom";

const { Panel } = Collapse;

const product = [
  {
    id: 1,
    name: "Product 1",
    category: "Nhẫn nam",
    price: "$100",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Product 2",
    category: "Nhẫn nữ",
    price: "$200",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Product 3",
    category: "Hoa tay",
    price: "$150",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 4,
    name: "Product 4",
    category: "Mặt dây",
    price: "$250",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 5,
    name: "Product 5",
    category: "Vòng Tay",
    price: "$250",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 6,
    name: "Product 6",
    category: "Vòng Tay",
    price: "$250",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 7,
    name: "Product 7",
    category: "Nhẫn đính hôn",
    price: "$250",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 8,
    name: "Product 8",
    category: "Trang sức kim cương",
    price: "$250",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 9,
    name: "Product 9",
    category: "Lắc Tay",
    price: "$250",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 10,
    name: "Product 10",
    category: "Nhẫn cưới",
    price: "$250",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 11,
    name: "Product 11",
    category: "Nhẫn cưới",
    price: "$250",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 12,
    name: "Product 12",
    category: "Nhẫn cưới",
    price: "$250",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 13,
    name: "Product 13",
    category: "Nhẫn cưới",
    price: "$250",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 14,
    name: "Product 14",
    category: "Nhẫn cưới",
    price: "$250",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 15,
    name: "Product 15",
    category: "Nhẫn cưới",
    price: "$250",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 16,
    name: "Product 16",
    category: "Nhẫn cưới",
    price: "$250",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 17,
    name: "Product 17",
    category: "Nhẫn cưới",
    price: "$250",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 18,
    name: "Product 18",
    category: "Nhẫn cưới",
    price: "$250",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 19,
    name: "Product 19",
    category: "Nhẫn cưới",
    price: "$250",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 20,
    name: "Product 20",
    category: "Nhẫn cưới",
    price: "$250",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 21,
    name: "Product 21",
    category: "Nhẫn cưới",
    price: "$250",
    image: "https://via.placeholder.com/100",
  },
];

const categories = [
  { name: "Trang sức kim cương", subCategories: [] },
  { name: "Nhẫn", subCategories: ["Nhẫn nam", "Nhẫn nữ"] },
  { name: "Hoa tay", subCategories: [] },
  { name: "Mặt dây", subCategories: [] },
  { name: "Lắc tay", subCategories: [] },
  { name: "Vòng tay", subCategories: [] },
  { name: "Trang sức cưới", subCategories: ["Nhẫn cưới", "Nhẫn đính hôn"] },
];

export default function ListProduct() {
  const [products, setProducts] = useState(product);
  const [filteredProducts, setFilteredProducts] = useState(product);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

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
        <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
        <Collapse>
          {categories.map((category) => (
            <Panel header={category.name} key={category.name}>
              <Checkbox
                checked={selectedCategories.includes(category.name)}
                onChange={() =>
                  handleCategoryChange(category.name, category.subCategories)
                }
              >
                {category.name}
              </Checkbox>
              {category.subCategories.length > 0 &&
                category.subCategories.map((subCategory) => (
                  <div key={subCategory} className="pl-4">
                    <Checkbox
                      checked={selectedCategories.includes(subCategory)}
                      onChange={() => handleCategoryChange(subCategory, [])}
                    >
                      {subCategory}
                    </Checkbox>
                  </div>
                ))}
            </Panel>
          ))}
        </Collapse>
      </div>
      <div className="w-3/4 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <Link to={`/product-detail/${product.id}`} key={product.id}>
              <div className="border p-4 rounded-lg shadow-lg cursor-pointer">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover mb-4 rounded"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.category}</p>
                <p className="text-gray-800 font-bold">{product.price}</p>
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
}
