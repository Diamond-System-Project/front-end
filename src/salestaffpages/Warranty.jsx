import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  notification,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  //  DeleteOutlined
} from "@ant-design/icons";
import WarrantyAPI from "../api/WarrantyAPI";
import moment from "moment";

const Warranty = () => {
  const [warranties, setWarranties] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchWarranties();
  }, []);

  const fetchWarranties = async () => {
    try {
      const response = await WarrantyAPI.getAll();
      console.log("Fetched warranties: ", response.data);

      // Ensure the response data is an array
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

  const handleCreate = () => {
    setIsEditing(false);
    setSelectedWarranty(null);
    setIsModalVisible(true);
  };

  const handleEdit = (warranty) => {
    setIsEditing(true);
    setSelectedWarranty(warranty);

    // Set form values, including nested fields
    form.setFieldsValue({
      orderDetailId: warranty.orderDetailId.orderDetailId,
      warrantyLength: warranty.warrantyLength,
      startDate: moment(warranty.startDate, "DD-MM-YYYY"),
      endDate: moment(warranty.endDate, "DD-MM-YYYY"),
    });

    setIsModalVisible(true);
  };

  //   const handleDelete = async (warrantyId) => {
  //     try {
  //       await WarrantyAPI.delete(warrantyId);
  //       fetchWarranties();
  //       notification.success({ message: "Warranty deleted successfully" });
  //     } catch (error) {
  //       notification.error({ message: "Failed to delete warranty" });
  //       console.error("Delete warranty error: ", error);
  //     }
  //   };

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
          {/* <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.warrantyId)}
            danger
          /> */}
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Warranty List</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Add Warranty
        </Button>
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
              { required: true, message: "Please input the order detail ID!" },
            ]}
          >
            <Input disabled={isEditing} />
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
