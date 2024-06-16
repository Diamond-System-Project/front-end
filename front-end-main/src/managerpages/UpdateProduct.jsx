import { useState, useEffect } from "react";
import { Button, Input, Card, Upload, message, DatePicker, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const UpdateProduct = ({ product, onUpdate, onDelete }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,
        description: product.description,
        category: product.category,
        brandName: product.brandName,
        sku: product.sku,
        stockQuantity: product.stock,
        regularPrice: product.regularPrice,
        salePrice: product.price,
        discount: product.discount,
        discountRange: product.discountRange,
      });
      setImagePreview(product.image.props.src);
    }
  }, [product, form]);

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

  const handleFinish = (values) => {
    const updatedProduct = {
      ...product,
      ...values,
      image: <img src={imagePreview} alt="Product" />,
    };
    onUpdate(updatedProduct);
  };

  const handleDelete = () => {
    onDelete(product.id);
  };

  return (
    <Card className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded shadow-lg">
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Form.Item
                name="name"
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
                name="category"
                label="Category"
                rules={[
                  { required: true, message: "Please input the category!" },
                ]}
              >
                <Input placeholder="Type category here" className="mb-4" />
              </Form.Item>

              <Form.Item
                name="brandName"
                label="Brand Name"
                rules={[
                  { required: true, message: "Please input the brand name!" },
                ]}
              >
                <Input placeholder="Type brand name here" className="mb-4" />
              </Form.Item>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="sku"
                  label="SKU"
                  rules={[{ required: true, message: "Please input the SKU!" }]}
                >
                  <Input placeholder="123-456" className="mb-4" />
                </Form.Item>
                <Form.Item
                  name="stockQuantity"
                  label="Stock Quantity"
                  rules={[
                    {
                      required: true,
                      message: "Please input the stock quantity!",
                    },
                  ]}
                >
                  <Input placeholder="" className="mb-4" />
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
                  <Input placeholder="$" className="mb-4" />
                </Form.Item>
                <Form.Item
                  name="salePrice"
                  label="Sale Price"
                  rules={[
                    { required: true, message: "Please input the sale price!" },
                  ]}
                >
                  <Input placeholder="$" className="mb-4" />
                </Form.Item>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Form.Item name="discount" label="Discount">
                  <Input placeholder="%" className="mb-4" />
                </Form.Item>
                <Form.Item name="discountRange" label="Discount Range">
                  <RangePicker className="w-full" />
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
                    <img
                      src="https://i.pinimg.com/564x/02/49/98/024998a77547072bda7d81bc688be196.jpg"
                      alt="Default Product Preview"
                      className="h-full object-contain"
                    />
                  )}
                </div>
                <Form.Item label="Product Gallery">
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
