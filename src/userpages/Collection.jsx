// Collection.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, List } from "antd";
import CollectionApi from "../api/CollectionAPI";

const Collection = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await CollectionApi.getAllCollections();
        setCollections(response.data.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  const handleCollectionClick = async (collectionId) => {
    try {
      const response = await CollectionApi.getProduct(collectionId);
      setSelectedCollection(collectionId);
      setProducts(response.data.data); // Adjust based on your API response structure
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Collections</h2>
      {collections.length === 0 ? (
        <p className="text-center">Loading collections...</p>
      ) : (
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={collections}
          renderItem={(collection) => (
            <List.Item>
              <Card
                title={collection.collectionName}
                bordered={false}
                className="cursor-pointer"
                onClick={() => handleCollectionClick(collection.collectionId)}
              >
                <p>{collection.description}</p>
              </Card>
            </List.Item>
          )}
        />
      )}
      {selectedCollection && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Products in Collection</h3>
          {products.length === 0 ? (
            <p className="text-center">
              No products found for this collection.
            </p>
          ) : (
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={products}
              renderItem={(product) => (
                <List.Item>
                  <Link to={`/product-detail/${product.productId}`}>
                    <Card
                      cover={
                        <img
                          alt={product.productName}
                          src={product.url || "placeholder_image_url"}
                        />
                      }
                    >
                      <Card.Meta
                        title={product.productName}
                        description={product.description}
                      />
                      <p>Price: ${product.price}</p>
                    </Card>
                  </Link>
                </List.Item>
              )}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Collection;
