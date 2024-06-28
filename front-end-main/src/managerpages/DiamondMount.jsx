import React, { useState } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  Dropdown,
  Menu,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";

const { Option } = Select;

const ManagementDiamondMount = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      name: "Classic Mount",
      size: "6",
      type: "Ring",
      material: "Gold",
      price: "1000",
    },
    {
      key: "2",
      name: "Elegant Mount",
      size: "7",
      type: "Necklace",
      material: "Platinum",
      price: "1500",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        const newData = {
          ...values,
        };

        if (editingRecord) {
          const updatedDataSource = dataSource.map((item) =>
            item.key === editingRecord.key ? { ...item, ...newData } : item
          );
          setDataSource(updatedDataSource);
          setEditingRecord(null);
        } else {
          newData.key = (dataSource.length + 1).toString();
          setDataSource([...dataSource, newData]);
        }

        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    const newDataSource = dataSource.filter((item) => item.key !== record.key);
    setDataSource(newDataSource);
  };

  const columns = [
    {
      title: "Diamond Mount Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" onClick={() => handleEdit(record)}>
                Edit
              </Menu.Item>
              <Menu.Item key="delete" onClick={() => handleDelete(record)}>
                Delete
              </Menu.Item>
            </Menu>
          }
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="mx-6 p-4 my-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl font-bold ml-4">Diamond Mount Management</h1>
          <Button
            type="primary"
            className="bg-black text-white mr-2"
            onClick={showModal}
          >
            + ADD NEW MOUNT
          </Button>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title={editingRecord ? "Edit Diamond Mount" : "Add New Diamond Mount"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Diamond Mount Name"
            rules={[
              { required: true, message: "Please input the mount name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="size"
            label="Size"
            rules={[{ required: true, message: "Please input the size!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please select the type!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="material"
            label="Material"
            rules={[{ required: true, message: "Please select the material!" }]}
          >
            <Select>
              <Option value="Diamond">Diamond</Option>
              <Option value="Gold">Gold</Option>
              <Option value="Platinum">Platinum</Option>
              <Option value="Silver">Silver</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagementDiamondMount;
