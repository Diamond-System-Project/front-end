import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Table,
  DatePicker,
  message,
  Select,
} from "antd";
import ProductPromotionAPI from "../api/ProductPromotionAPI";
import ProductAPI from "../api/ProductAPI";
import PromotionAPI from "../api/PromotionAPI";
import moment from "moment";

const { TextArea } = Input;

const validatePositiveNumber = (_, value) => {
  if (value && value < 0) {
    return Promise.reject(new Error("Value cannot be negative!"));
  }
  return Promise.resolve();
};

function ProductPromotion() {
  const [productPromotions, setProductPromotions] = useState([]);
  const [products, setProducts] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchData() {
      try {
        const [promotionResponse, productResponse, promotionsResponse] =
          await Promise.all([
            ProductPromotionAPI.getAll(),
            ProductAPI.products(),
            PromotionAPI.getAll(),
          ]);

        if (Array.isArray(promotionResponse.data)) {
          setProductPromotions(promotionResponse.data);
        } else {
          console.error("Promotions response data is not an array:", promotionResponse.data);
        }

        if (Array.isArray(productResponse.data.data)) {
          setProducts(productResponse.data.data);
        } else {
          console.error("Products response data is not an array:", productResponse.data.data);
        }

        if (Array.isArray(promotionsResponse.data)) {
          setPromotions(promotionsResponse.data);
        } else {
          console.error("All Promotions response data is not an array:", promotionsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (productPromotionId) => {
    try {
      await ProductPromotionAPI.delete(productPromotionId);
      setProductPromotions(
        productPromotions.filter(
          (promo) => promo.productPromotionId !== productPromotionId
        )
      );
      message.success("Product promotion deleted successfully");
    } catch (error) {
      console.error("Error deleting product promotion", error);
      message.error("Failed to delete product promotion");
    }
  };

  const handleEdit = (promotion) => {
    form.setFieldsValue({
      promotionId: promotion.promotionId.promotionId,
      productId: promotion.productId.productId,
      discount: promotion.discount,
      startDate: promotion.startDate ? moment(promotion.startDate, "DD-MM-YYYY") : null,
      endDate: promotion.endDate ? moment(promotion.endDate, "DD-MM-YYYY") : null,
    });
    setEditingPromotion(promotion);
    setShowModal(true);
  };

  const handleCreate = () => {
    form.resetFields();
    setEditingPromotion(null);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formattedFormData = {
        ...values,
        discount: parseFloat(values.discount),
        startDate: values.startDate ? values.startDate.format("DD-MM-YYYY") : "",
        endDate: values.endDate ? values.endDate.format("DD-MM-YYYY") : "",
      };

      let response;
      if (editingPromotion) {
        response = await ProductPromotionAPI.update(
          editingPromotion.productPromotionId,
          formattedFormData
        );
        message.success("Product promotion updated successfully");
      } else {
        response = await ProductPromotionAPI.create(formattedFormData);
        message.success("Product promotion created successfully");
      }

      const fetchResponse = await ProductPromotionAPI.getAll();
      setProductPromotions(fetchResponse.data);
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting form", error);
      message.error("Failed to submit form");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "productPromotionId",
      key: "productPromotionId",
    },
    {
      title: "Promotion Name",
      dataIndex: ["promotionId", "promotionName"],
      key: "promotionName",
    },
    {
      title: "Product Name",
      dataIndex: ["productId", "productName"],
      key: "productName",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
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
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (active) => (active ? "Active" : "Inactive"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            onClick={() => handleUpdateStatus(record)}
            className="hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            {record.active ? "Deactivate" : "Activate"}
          </Button>
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            className="hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record.productPromotionId)}
            className="hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleProductChange = (value) => {
    form.setFieldsValue({ productId: value });
  };

  const handlePromotionChange = (value) => {
    form.setFieldsValue({ promotionId: value });
  };

  const handleUpdateStatus = async (promotion) => {
    try {
      const { promotionId, productId } = promotion;
      const newStatus = !promotion.active; // Toggle status
      const statusUpdateResponse = await ProductPromotionAPI.updateStatus(
        promotionId.promotionId,
        productId.productId,
        newStatus
      );
      if (statusUpdateResponse.status === 200) {
        message.success(`Product promotion ${newStatus ? "activated" : "deactivated"} successfully`);
      } else {
        message.error("Failed to update product promotion status");
      }
      const fetchResponse = await ProductPromotionAPI.getAll();
      setProductPromotions(fetchResponse.data);
    } catch (error) {
      console.error("Error updating promotion status:", error);
      message.error("Failed to update promotion status");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <h2 className="text-2xl font-bold">Product Promotions</h2>
        <button
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mr-2"
          onClick={handleCreate}
        >
          + ADD PRODUCT PROMOTION
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={productPromotions}
        rowKey="productPromotionId"
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title={editingPromotion ? "Update Promotion" : "Create Promotion"}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleSubmit}
        okText={editingPromotion ? "Update Promotion" : "Create Promotion"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Promotion"
            name="promotionId"
            rules={[{ required: true, message: "Please select a promotion" }]}
          >
            <Select
              placeholder="Select a promotion"
              onChange={handlePromotionChange}
            >
              {promotions.map((promotion) => (
                <Select.Option
                  key={promotion.promotionId}
                  value={promotion.promotionId}
                >
                  {promotion.promotionName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Product"
            name="productId"
            rules={[{ required: true, message: "Please select a product" }]}
          >
            <Select
              placeholder="Select a product"
              onChange={handleProductChange}
            >
              {products.map((product) => (
                <Select.Option
                  key={product.productId}
                  value={product.productId}
                >
                  {product.productName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Discount"
            name="discount"
            rules={[
              { required: true, message: "Please input the discount" },
              { validator: validatePositiveNumber }
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Start Date" name="startDate">
            <DatePicker
              format="DD-MM-YYYY"
            />
          </Form.Item>
          <Form.Item label="End Date" name="endDate">
            <DatePicker
              format="DD-MM-YYYY"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ProductPromotion;