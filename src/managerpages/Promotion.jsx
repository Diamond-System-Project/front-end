import { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Table, DatePicker } from "antd";
import PromotionAPI from "../api/PromotionAPI";
import moment from "moment";

const { TextArea } = Input;

function Promotion() {
  const [promotions, setPromotions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    promotionName: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [editingPromotion, setEditingPromotion] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await PromotionAPI.getAll();
        setPromotions(data.data);
      } catch (error) {
        console.error("Error fetching promotions", error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (promotionId) => {
    try {
      await PromotionAPI.updateStatus(promotionId); // Assuming this endpoint sets the status to inactive or deleted
      setPromotions(
        promotions.filter((promo) => promo.promotionId !== promotionId)
      );
    } catch (error) {
      console.error("Error deleting promotion", error);
    }
  };

  const handleEdit = (promotion) => {
    setFormData({
      ...promotion,
      startDate: promotion.startDate
        ? moment(promotion.startDate, "DD-MM-YYYY")
        : null,
      endDate: promotion.endDate
        ? moment(promotion.endDate, "DD-MM-YYYY")
        : null,
    });
    setEditingPromotion(promotion);
    setShowModal(true);
  };

  const handleCreate = () => {
    setFormData({
      promotionName: "",
      description: "",
      startDate: "",
      endDate: "",
    });
    setEditingPromotion(null);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      const formattedFormData = {
        ...formData,
        startDate: formData.startDate
          ? formData.startDate.format("DD-MM-YYYY")
          : "",
        endDate: formData.endDate ? formData.endDate.format("DD-MM-YYYY") : "",
      };
      if (editingPromotion) {
        await PromotionAPI.update(
          editingPromotion.promotionId,
          formattedFormData
        );
      } else {
        await PromotionAPI.create(formattedFormData);
      }
      const data = await PromotionAPI.getAll();
      setPromotions(data.data);
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "promotionId",
      key: "promotionId",
    },
    {
      title: "Name",
      dataIndex: "promotionName",
      key: "promotionName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type="danger"
            onClick={() => handleDelete(record.promotionId)}
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
        <h2 className="text-2xl font-bold">Promotions</h2>
        <button
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mr-2"
          onClick={handleCreate}
        >
          + ADD PROMOTION
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={promotions}
        rowKey="promotionId"
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title={editingPromotion ? "Update Promotion" : "Create Promotion"}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleSubmit}
        okText={editingPromotion ? "Update Promotion" : "Create Promotion"}
      >
        <Form layout="vertical">
          <Form.Item label="Promotion Name">
            <Input
              type="text"
              name="promotionName"
              value={formData.promotionName}
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              required
            />
          </Form.Item>
          <Form.Item label="Start Date">
            <DatePicker
              name="startDate"
              value={formData.startDate}
              onChange={(date) => setFormData({ ...formData, startDate: date })}
              format="DD-MM-YYYY"
              required
            />
          </Form.Item>
          <Form.Item label="End Date">
            <DatePicker
              name="endDate"
              value={formData.endDate}
              onChange={(date) => setFormData({ ...formData, endDate: date })}
              format="DD-MM-YYYY"
              required
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Promotion;
