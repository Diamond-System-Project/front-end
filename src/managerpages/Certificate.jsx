import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  DatePicker,
  Descriptions,
} from "antd";
import CertificateAPI from "../api/CertificateAPI";

const { Column } = Table;
const { confirm } = Modal;

const CertificateManagement = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await CertificateAPI.getAll();
      console.log("Fetched certificates:", response.data);
      setCertificates(response.data.data || []);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      message.error("Failed to fetch certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (certificateId) => {
    confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this certificate?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await CertificateAPI.delete(certificateId);
          message.success("Certificate deleted successfully");
          fetchData();
        } catch (error) {
          console.error("Error deleting certificate:", error);
          message.error("Failed to delete certificate");
        }
      },
    });
  };

  const handleCreate = async (values) => {
    try {
      await CertificateAPI.create(values);
      message.success("Certificate created successfully");
      setVisible(false);
      form.resetFields();
      fetchData();
    } catch (error) {
      console.error("Error creating certificate:", error);
      message.error("Failed to create certificate");
    }
  };

  const showCreateModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleView = async (certificateId) => {
    try {
      const response = await CertificateAPI.getById(certificateId);
      setSelectedCertificate(response.data.data);
      setViewVisible(true);
    } catch (error) {
      console.error("Error retrieving certificate:", error);
      message.error("Failed to retrieve certificate");
    }
  };

  const handleViewCancel = () => {
    setViewVisible(false);
    setSelectedCertificate(null);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div className="flex justify-between items-center p-6">
          <h2 className="text-2xl font-bold">Certificate Management</h2>
          <Button type="primary" onClick={showCreateModal}>
            Create Certificate
          </Button>
        </div>
      </div>
      <Table dataSource={certificates} loading={loading} rowKey="cerId">
        <Column dataIndex="cerId" key="cerId" />
        <Column
          title="Diamond ID"
          key="diamondId"
          render={(text, record) => record.diamondId.diamondId}
        />
        <Column
          title="Diamond Name"
          key="diamondName"
          render={(text, record) => record.diamondId.diamondName}
        />
        <Column title="Certificate Number" dataIndex="number" key="number" />
        <Column title="Shape Cut" dataIndex="shapeCut" key="shapeCut" />
        <Column title="Measure" dataIndex="measure" key="measure" />
        <Column title="Polish" dataIndex="polish" key="polish" />
        <Column title="Symmetry" dataIndex="symmetry" key="symmetry" />
        <Column title="Issuer" dataIndex="issuer" key="issuer" />
        <Column title="Issued Date" dataIndex="issued_date" key="issued_date" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <span>
              <Button type="link" onClick={() => handleView(record.cerId)}>
                View
              </Button>
              <Button
                type="link"
                danger
                onClick={() => handleDelete(record.cerId)}
              >
                Delete
              </Button>
            </span>
          )}
        />
      </Table>

      <Modal
        title="Create Certificate"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="createCertificateForm"
          onFinish={handleCreate}
          layout="vertical"
        >
          <Form.Item
            name="diamondId"
            label="Diamond ID"
            rules={[{ required: true, message: "Please enter Diamond ID" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="number"
            label="Certificate Number"
            rules={[
              { required: true, message: "Please enter Certificate Number" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="shapeCut"
            label="Shape Cut"
            rules={[{ required: true, message: "Please enter Shape Cut" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="measure"
            label="Measure"
            rules={[{ required: true, message: "Please enter Measure" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="polish"
            label="Polish"
            rules={[{ required: true, message: "Please enter Polish" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="symmetry"
            label="Symmetry"
            rules={[{ required: true, message: "Please enter Symmetry" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="issuer"
            label="Issuer"
            rules={[{ required: true, message: "Please enter Issuer" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="issued_date"
            label="Issued Date"
            rules={[{ required: true, message: "Please select Issued Date" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter Description" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {selectedCertificate && (
        <Modal
          title="Certificate Details"
          visible={viewVisible}
          onCancel={handleViewCancel}
          footer={null}
          width={800}
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Certificate ID">
              {selectedCertificate.cerId}
            </Descriptions.Item>
            <Descriptions.Item label="Diamond Name">
              {selectedCertificate.diamondId.diamondName}
            </Descriptions.Item>
            <Descriptions.Item label="Origin">
              {selectedCertificate.diamondId.origin}
            </Descriptions.Item>
            <Descriptions.Item label="Carat Weight">
              {selectedCertificate.diamondId.caratWeight}
            </Descriptions.Item>
            <Descriptions.Item label="Color">
              {selectedCertificate.diamondId.color}
            </Descriptions.Item>
            <Descriptions.Item label="Clarity">
              {selectedCertificate.diamondId.clarity}
            </Descriptions.Item>
            <Descriptions.Item label="Cut">
              {selectedCertificate.diamondId.cut}
            </Descriptions.Item>
            <Descriptions.Item label="Shape">
              {selectedCertificate.diamondId.shape}
            </Descriptions.Item>
            <Descriptions.Item label="Base Price">
              {selectedCertificate.diamondId.basePrice}
            </Descriptions.Item>
            <Descriptions.Item label="Certificate Number">
              {selectedCertificate.number}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {selectedCertificate.description}
            </Descriptions.Item>
            <Descriptions.Item label="Shape Cut">
              {selectedCertificate.shapeCut}
            </Descriptions.Item>
            <Descriptions.Item label="Measure">
              {selectedCertificate.measure}
            </Descriptions.Item>
            <Descriptions.Item label="Polish">
              {selectedCertificate.polish}
            </Descriptions.Item>
            <Descriptions.Item label="Symmetry">
              {selectedCertificate.symmetry}
            </Descriptions.Item>
            <Descriptions.Item label="Issuer">
              {selectedCertificate.issuer}
            </Descriptions.Item>
            <Descriptions.Item label="Issued Date">
              {selectedCertificate.issued_date}
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      )}
    </div>
  );
};

export default CertificateManagement;