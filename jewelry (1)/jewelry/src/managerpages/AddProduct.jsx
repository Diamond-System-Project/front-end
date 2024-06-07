import { useState } from "react";
import { Button, Input, Upload, message, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Card } from "antd";

const { TextArea } = Input;
const { Dragger } = Upload;

const AddProduct = ({ onCreate }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const handleImageUpload = (info) => {
    const { file } = info;
    if (file.status !== "uploading") {
      console.log(file, info);
    }

    if (file.status === "done" || file.status === "uploading") {
      if (file.type === "image/png") {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => {
          setImagePreview(reader.result);
        };
      } else {
        message.error("You can only upload PNG files!");
      }
    } else if (file.status === "error") {
      console.error("Error uploading file:", file.error);
    }
  };

  const beforeUpload = (file) => {
    const isPng = file.type === "image/png";
    if (!isPng) {
      message.error("You can only upload PNG files!");
    }
    return isPng;
  };

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Form values:", values);
    onCreate({ ...values, image: imagePreview });
  };

  return (
    <Card className="p-6 bg-gray-100 min-h-screen">
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <div className="bg-white p-6 rounded shadow-lg">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Form.Item
                name="name"
                label="Product Name"
                rules={[
                  { required: true, message: "Please input the product name!" },
                ]}
              >
                <Input placeholder="Type product's name here" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please input the description!" },
                ]}
              >
                <TextArea placeholder="Type description here" rows={2} />
              </Form.Item>

              <Form.Item
                name="category"
                label="Category"
                rules={[
                  { required: true, message: "Please input the category!" },
                ]}
              >
                <Input placeholder="Type category here" />
              </Form.Item>

              <Form.Item
                name="brandName"
                label="Brand Name"
                rules={[
                  { required: true, message: "Please input the brand name!" },
                ]}
              >
                <Input placeholder="Type brand name here" />
              </Form.Item>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="sku"
                  label="SKU"
                  rules={[{ required: true, message: "Please input the SKU!" }]}
                >
                  <Input placeholder="123-456" />
                </Form.Item>
                <Form.Item
                  name="stock"
                  label="Stock Quantity"
                  rules={[
                    {
                      required: true,
                      message: "Please input the stock quantity!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="regularPrice"
                  label="Regular Price"
                  rules={[
                    {
                      required: true,
                      message: "Please input the regular price!",
                    },
                  ]}
                >
                  <Input placeholder="$" />
                </Form.Item>
                <Form.Item
                  name="price"
                  label="Sale Price"
                  rules={[
                    { required: true, message: "Please input the sale price!" },
                  ]}
                >
                  <Input placeholder="$" />
                </Form.Item>
              </div>
            </div>
            <div>
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
              <div className="mt-4">
                <label className="block text-gray-700">Product Gallery</label>
                <Dragger
                  name="files"
                  accept=".png"
                  className="mb-4"
                  beforeUpload={beforeUpload}
                  onChange={handleImageUpload}
                  showUploadList={false}
                >
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Drop your image here, or browse
                  </p>
                  <p className="ant-upload-hint">Only png are allowed</p>
                </Dragger>
              </div>
            </div>
          </div>
          <div className="flex justify-between space-x-4 mt-6">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-green-500 "
              >
                ADD NEW PRODUCT
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Card>
  );
};

export default AddProduct;
