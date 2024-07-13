import { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Table } from "antd";
import ProductDiamondAPI from "../api/ProductDiamondAPI";

const ProductDiamond = () => {
  const [productDiamonds, setProductDiamonds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    productId: 0,
    diamondId: 0,
    type: "",
    quantity: 0,
  });
  const [editingProductDiamond, setEditingProductDiamond] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ProductDiamondAPI.getAll();
        setProductDiamonds(Array.isArray(response.data) ? response.data : []);
        console.log("Fetched product diamonds:", response.data);
      } catch (error) {
        console.error("Error fetching product diamonds", error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await ProductDiamondAPI.delete(id);
      setProductDiamonds(
        productDiamonds.filter((item) => item.productDiamondId !== id)
      );
    } catch (error) {
      console.error("Error deleting product diamond", error);
    }
  };

  const handleEdit = (productDiamond) => {
    setFormData({
      productId: productDiamond.productId.productId,
      diamondId: productDiamond.diamondId.diamondId,
      type: productDiamond.type,
      quantity: productDiamond.quantity,
    });
    setEditingProductDiamond(productDiamond);
    setShowModal(true);
  };

  const handleCreate = () => {
    setFormData({
      productId: 0,
      diamondId: 0,
      type: "",
      quantity: 0,
    });
    setEditingProductDiamond(null);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingProductDiamond) {
        await ProductDiamondAPI.update(
          editingProductDiamond.productDiamondId,
          formData
        );
      } else {
        await ProductDiamondAPI.create(formData);
      }
      const response = await ProductDiamondAPI.getAll();
      setProductDiamonds(Array.isArray(response.data) ? response.data : []);
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "productDiamondId", // Assuming this is the ID you want to display
      key: "productDiamondId",
    },
    {
      title: "Product Name",
      dataIndex: ["productId", "productName"],
      key: "productName",
    },
    {
      title: "Diamond Name",
      dataIndex: ["diamondId", "diamondName"],
      key: "diamondName",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type="danger"
            onClick={() => handleDelete(record.productDiamondId)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <h2 className="text-2xl font-bold">Product Diamonds</h2>
        <button
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mr-2"
          onClick={handleCreate}
        >
          + ADD PRODUCT DIAMOND
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={productDiamonds}
        rowKey="productDiamondId"
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title={
          editingProductDiamond
            ? "Update Product Diamond"
            : "Create Product Diamond"
        }
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleSubmit}
        okText={
          editingProductDiamond
            ? "Update Product Diamond"
            : "Create Product Diamond"
        }
      >
        <Form layout="vertical">
          <Form.Item label="Product ID">
            <Input
              type="number"
              name="productId"
              value={formData.productId}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Diamond ID">
            <Input
              type="number"
              name="diamondId"
              value={formData.diamondId}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Type">
            <Input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Quantity">
            <Input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductDiamond;
