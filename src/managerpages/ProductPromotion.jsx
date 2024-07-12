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
//eslint-disable-next-line
const { TextArea } = Input;

function ProductPromotion() {
  const [productPromotions, setProductPromotions] = useState([]);
  const [products, setProducts] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    promotionId: 0,
    productId: "",
    discount: 0,
    startDate: "",
    endDate: "",
  });
  const [editingPromotion, setEditingPromotion] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [promotionResponse, productResponse, promotionsResponse] =
          await Promise.all([
            ProductPromotionAPI.getAll(),
            ProductAPI.products(),
            PromotionAPI.getAll(),
          ]);

        console.log("Promotions response:", promotionResponse);
        console.log("Products response:", productResponse);
        console.log("All Promotions response:", promotionsResponse);

        if (Array.isArray(promotionResponse.data)) {
          setProductPromotions(promotionResponse.data);
        } else {
          console.error(
            "Promotions response data is not an array:",
            promotionResponse.data
          );
        }

        if (Array.isArray(productResponse.data.data)) {
          setProducts(productResponse.data.data);
        } else {
          console.error(
            "Products response data is not an array:",
            productResponse.data.data
          );
        }

        if (Array.isArray(promotionsResponse.data)) {
          setPromotions(promotionsResponse.data);
        } else {
          console.error(
            "All Promotions response data is not an array:",
            promotionsResponse.data
          );
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
    setFormData({
      promotionId: promotion.promotionId.promotionId,
      productId: promotion.productId.productId,
      discount: promotion.discount.toString(), // Convert discount to string for input
      startDate: promotion.startDate
        ? moment(promotion.startDate, "YYYY-MM-DD")
        : null,
      endDate: promotion.endDate
        ? moment(promotion.endDate, "YYYY-MM-DD")
        : null,
    });
    setEditingPromotion(promotion);
    setShowModal(true);
  };

  const handleCreate = () => {
    setFormData({
      promotionId: 0,
      productId: "",
      discount: 0,
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
        discount: parseFloat(formData.discount), // Ensure discount is a number
        startDate: formData.startDate
          ? formData.startDate.format("DD-MM-YYYY")
          : "",
        endDate: formData.endDate ? formData.endDate.format("DD-MM-YYYY") : "",
      };
      console.log("Submitting form data:", formattedFormData);
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
      console.log("API response:", response);
      const fetchResponse = await ProductPromotionAPI.getAll();
      setProductPromotions(fetchResponse.data);
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting form", error);
      message.error("Failed to submit form");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductChange = (value) => {
    setFormData({ ...formData, productId: value });
  };

  const handlePromotionChange = (value) => {
    setFormData({ ...formData, promotionId: value });
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
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type="danger"
            onClick={() => handleDelete(record.productPromotionId)}
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
          <Form.Item label="Promotion">
            <Select
              value={formData.promotionId}
              onChange={handlePromotionChange}
              placeholder="Select a promotion"
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
          <Form.Item label="Product">
            <Select
              value={formData.productId}
              onChange={handleProductChange}
              placeholder="Select a product"
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
          <Form.Item label="Discount">
            <Input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Start Date">
            <DatePicker
              name="startDate"
              value={formData.startDate}
              onChange={(date) => setFormData({ ...formData, startDate: date })}
              format="YYYY-MM-DD"
            />
          </Form.Item>
          <Form.Item label="End Date">
            <DatePicker
              name="endDate"
              value={formData.endDate}
              onChange={(date) => setFormData({ ...formData, endDate: date })}
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ProductPromotion;
