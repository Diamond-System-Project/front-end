import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  notification,
  Select,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import WarrantyAPI from "../api/WarrantyAPI";
import OrderDetailAPI from "../api/OrderDetailAPI";
import moment from "moment";

const Warranty = () => {
  const [warranties, setWarranties] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchWarranties();
    fetchAllOrderDetails(); // Fetching all order details
  }, []);

  const fetchWarranties = async () => {
    try {
      const response = await WarrantyAPI.getAll();
      console.log("Fetched warranties: ", response.data);
      if (Array.isArray(response.data.data)) {
        setWarranties(response.data.data);
      } else {
        console.error("Fetched data is not an array:", response.data);
        notification.error({ message: "Failed to fetch warranties" });
      }
    } catch (error) {
      notification.error({ message: "Failed to fetch warranties" });
      console.error("Fetch warranties error: ", error);
    }
  };

  const fetchAllOrderDetails = async () => {
    try {
      const response = await OrderDetailAPI.getAllOrderDetails();
      console.log("Fetched order details: ", response.data);
      if (Array.isArray(response.data.data)) {
        setOrderDetails(response.data.data);
      } else {
        console.error("Fetched data is not an array:", response.data);
        notification.error({ message: "Failed to fetch order details" });
      }
    } catch (error) {
      notification.error({ message: "Failed to fetch order details" });
      console.error("Fetch order details error: ", error);
    }
  };

  const handleCreate = () => {
    setIsEditing(false);
    setSelectedWarranty(null);
    setIsModalVisible(true);
  };

  const handleEdit = (warranty) => {
    setIsEditing(true);
    setSelectedWarranty(warranty);
    form.setFieldsValue({
      orderDetailId: warranty.orderDetailId.orderDetailId,
      warrantyLength: warranty.warrantyLength,
      startDate: moment(warranty.startDate, "DD-MM-YYYY"),
      endDate: moment(warranty.endDate, "DD-MM-YYYY"),
    });

    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        orderDetailId: values.orderDetailId,
        warrantyLength: values.warrantyLength,
        startDate: values.startDate.format("DD-MM-YYYY"),
        endDate: values.endDate.format("DD-MM-YYYY"),
      };

      if (isEditing) {
        await WarrantyAPI.update(selectedWarranty.warrantyId, data);
        notification.success({ message: "Warranty updated successfully" });
      } else {
        await WarrantyAPI.create(data);
        notification.success({ message: "Warranty created successfully" });
      }
      fetchWarranties();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      notification.error({ message: "Failed to save warranty" });
      console.error("Save warranty error: ", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: "Warranty Length",
      dataIndex: "warrantyLength",
      key: "warrantyLength",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => moment(text, "DD-MM-YYYY").format("YYYY-MM-DD"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => moment(text, "DD-MM-YYYY").format("YYYY-MM-DD"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <h2 className="text-2xl font-bold">Warranty List</h2>
        <button
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mr-2"
          onClick={handleCreate}
        >
          + ADD WARRANTY
        </button>
      </div>
      <Table dataSource={warranties} columns={columns} rowKey="warrantyId" />
      <Modal
        title={isEditing ? "Edit Warranty" : "Create Warranty"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="orderDetailId"
            label="Order Detail ID"
            rules={[
              { required: true, message: "Please select the order detail!" },
            ]}
          >
            <Select disabled={isEditing} placeholder="Select Order Detail">
              {orderDetails.map((orderDetail) => (
                <Select.Option
                  key={orderDetail.orderDetailId}
                  value={orderDetail.orderDetailId}
                >
                  {orderDetail.orderDetailId}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="warrantyLength"
            label="Warranty Length"
            rules={[
              { required: true, message: "Please input the warranty length!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[
              { required: true, message: "Please select the start date!" },
            ]}
          >
            <DatePicker format="DD-MM-YYYY" />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: "Please select the end date!" }]}
          >
            <DatePicker format="DD-MM-YYYY" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Warranty;
