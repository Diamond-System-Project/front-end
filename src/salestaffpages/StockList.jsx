import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Checkbox,
  message,
  Select,
  Dropdown,
  Menu,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import InventoryAPI from "../api/InventoryAPI";
import ProductAPI from "../api/ProductAPI";

const { Option } = Select;

const StockList = () => {
  const [inventory, setInventory] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [availableProducts, setAvailableProducts] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchInventory();
    fetchProducts();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await InventoryAPI.getAllInventory();
      console.log("Fetched inventory data:", response);
      if (Array.isArray(response)) {
        const transformedData = response.map((item) => ({
          key: item.locationId,
          productName: item.productId.productName,
          purchaseDate: item.purchaseDate,
          condition: item.condition,
          quantity: item.quantity,
          available: item.available ? "Yes" : "No",
        }));
        setInventory(transformedData);
      } else {
        message.error("Unexpected data format");
      }
    } catch (error) {
      message.error("Failed to fetch inventory");
      console.error("Failed to fetch inventory:", error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await ProductAPI.products();
      const allProducts = response.data.data; // Assuming the data is nested under `data.data`
      console.log("Fetched all products:", allProducts);
      const inventoryResponse = await InventoryAPI.getAllInventory();
      const inventoryProductIds = inventoryResponse.map(
        (item) => item.productId.productId
      );
      const availableProducts = allProducts.filter(
        (product) => !inventoryProductIds.includes(product.productId)
      );
      setAvailableProducts(availableProducts);
    } catch (error) {
      message.error("Failed to fetch products");
      console.error("Failed to fetch products:", error.message);
    }
  };

  const handleCreateInventory = async (values) => {
    try {
      await InventoryAPI.createInventory(values);
      message.success("Inventory item created successfully");
      setIsModalVisible(false);
      form.resetFields();
      fetchInventory();
    } catch (error) {
      message.error("Failed to create inventory item");
      console.error("Failed to create inventory item:", error.message);
    }
  };

  const handleEditInventory = async (values) => {
    try {
      await InventoryAPI.updateInventory(editingItem.key, values);
      message.success("Inventory item updated successfully");
      setIsEditModalVisible(false);
      form.resetFields();
      fetchInventory();
    } catch (error) {
      message.error("Failed to update inventory item");
      console.error("Failed to update inventory item:", error.message);
    }
  };

  const handleDeleteInventory = async (key) => {
    try {
      await InventoryAPI.deleteInventory(key);
      message.success("Inventory item deleted successfully");
      fetchInventory();
    } catch (error) {
      message.error("Failed to delete inventory item");
      console.error("Failed to delete inventory item:", error.message);
    }
  };

  const showEditModal = (item) => {
    setEditingItem(item);
    setIsEditModalVisible(true);
    form.setFieldsValue({
      purchaseDate: item.purchaseDate,
      condition: item.condition,
      quantity: item.quantity,
      available: item.available === "Yes",
    });
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
    },
    {
      title: "Condition",
      dataIndex: "condition",
      key: "condition",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={() => showEditModal(record)}>Edit</Menu.Item>
              <Menu.Item onClick={() => handleDeleteInventory(record.key)}>
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Stock List</h1>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Create Inventory
        </Button>
      </div>
      <Table dataSource={inventory} columns={columns} />
      <Modal
        title="Create Inventory"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateInventory}>
          <Form.Item
            name="productId"
            label="Product"
            rules={[{ required: true, message: "Please select a product" }]}
          >
            <Select placeholder="Select a product">
              {availableProducts.map((product) => (
                <Option key={product.productId} value={product.productId}>
                  {product.productName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="purchaseDate"
            label="Purchase Date"
            rules={[
              { required: true, message: "Please select the purchase date" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="condition"
            label="Condition"
            rules={[{ required: true, message: "Please input the condition" }]}
          >
            <Input placeholder="Condition" />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: "Please input the quantity" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="available" label="Available" valuePropName="checked">
            <Checkbox>Available</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Inventory"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleEditInventory}>
          <Form.Item
            name="purchaseDate"
            label="Purchase Date"
            rules={[
              { required: true, message: "Please select the purchase date" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="condition"
            label="Condition"
            rules={[{ required: true, message: "Please input the condition" }]}
          >
            <Input placeholder="Condition" />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: "Please input the quantity" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="available" label="Available" valuePropName="checked">
            <Checkbox>Available</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StockList;
