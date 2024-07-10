import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import ProductPriceAPI from "../api/ProductPriceAPI";

const ProductPrice = () => {
  const [productPrices, setProductPrices] = useState([]);
  const [selectedProductPrice, setSelectedProductPrice] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProductPrices();
  }, []);

  const fetchProductPrices = async () => {
    try {
      const response = await ProductPriceAPI.getAll();
      if (response.data.success) {
        setProductPrices(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching product prices:", error);
    }
  };

  const handleAddProductPrice = () => {
    setSelectedProductPrice(null);
    setIsModalVisible(true);
  };

  const handleEditProductPrice = (record) => {
    setSelectedProductPrice(record);
    form.setFieldsValue({
      productId: record.productId.productId,
      markupRate: record.markupRate,
    });
    setIsModalVisible(true);
  };

  const handleDeleteProductPrice = async (productPriceId) => {
    try {
      const response = await ProductPriceAPI.delete([productPriceId]);
      if (response.data.success) {
        message.success("Product price deleted successfully");
        fetchProductPrices();
      } else {
        message.error(
          response.data.message || "Failed to delete product price"
        );
      }
    } catch (error) {
      console.error("Error deleting product price:", error);
      message.error("Failed to delete product price");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (selectedProductPrice) {
        // Update existing product price
        const updatedProductPrice = {
          ...selectedProductPrice,
          markupRate: values.markupRate,
        };
        await ProductPriceAPI.update(updatedProductPrice);
        message.success("Product price updated successfully");
      } else {
        // Add new product price
        const newProductPrice = {
          productId: values.productId,
          markupRate: values.markupRate,
        };
        await ProductPriceAPI.create(newProductPrice);
        message.success("Product price added successfully");
      }
      fetchProductPrices();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error saving product price:", error);
      message.error("Failed to save product price");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: ["productId", "productName"],
      key: "productName",
    },
    {
      title: "Description",
      dataIndex: ["productId", "description"],
      key: "description",
    },
    {
      title: "Markup Rate",
      dataIndex: "markupRate",
      key: "markupRate",
    },
    {
      title: "Selling Price",
      dataIndex: "sellingPrice",
      key: "sellingPrice",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEditProductPrice(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDeleteProductPrice(record.productPriceId)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">Product Prices</h1>
        <Button
          type="primary"
          onClick={handleAddProductPrice}
          style={{ marginBottom: 16 }}
        >
          Add Product Price
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={productPrices}
        rowKey="productPriceId"
      />

      <Modal
        title="Product Price"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="productId"
            label="Product ID"
            rules={[
              { required: true, message: "Please input the product ID!" },
            ]}
          >
            <Input placeholder="Type product ID here" />
          </Form.Item>
          <Form.Item
            name="markupRate"
            label="Markup Rate"
            rules={[
              { required: true, message: "Please input the markup rate!" },
            ]}
          >
            <Input placeholder="Type markup rate here" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductPrice;
