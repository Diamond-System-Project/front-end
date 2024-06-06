import { useState } from "react";
import { Table, Button, Breadcrumb, Modal } from "antd";
// import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";

const ProductList = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      image: <img src="https://via.placeholder.com/150" alt="Product" />,
      name: "Product's name",
      description: "Product's description",
      price: "$11.40",
      available: 150,
      stock: 200,
    },
  ]);

  const [sortedInfo, setSortedInfo] = useState({});
  const [isAddProductModalVisible, setIsAddProductModalVisible] =
    useState(false);
  const [isUpdateProductModalVisible, setIsUpdateProductModalVisible] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <div>{image}</div>,
    },
    {
      title: "Name",
      dataIndex: "name",
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
      dataIndex: "stock",
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const showAddProductModal = () => {
    setIsAddProductModalVisible(true);
  };

  const handleAddProductCancel = () => {
    setIsAddProductModalVisible(false);
  };

  const handleUpdateProduct = (product) => {
    setSelectedProduct(product);
    setIsUpdateProductModalVisible(true);
  };

  const handleUpdateProductCancel = () => {
    setIsUpdateProductModalVisible(false);
    setSelectedProduct(null);
  };

  const handleCreateProduct = (product) => {
    setProducts([
      ...products,
      {
        ...product,
        id: products.length + 1,
        image: <img src="https://via.placeholder.com/150" alt="Product" />,
      },
    ]);
    setIsAddProductModalVisible(false);
  };

  const handleUpdateExistingProduct = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setIsUpdateProductModalVisible(false);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
    setIsUpdateProductModalVisible(false);
  };

  return (
    <div className="mx-6 p-4 my-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold ml-4">All Products</h1>
          <Breadcrumb className="text-gray-600 ml-4">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>All Products</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Button
          type="primary"
          className="bg-black text-white mr-2"
          onClick={showAddProductModal}
        >
          + ADD NEW PRODUCT
        </Button>
      </div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
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
        onCancel={handleAddProductCancel}
        width={1800}
      >
        <AddProduct onCreate={handleCreateProduct} />
      </Modal>
      <Modal
        title="Update Product"
        visible={isUpdateProductModalVisible}
        footer={null}
        onCancel={handleUpdateProductCancel}
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

export default ProductList;
