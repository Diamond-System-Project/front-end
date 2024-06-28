import React, { useEffect, useState } from "react";
import { Table, Button, Modal, message } from "antd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import ProductAPI from "../api/ProductAPI";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [isAddProductModalVisible, setIsAddProductModalVisible] =
    useState(false);
  const [isUpdateProductModalVisible, setIsUpdateProductModalVisible] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await ProductAPI.products();
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const handleAddProduct = async (product) => {
    try {
      const response = await ProductAPI.addProduct(product);
      if (response.data.success) {
        message.success("Product added successfully");
        setProducts([...products, response.data.data]);
        setIsAddProductModalVisible(false);
      } else {
        message.error(response.data.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Failed to add product");
    }
  };

  const handleUpdateProduct = (updatedProduct) => {
    setSelectedProduct(updatedProduct);
    setIsUpdateProductModalVisible(true);
  };

  const handleUpdateExistingProduct = async (updatedProduct) => {
    try {
      const response = await ProductAPI.updateProduct(updatedProduct);
      if (response.data.success) {
        message.success("Product updated successfully");
        setProducts((prevProducts) => {
          const updatedIndex = prevProducts.findIndex(
            (p) => p.id === updatedProduct.id
          );
          if (updatedIndex !== -1) {
            const updatedProducts = [...prevProducts];
            updatedProducts[updatedIndex] = updatedProduct;
            return updatedProducts;
          }
          return prevProducts;
        });
        setIsUpdateProductModalVisible(false);
      } else {
        message.error(response.data.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      message.error("Failed to update product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await ProductAPI.deleteProduct(productId);
      if (response.data.success) {
        message.success("Product deleted successfully");
        setProducts(products.filter((p) => p.id !== productId));
        setIsUpdateProductModalVisible(false);
      } else {
        message.error(response.data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Failed to delete product");
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "image",
      render: (image) => (
        <img src={image} alt="Product" className="w-20 h-auto" />
      ),
    },
    {
      title: "Name",
      dataIndex: "productName",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "status",
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
      sortOrder: sortedInfo.columnKey === "stock" && sortedInfo.order,
    },
    {
      title: "Action",
      key: "action",
      render: (_, product) => (
        <Button type="link" onClick={() => handleUpdateProduct(product)}>
          <MoreVertIcon className="h-6 w-6 " />
        </Button>
      ),
    },
  ];

  return (
    <div className="mx-6 p-4 my-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold ml-4">All Products</h1>
        </div>
        <Button
          type="primary"
          className="bg-black text-white mr-2"
          onClick={() => setIsAddProductModalVisible(true)}
        >
          + ADD NEW PRODUCT
        </Button>
      </div>
      <Table
        rowSelection={{
          type: "checkbox",
          onChange: (_, selectedRows) => {
            console.log("Selected rows:", selectedRows);
          },
        }}
        columns={columns}
        dataSource={products}
        rowKey="id"
        onChange={handleChange}
      />
      <Modal
        title="Add New Product"
        visible={isAddProductModalVisible}
        footer={null}
        onCancel={() => setIsAddProductModalVisible(false)}
        width={1800}
      >
        <AddProduct onCreate={handleAddProduct} />
      </Modal>
      <Modal
        title="Update Product"
        visible={isUpdateProductModalVisible}
        footer={null}
        onCancel={() => setIsUpdateProductModalVisible(false)}
        width={1800}
      >
        <UpdateProduct
          product={selectedProduct}
          onUpdate={handleUpdateExistingProduct}
          onDelete={handleDeleteProduct}
        />
      </Modal>
    </div>
  );
};

export default ListProduct;
