import { useState } from "react";
import {
  Breadcrumb,
  Button,
  Input,
  Card,
  Upload,
  message,
  DatePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const UpdateProduct = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (info) => {
    const { file } = info;
    console.log("File info:", file);
    if (file.status !== "uploading") {
      console.log(file, info);
    }

    if (file.status === "done" || file.status === "uploading") {
      console.log("File type:", file.type);

      if (file.type === "image/png") {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => {
          setImagePreview(reader.result);
          console.log("Image preview updated");
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

  return (
    <Card className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Product Details</h1>
        <Breadcrumb className="text-gray-600">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>All Products</Breadcrumb.Item>
          <Breadcrumb.Item>Update Product</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="bg-white p-6 rounded shadow-lg">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700">Product Name</label>
            <Input placeholder="Type product's name here" className="mb-4" />

            <label className="block text-gray-700">Description</label>
            <TextArea
              placeholder="Type Description here"
              rows={2}
              className="mb-4"
            />

            <label className="block text-gray-700">Category</label>
            <Input placeholder="Type category here" className="mb-4" />

            <label className="block text-gray-700">Brand Name</label>
            <Input placeholder="Type brand name here" className="mb-4" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">SKU</label>
                <Input placeholder="123-456" className="mb-4" />
              </div>
              <div>
                <label className="block text-gray-700">Stock Quantity</label>
                <Input placeholder="" className="mb-4" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Regular Price</label>
                <Input placeholder="$" className="mb-4" />
              </div>
              <div>
                <label className="block text-gray-700">Sale Price</label>
                <Input placeholder="$" className="mb-4" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Discount</label>
                <Input placeholder="%" className="mb-4" />
              </div>
              <div>
                <label className="block text-gray-700">Discount</label>
                <RangePicker className="w-full" />
              </div>
            </div>
          </div>
          <div>
            <div className="mt-4">
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="h-full object-contain"
                  />
                ) : (
                  <img
                    src="https://i.pinimg.com/564x/02/49/98/024998a77547072bda7d81bc688be196.jpg"
                    alt="Image Preview"
                    className="h-full object-contain"
                  />
                )}
              </div>
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
          <div className="flex items-start space-x-6">
            <Button type="primary">UPDATE PRODUCT</Button>
            <Button type="primary" danger>
              DELETE PRODUCT
            </Button>
          </div>

          <Button>Cancel</Button>
        </div>
      </div>
    </Card>
  );
};

export default UpdateProduct;
