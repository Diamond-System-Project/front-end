import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, notification } from "antd";
import DiamondAPI from "../api/DiamondAPI";

const ManagementDiamond = () => {
  const [diamonds, setDiamonds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDiamond, setSelectedDiamond] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchDiamonds();
  }, []);

  const fetchDiamonds = async () => {
    setLoading(true);
    try {
      const response = await DiamondAPI.getAllDiamonds();
      const { success, data } = response;
      if (success && Array.isArray(data)) {
        setDiamonds(data);
      } else {
        console.error("Unexpected data format:", response);
        notification.error({ message: "Unexpected data format from API" });
      }
    } catch (error) {
      notification.error({ message: "Failed to fetch diamonds" });
    }
    setLoading(false);
  };

  const showModal = (diamond) => {
    setSelectedDiamond(diamond);
    setIsModalVisible(true);
    form.setFieldsValue(diamond);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (selectedDiamond) {
        await DiamondAPI.updateDiamond(selectedDiamond.diamondId, values);
        notification.success({ message: "Diamond updated successfully" });
      } else {
        await DiamondAPI.createDiamond(values);
        notification.success({ message: "Diamond created successfully" });
      }
      setIsModalVisible(false);
      fetchDiamonds();
    } catch (error) {
      notification.error({ message: "Failed to save diamond" });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    { title: "ID", dataIndex: "diamondId", key: "diamondId" },
    { title: "Name", dataIndex: "diamondName", key: "diamondName" },
    { title: "Origin", dataIndex: "origin", key: "origin" },
    { title: "Carat Weight", dataIndex: "caratWeight", key: "caratWeight" },
    { title: "Color", dataIndex: "color", key: "color" },
    { title: "Clarity", dataIndex: "clarity", key: "clarity" },
    { title: "Cut", dataIndex: "cut", key: "cut" },
    { title: "Shape", dataIndex: "shape", key: "shape" },
    { title: "Base Price", dataIndex: "basePrice", key: "basePrice" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="link" onClick={() => showModal(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">Diamond Management</h1>
        <button
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mr-2"
          onClick={() => showModal(null)}
        >
          + ADD DIAMOND
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={diamonds}
        loading={loading}
        rowKey="diamondId"
      />
      <Modal
        title={selectedDiamond ? "Edit Diamond" : "Add Diamond"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="diamondName"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="origin"
            label="Origin"
            rules={[{ required: true, message: "Please input the origin!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="caratWeight"
            label="Carat Weight"
            rules={[
              { required: true, message: "Please input the carat weight!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true, message: "Please input the color!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="clarity"
            label="Clarity"
            rules={[{ required: true, message: "Please input the clarity!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cut"
            label="Cut"
            rules={[{ required: true, message: "Please input the cut!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="shape" label="Shape">
            <Input />
          </Form.Item>
          <Form.Item
            name="basePrice"
            label="Base Price"
            rules={[
              { required: true, message: "Please input the base price!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagementDiamond;
