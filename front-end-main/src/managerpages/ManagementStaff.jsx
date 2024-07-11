import { useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
} from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import GetUserByRoleAPI from "../api/GetUserByRoleAPI";

const { Option } = Select;

const ManagementStaff = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [saleStaff, deliveryStaff] = await Promise.all([
        GetUserByRoleAPI.getAllSaleStaff(),
        GetUserByRoleAPI.getAllDeliveryStaff(),
      ]);

      const saleStaffData = saleStaff.data.map((item) => ({
        key: item.userId,
        userName: item.fullName,
        gender: item.gender,
        dob: moment(item.dob).format("DD/MM/YYYY"),
        role: "Sale Staff",
        phoneNumber: item.phone,
        email: item.email,
      }));

      const deliveryStaffData = deliveryStaff.data.map((item) => ({
        key: item.userId,
        userName: item.fullName,
        gender: item.gender,
        dob: moment(item.dob).format("DD/MM/YYYY"),
        role: "Delivery Staff",
        phoneNumber: item.phone,
        email: item.email,
      }));

      setDataSource([...saleStaffData, ...deliveryStaffData]);
    } catch (error) {
      console.error("Error fetching staff data:", error);
      message.error("Failed to fetch staff data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          dob: values.dob.format("DD/MM/YYYY"),
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

  const handleAction = (record) => {
    setEditingRecord(record);
    form.setFieldsValue({
      ...record,
      dob: moment(record.dob, "DD/MM/YYYY"),
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    const newDataSource = dataSource.filter((item) => item.key !== record.key);
    setDataSource(newDataSource);
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Date Of Birth",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        {
          text: "Sale Staff",
          value: "Sale Staff",
        },
        {
          text: "Delivery Staff",
          value: "Delivery Staff",
        },
      ],
      onFilter: (value, record) => record.role.includes(value),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Edit",
      key: "edit",
      render: (text, record) => (
        <Link onClick={() => handleAction(record)}>Edit</Link>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (text, record) => (
        <Button type="danger" onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="mx-6 p-4 my-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl font-bold ml-4">All Staff</h1>
          <Button
            type="primary"
            className="bg-black text-white mr-2"
            onClick={showModal}
          >
            + ADD NEW STAFF
          </Button>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} loading={loading} />
      <Modal
        title={editingRecord ? "Edit Staff" : "Add New Staff"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="userName"
            label="User Name"
            rules={[{ required: true, message: "Please input the user name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select the role!" }]}
          >
            <Select>
              <Option value="Sale Staff">Sale Staff</Option>
              <Option value="Delivery Staff">Delivery Staff</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[
              { required: true, message: "Please select the date of birth!" },
            ]}
          >
            <DatePicker className="w-full" format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "The input is not valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select the gender!" }]}
          >
            <Select>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagementStaff;
