import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Collapse,
  List,
  message,
  Select,
} from "antd";
import CollectionAPI from "../api/CollectionAPI";
import ProductAPI from "../api/ProductAPI";

const Collection = () => {
  const [collections, setCollections] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await CollectionAPI.getAllCollections();
      console.log(response.data); // Log the response data
      setCollections(
        response.data.data.map((collection) => ({
          ...collection,
          products: [],
        }))
      ); // Ensure products property exists
    } catch (error) {
      message.error("Failed to fetch collections");
    }
  };

  const fetchProducts = async (collectionId) => {
    try {
      const response = await CollectionAPI.getProduct(collectionId);
      return response.data.data; // Return the list of products
    } catch (error) {
      message.error("Failed to fetch products");
      return [];
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await ProductAPI.products();
      setAllProducts(response.data.data);
    } catch (error) {
      message.error("Failed to fetch all products");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showProductModal = async (collection) => {
    setEditingCollection(collection);
    await fetchAllProducts();
    setAvailableProducts(
      allProducts.filter(
        (product) =>
          !collection.products.some((p) => p.productId === product.productId)
      )
    );
    setIsProductModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCollection(null);
  };

  const handleProductCancel = () => {
    setIsProductModalVisible(false);
  };

  const handleFinish = async (values) => {
    if (editingCollection) {
      // Update collection
      try {
        const updatedData = {
          name: values.collectionName,
          description: values.description,
        };
        await CollectionAPI.updateCollection(
          editingCollection.collectionId,
          updatedData
        );
        setCollections((prev) =>
          prev.map((col) =>
            col.collectionId === editingCollection.collectionId
              ? { ...col, ...updatedData }
              : col
          )
        );
        message.success("Collection updated successfully");
      } catch (error) {
        message.error("Failed to update collection");
      }
    } else {
      // Create new collection
      try {
        const newCollection = {
          name: values.collectionName,
          description: values.description,
        };
        const response = await CollectionAPI.createCollection(newCollection);
        setCollections([...collections, { ...response.data, products: [] }]);
        message.success("Collection created successfully");
      } catch (error) {
        message.error("Failed to create collection");
      }
    }
    setIsModalVisible(false);
    setEditingCollection(null);
  };

  const handleProductFinish = async (values) => {
    if (!editingCollection) {
      message.error("No collection selected for adding a product");
      return;
    }

    const newProduct = allProducts.find(
      (p) => p.productId === values.productId
    );

    try {
      await CollectionAPI.addProductToCollection({
        collectionId: editingCollection.collectionId,
        productIds: [newProduct.productId],
      });
      setCollections((prev) =>
        prev.map((col) =>
          col.collectionId === editingCollection.collectionId
            ? { ...col, products: [...col.products, newProduct] }
            : col
        )
      );
      message.success("Product added successfully");
    } catch (error) {
      message.error("Failed to add product");
    }
    setIsProductModalVisible(false);
  };

  const handleEdit = (record) => {
    setEditingCollection(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (collectionId) => {
    try {
      await CollectionAPI.deleteCollection(collectionId);
      setCollections((prev) =>
        prev.filter((col) => col.collectionId !== collectionId)
      );
      message.success("Collection deleted successfully");
    } catch (error) {
      message.error("Failed to delete collection");
    }
  };

  const handleDeleteProduct = async (collectionId, productId) => {
    console.log("Deleting product from collection", {
      collectionId,
      productIds: [productId],
    });
    try {
      const response = await CollectionAPI.deleteProduct({
        collectionId,
        productIds: [productId], // Send an array of product IDs
      });
      if (response.data.success) {
        setCollections((prev) =>
          prev.map((col) =>
            col.collectionId === collectionId
              ? {
                  ...col,
                  products: col.products.filter(
                    (product) => product.productId !== productId
                  ),
                }
              : col
          )
        );
        message.success("Product deleted successfully");
      }
    } catch (error) {
      message.error("Failed to delete product");
    }
  };

  const handleExpand = async (expanded, record) => {
    if (expanded) {
      const products = await fetchProducts(record.collectionId);
      setCollections((prev) =>
        prev.map((col) =>
          col.collectionId === record.collectionId
            ? { ...col, products: products }
            : col
        )
      );
    }
  };

  const columns = [
    { title: "ID", dataIndex: "collectionId", key: "collectionId" },
    { title: "Name", dataIndex: "collectionName", key: "collectionName" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record.collectionId)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between w-full p-6">
        <h1 className="text-2xl font-bold">Collection</h1>
        <Button type="primary" onClick={showModal}>
          Add Collection
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={collections}
        rowKey="collectionId"
        expandable={{
          expandedRowRender: (record) => (
            <Collapse>
              <Collapse.Panel header="Products" key="1">
                <List
                  dataSource={record.products}
                  renderItem={(product) => (
                    <List.Item
                      key={product.productId} // Ensure this is productId, not productid
                      actions={[
                        <Button
                          key="delete"
                          type="link"
                          danger
                          onClick={() =>
                            handleDeleteProduct(
                              record.collectionId,
                              product.productId
                            )
                          } // Ensure this is productId, not productid
                        >
                          Delete
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <img
                            src={product.productImage}
                            alt={product.productName}
                            style={{ width: 50, height: 50 }}
                          />
                        }
                        title={product.productName}
                        description={`Price: $${product.price}`}
                      />
                    </List.Item>
                  )}
                />
                <Button
                  type="dashed"
                  onClick={() => showProductModal(record)}
                  style={{ width: "100%", marginTop: 16 }}
                >
                  + Add Product
                </Button>
              </Collapse.Panel>
            </Collapse>
          ),
          onExpand: handleExpand,
        }}
      />
      <Modal
        title={editingCollection ? "Edit Collection" : "Add Collection"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={
            editingCollection || { collectionName: "", description: "" }
          }
          onFinish={handleFinish}
        >
          <Form.Item
            name="collectionName"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingCollection ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add Product"
        visible={isProductModalVisible}
        onCancel={handleProductCancel}
        footer={null}
      >
        <Form
          initialValues={{
            productId: "",
          }}
          onFinish={handleProductFinish}
        >
          <Form.Item
            name="productId"
            label="Select Product"
            rules={[{ required: true, message: "Please select a product!" }]}
          >
            <Select placeholder="Select a product">
              {availableProducts.map((product) => (
                <Select.Option
                  key={product.productId}
                  value={product.productId}
                >
                  {product.productName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Collection;
