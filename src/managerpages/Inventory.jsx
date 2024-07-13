import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Checkbox,
  DatePicker,
  Select,
  message,
} from "antd";
import moment from "moment";
import InventoryAPI from "../api/InventoryAPI";
import ProductAPI from "../api/ProductAPI";

const { Option } = Select;

const Inventory = () => {
  const [inventories, setInventories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const data = await InventoryAPI.getAllInventory();
        setInventories(data);
      } catch (error) {
        message.error("Error fetching inventory items.");
        console.error("Error fetching inventory items:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await ProductAPI.products();
        setProducts(response.data.data);
      } catch (error) {
        message.error("Error fetching products.");
        console.error("Error fetching products:", error);
      }
    };

    fetchInventories();
    fetchProducts();
  }, []);

  const handleCreate = async (values) => {
    try {
      setLoading(true);
      const formattedValues = {
        ...values,
        purchaseDate: values.purchaseDate.format("DD-MM-YYYY"),
      };
      console.log("Creating inventory with values:", formattedValues);
      await InventoryAPI.createInventory(formattedValues);
      message.success("Inventory item created successfully!");
      setInventories(await InventoryAPI.getAllInventory());
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Error creating inventory item.");
      console.error("Error creating inventory item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    try {
      setLoading(true);
      const formattedValues = {
        ...values,
        purchaseDate: values.purchaseDate.format("DD-MM-YYYY"),
      };
      console.log(
        "Updating inventory with ID:",
        editId,
        "Values:",
        formattedValues
      );
      await InventoryAPI.updateInventory(editId, formattedValues);
      message.success("Inventory item updated successfully!");
      setInventories(await InventoryAPI.getAllInventory());
      setIsModalVisible(false);
      form.resetFields();
      setEditId(null);
    } catch (error) {
      message.error("Error updating inventory item.");
      console.error("Error updating inventory item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      console.log("Deleting inventory with ID:", id);
      await InventoryAPI.deleteInventory(id);
      message.success("Inventory item deleted successfully!");
      setInventories(await InventoryAPI.getAllInventory());
    } catch (error) {
      message.error("Error deleting inventory item.");
      console.error("Error deleting inventory item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setEditId(record._id);
    form.setFieldsValue({
      productId: record.productId.productId,
      purchaseDate: record.purchaseDate
        ? moment(record.purchaseDate, "DD-MM-YYYY")
        : null,
      condition: record.condition,
      quantity: record.quantity,
      available: record.available,
    });
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Location ID",
      dataIndex: "locationId",
      key: "locationId",
    },
    {
      title: "Product ID",
      dataIndex: ["productId", "productId"],
      key: "productId",
    },
    {
      title: "Product Name",
      dataIndex: ["productId", "productName"],
      key: "productName",
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      render: (text) => new Date(text).toLocaleDateString(),
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
      render: (text) => (text ? "Yes" : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          {/* <Button type="link" onClick={() => handleDelete(record._id)} danger>
            Delete
          </Button> */}
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <h2 className="text-2xl font-bold">Inventory</h2>
        <button
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mr-2"
          onClick={() => setIsModalVisible(true)}
        >
          + ADD INVENTORY
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={inventories}
        loading={loading}
        rowKey="_id"
      />
      <Modal
        title={editId ? "Edit Inventory" : "Add Inventory"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditId(null);
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              if (editId) {
                handleUpdate(values);
              } else {
                handleCreate(values);
              }
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="inventoryForm">
          <Form.Item
            name="productId"
            label="Product"
            rules={[{ required: true, message: "Please select the product!" }]}
          >
            <Select placeholder="Select a product">
              {products.map((product) => (
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
              { required: true, message: "Please select the purchase date!" },
            ]}
          >
            <DatePicker format="DD-MM-YYYY" />
          </Form.Item>
          <Form.Item
            name="condition"
            label="Condition"
            rules={[{ required: true, message: "Please input the condition!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: "Please input the quantity!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="available" valuePropName="checked">
            <Checkbox>Available</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Inventory;
