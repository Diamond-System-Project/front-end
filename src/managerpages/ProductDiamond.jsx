import { Button, Form, Input, Modal, Table, message, Select } from "antd";
import { useEffect, useState } from "react";
import ProductDiamondAPI from "../api/ProductDiamondAPI";

const ProductDiamond = () => {
  const [productDiamonds, setProductDiamonds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [editingProductDiamond, setEditingProductDiamond] = useState(null);
  const { Option } = Select;

  useEffect(() => {
    fetchProductDiamonds();
  }, []);

  const fetchProductDiamonds = async () => {
    try {
      const response = await ProductDiamondAPI.getAll();
      setProductDiamonds(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching product diamonds", error);
      message.error("Failed to fetch product diamonds");
    }
  };

  const handleDelete = async (id) => {
    try {
      await ProductDiamondAPI.delete(id);
      message.success("Product Diamond deleted successfully");
      fetchProductDiamonds();
    } catch (error) {
      console.error("Error deleting product diamond", error);
      message.error("Failed to delete product diamond");
    }
  };

  const handleEdit = (productDiamond) => {
    setEditingProductDiamond(productDiamond);
    form.setFieldsValue({
      productId: productDiamond.productId.productId,
      diamondId: productDiamond.diamondId.diamondId,
      type: productDiamond.type,
      quantity: productDiamond.quantity,
    });
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingProductDiamond(null);
    form.resetFields();
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (values.quantity < 0) {
        message.error("Quantity cannot be negative");
        return;
      }

      // Ensure type is either 'Main' or 'Side'
      if (values.type !== 'Main' && values.type !== 'Side') {
        message.error("Type must be either Main or Side");
        return;
      }

      if (editingProductDiamond) {
        await ProductDiamondAPI.update(
          editingProductDiamond.productDiamondId,
          values
        );
        message.success("Product Diamond updated successfully");
      } else {
        await ProductDiamondAPI.create(values);
        message.success("Product Diamond created successfully");
      }
      setShowModal(false);
      fetchProductDiamonds();
    } catch (error) {
      console.error("Error submitting form", error);
      message.error("Failed to save Product Diamond");
    }
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
      render: (type) => type === "Main" ? "Main" : "Side",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="space-x-2">
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            className="hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Edit
          </Button>
          <Button
            danger
            onClick={() => handleDelete(record.productDiamondId)}
            className="hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
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
        <Button
          type="primary"
          onClick={handleCreate}
          className="bg-black text-white hover:bg-gray-800 transition duration-300"
        >
          + ADD PRODUCT DIAMOND
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={productDiamonds}
        rowKey="productDiamondId"
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title={editingProductDiamond ? "Update Product Diamond" : "Create Product Diamond"}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleSubmit}
        okText={editingProductDiamond ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="productId" label="Product ID" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="diamondId" label="Diamond ID" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please select the type" }]}
          >
            <Select placeholder="Select a type">
              <Option value="Main">Main</Option>
              <Option value="Side">Side</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              { required: true, message: "Please input the quantity" },
              {
                validator: (_, value) =>
                  value >= 0
                    ? Promise.resolve()
                    : Promise.reject("Quantity cannot be negative")
              }
            ]}
          >
            <Input type="number" min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductDiamond;