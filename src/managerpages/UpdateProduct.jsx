import { useState, useEffect } from "react";
import { Button, Input, Card, Upload, message, Form, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { storage, ref, uploadBytes, getDownloadURL } from "../firebase";
import ProductAPI from "../api/ProductAPI";

const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;
//eslint-disable-next-line
const UpdateProduct = ({ product, onUpdate, onDelete }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        //eslint-disable-next-line
        productName: product.productName || "",
        //eslint-disable-next-line
        description: product.description || "",
        //eslint-disable-next-line
        mountId: product.mountId?.mountId || "",
        //eslint-disable-next-line
        laborFee: product.laborFee || undefined,
        //eslint-disable-next-line
        status: product.status || "",
        //eslint-disable-next-line
        componentsPrice: product.componentsPrice || undefined,
        //eslint-disable-next-line
        price: product.price || undefined,
      });
      //eslint-disable-next-line
      setImagePreview(product?.url || "");
    }
  }, [product, form]);

  const handleImageUpload = async (info) => {
    const { file } = info;
    try {
      const storageRef = ref(storage, file.name);
      const snapshot = await uploadBytes(storageRef, file.originFileObj);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setImagePreview(downloadURL);
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("Failed to upload image. Please try again later.");
    }
  };

  const handleFinish = async (values) => {
    const updatedProduct = {
      ...product,
      ...values,
      url: imagePreview,
    };

    try {
      await ProductAPI.updateProduct(updatedProduct);
      onUpdate(updatedProduct);
      message.success("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      message.error("Failed to update product. Please try again later.");
    }
  };

  const handleDelete = async () => {
    try {
      //eslint-disable-next-line
      await ProductAPI.deleteProduct(product.productId);
      //eslint-disable-next-line
      onDelete(product.productId);
      message.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Failed to delete product. Please try again later.");
    }
  };

  return (
    <Card className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded shadow-lg">
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Form.Item
                name="productName"
                label="Product Name"
                rules={[
                  { required: true, message: "Please input the product name!" },
                ]}
              >
                <Input
                  placeholder="Type product's name here"
                  className="mb-4"
                />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please input the description!" },
                ]}
              >
                <TextArea
                  placeholder="Type Description here"
                  rows={2}
                  className="mb-4"
                />
              </Form.Item>
              <Form.Item
                name="mountId"
                label="Mount"
                rules={[{ required: true, message: "Please input the mount!" }]}
              >
                <Input
                  placeholder="Type mount here"
                  className="mb-4"
                  type="number"
                />
              </Form.Item>
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="laborFee"
                  label="Labor Fee"
                  rules={[
                    { required: true, message: "Please input the labor fee!" },
                  ]}
                >
                  <Input placeholder="$" className="mb-4" type="number" />
                </Form.Item>
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[
                    {
                      required: true,
                      message: "Please select the product status!",
                    },
                  ]}
                >
                  <Select placeholder="Select status">
                    <Option value="InStock">In Stock</Option>
                    <Option value="OutOfStock">OutOfStock</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Form.Item name="componentsPrice" label="Components Price">
                  <Input placeholder="$" className="mb-4" type="number" />
                </Form.Item>
                <Form.Item name="price" label="Sale Price">
                  <Input
                    placeholder="$"
                    className="mb-4"
                    type="number"
                   
                  />
                </Form.Item>
              </div>
            </div>
            <div>
              <div className="mt-4">
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Product Preview"
                      className="h-full object-contain"
                    />
                  ) : (
                    <span>Image Preview</span>
                  )}
                </div>
                <Form.Item label="Product Gallery">
                  <Dragger
                    name="files"
                    className="mb-4"
                    onChange={handleImageUpload}
                    showUploadList={false}
                  >
                    <p className="ant-upload-drag-icon">
                      <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Drop your image here, or browse
                    </p>
                    <p className="ant-upload-hint">
                      Only PNG files are allowed
                    </p>
                  </Dragger>
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="flex justify-between space-x-4 mt-6">
            <div className="flex items-start space-x-6">
              <Button type="primary" htmlType="submit">
                UPDATE PRODUCT
              </Button>
              <Button type="primary" danger onClick={handleDelete}>
                DELETE PRODUCT
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Card>
  );
};

export default UpdateProduct;
