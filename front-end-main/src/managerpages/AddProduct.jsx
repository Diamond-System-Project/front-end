import { useState, useRef } from "react";
import { Button, Input, Upload, message, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Card } from "antd";
import axios from "axios";

const { TextArea } = Input;
const { Dragger } = Upload;

const AddProduct = ({ onCreate }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const productImageRef = useRef(null);

  const handleImageUpload = async (info) => {
    const { file } = info;
    if (file.status === "uploading") {
      if (file.type === "image/png") {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = async () => {
          setImagePreviews((prev) => [...prev, reader.result]);
          const url = await uploadFile(file.originFileObj);
          if (url) {
            setUploadedUrls((prev) => [...prev, url]);
          }
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
    onCreate({ ...values, images: uploadedUrls });
  };

  const uploadFile = async (files) => {
    const CLOUD_NAME = "de6cbtj5x";
    const PRESET_NAME = "Upload_image";
    const FOLDER_NAME = "Test";
    const urls = [];
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);
    
    
    for(const file of files) {
      formData.append("file", file);

      try {
        const response = await axios.post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        urls.push(response.data.secure_url);
        console.log(urls);
      } catch (error) {
        console.error("Error uploading file:", error);
        return null;
      }
    }
    return urls;
    
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
                {imagePreviews.length > 0 ? (
                  imagePreviews.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Product Preview ${index + 1}`}
                      className="h-full object-contain"
                    />
                  ))
                ) : (
                  <span>Image Preview</span>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Product Gallery</label>
                <Dragger
                  ref={productImageRef}
                  name="files"
                  accept=".png"
                  className="mb-4"
                  beforeUpload={beforeUpload}
                  onChange={handleImageUpload}
                  showUploadList={false}
                  multiple={true}
                >
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Drop your images here, or browse
                  </p>
                  <p className="ant-upload-hint">Only PNG files are allowed</p>
                </Dragger>
              </div>
            </div>
          </div>
          <div className="flex justify-between space-x-4 mt-6">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-green-500"
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
