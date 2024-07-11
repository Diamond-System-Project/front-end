import { useState, useEffect } from "react";
import { Table, Spin, message } from "antd";
import DiamondMountAPI from "../api/DiamondMountAPI";

export default function ListDiamondMount() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiamondMounts = async () => {
      try {
        const response = await DiamondMountAPI.getAllDiamondMounts();
        setDataSource(response.data); // Adjust this if response structure is different
        setLoading(false);
      } catch (error) {
        message.error("Failed to fetch diamond mounts.");
        setLoading(false);
      }
    };

    fetchDiamondMounts();
  }, []);

  const columns = [
    {
      title: "Mount Name",
      dataIndex: "mountName",
      key: "mountName",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
    },
    {
      title: "Base Price",
      dataIndex: "basePrice",
      key: "basePrice",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">List Diamond Mount</h1>
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <Table dataSource={dataSource} columns={columns} rowKey="mountId" />
      )}
    </div>
  );
}
