import React, { useState, useEffect } from 'react';
import { Table, Typography, Space, Tag } from 'antd';
import PromotionAPI from '../api/PromotionAPI';

const { Title } = Typography;

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const response = await PromotionAPI.getAll();
      console.log('API response:', response);
      if (response.success && Array.isArray(response.data)) {
        setPromotions(response.data);
      } else {
        console.error('Dữ liệu không hợp lệ:', response);
        setError('Dữ liệu không hợp lệ');
      }
    } catch (err) {
      console.error('Lỗi khi tải danh sách khuyến mãi:', err);
      setError('Có lỗi xảy ra khi tải danh sách khuyến mãi');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'promotionId',
      key: 'promotionId',
    },
    {
      title: 'Tên khuyến mãi',
      dataIndex: 'promotionName',
      key: 'promotionName',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
  ];

  if (error) return <Typography.Text type="danger">{error}</Typography.Text>;

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Danh sách Khuyến mãi</Title>
      <Table
        columns={columns}
        dataSource={promotions}
        rowKey="promotionId"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </Space>
  );
};

export default Promotions;