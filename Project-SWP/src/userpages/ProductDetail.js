import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button, InputNumber, Row, Col, Divider, Typography, Breadcrumb } from 'antd';
import { PhoneOutlined, MessageOutlined, InfoCircleOutlined } from '@ant-design/icons';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Rate, Input, Upload, Card, Badge } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/Cart/cartSlice';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function ProductDetail() {

    const [value, setValue] = useState('');

    const RelatedProducts = [
        {
            id: 1,
            name: 'Bông tai kim cương',
            code: 'AFEB902073F2HM1',
            price: '40,480,000₫',
            oldPrice: '',
            image: 'https://via.placeholder.com/150',
            badge: 'MỚI'
        },
        {
            id: 2,
            name: 'Bông tai kim cương',
            code: 'AFEB002079F2HM1',
            price: '36,828,000₫',
            oldPrice: '40,920,000₫',
            image: 'https://via.placeholder.com/150',
            badge: '-10%'
        },
        {
            id: 3,
            name: 'Nhẫn nữ 14K',
            code: 'AFRB000147F2HA1',
            price: '40,930,000₫',
            oldPrice: '',
            image: 'https://via.placeholder.com/150',
            badge: ''
        },
        {
            id: 4,
            name: 'Bông tai kim cương',
            code: 'AFEB002074F2HM1',
            price: '41,090,000₫',
            oldPrice: '',
            image: 'https://via.placeholder.com/150',
            badge: ''
        },
        {
            id: 5,
            name: 'Nhẫn nữ 18K',
            code: 'AFRB002004D2DA1',
            price: '41,110,000₫',
            oldPrice: '',
            image: 'https://via.placeholder.com/150',
            badge: ''
        },
        {
            id: 6,
            name: 'Bông tai kim cương',
            code: 'AFEB902080F2HM1',
            price: '42,050,000₫',
            oldPrice: '',
            image: 'https://via.placeholder.com/150',
            badge: 'MỚI'
        },
        {
            id: 7,
            name: 'Nhẫn nữ 18K',
            code: 'AFRB002360D3DA1',
            price: '42,300,000₫',
            oldPrice: '',
            image: 'https://via.placeholder.com/150',
            badge: ''
        },
        {
            id: 8,
            name: 'Nhẫn nữ 14K',
            code: 'AFRB000131F2HA1',
            price: '38,079,000₫',
            oldPrice: '42,310,000₫',
            image: 'https://via.placeholder.com/150',
            badge: '-10%'
        }
    ];

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        const productToSave = {
            ...product,
            price: product.price ? product.price.replace(/[^0-9]/g, '') : '0'
        };
        dispatch(addToCart({ product: productToSave }));
    };

    return (
        <div className="container mx-auto p-4">
            <div className="container mx-auto p-4">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/home" className="text-blue-500">Trang chủ</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <span className="text-gray-500">Trang sức kim cương</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="flex">
                <div className="w-1/2 p-4">
                    <img src="https://via.placeholder.com/300" alt="Product" className="w-full" />
                    <div className="flex justify-center mt-4">
                        <img src="https://via.placeholder.com/80" alt="Thumbnail" className="w-20 h-20 mx-2" />
                        <img src="https://via.placeholder.com/80" alt="Thumbnail" className="w-20 h-20 mx-2" />
                    </div>
                </div>
                <div className="w-1/2 p-4">
                    <div className="flex flex-col">
                        <Title level={3} className='w-fit'>MẶT DÂY KIM CƯƠNG AFPB000040F2HA1</Title>
                        <Text type="secondary" className="w-fit">Mã sản phẩm: AFPB000040F2HA1</Text>
                    </div>
                    <div className="flex flex-col my-2">
                        <Title level={2} className="text-red-500 w-fit ">41,454,000₫</Title>
                        <Text delete className="w-fit">46,060,000₫</Text>
                    </div>
                    <div className="flex flex-col my-2">
                        <Text className='w-fit'>Giá có thể thay đổi ty thuộc vào kích thước và trọng lượng thực tế của sản phẩm.</Text>
                        <Text className='w-fit'>Vui lòng gọi 1800 1168 để được hỗ trợ.</Text>
                    </div>
                    <div className="flex flex-col items-start my-2">
                        <Text strong className='w-fit'><CheckCircleIcon className='text-green-500' /> CÒN 5 SẢN PHẨM</Text>
                    </div>
                    <div className="flex flex-col items-start my-2">
                        <Text strong className="w-fit"><FavoriteIcon className="text-red-500" /> YÊU THÍCH SẢN PHẨM</Text>
                    </div>
                    <div className="flex flex-col items-start my-2">
                        <Text strong className="w-fit"><ShoppingBagIcon className="text-blue-500" /> MUA SAU</Text>
                    </div>
                    <div className="my-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <Text>Số lượng:</Text>
                            <InputNumber min={1} max={10} defaultValue={1} className="ml-2" />
                        </div>
                        <a href="/size-guide" className="text-blue-500">Hướng dẫn đo size →</a>
                    </div>

                    <div className="my-4 flex items-center justify-between">
                        <Link to="/payment-method" className="w-full mr-2"><Button type="primary" className="w-full">MUA NGAY</Button></Link>
                        <Button onClick={() => handleAddToCart(RelatedProducts)} className="w-full ml-2">THÊM VÔ GIỎ HÀNG</Button>
                    </div>
                    <div className="my-4 flex items-center justify-between">
                        <Link to="/hotline" className="w-full mr-2"><Button icon={<PhoneOutlined />} className="w-full">HOTLINE: 1800 1168</Button></Link>
                        <Button icon={<MessageOutlined />} className="ml-2 w-full">CHAT VỚI TƯ VẤN VIÊN</Button>
                    </div>
                </div>
            </div>
            <Divider />
            <Title level={4} className='w-fit'>CHI TIẾT SẢN PHẨM</Title>
            <Row gutter={16}>
                <Col span={16}>

                    <div className='w-fit'>
                        <p className='w-fit'><Text strong >Loại sản phẩm:/</Text> Mặt dây</p>
                        <p className='w-fit'><Text strong >Màu:</Text> Vàng trắng</p>
                    </div>
                    <Divider />
                    <div>
                        <div className='w-fit'>
                            <p className='w-fit'><Text strong>Hình dáng:</Text> Round</p>
                            <p className='w-fit'><Text strong>Chế tác: Button <InfoCircleOutlined className="text-red-500" /> </Text> Excellent</p>
                            <p className='w-fit'><Text strong>Độ tinh khiết: Button <InfoCircleOutlined className="text-red-500" /></Text> VS2</p>
                            <p className='w-fit'><Text strong>Độ bóng:Button <InfoCircleOutlined className="text-red-500" /></Text> EX</p>

                            <p className='w-fit'><Text strong>Thắt lưng:</Text> Medium, Faceted, 3.0%</p>
                            <p className='w-fit'><Text strong>Phát quang: Button <InfoCircleOutlined className="text-red-500" /></Text> FNT</p>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className='w-fit'>
                        <p className='w-fit'><Text strong>Đá chính:</Text> Kim cương 8 Hearts & 8 Arrows</p>
                        <p className='w-fit'><Text strong>Chất liệu:</Text> Vàng 14k</p>
                    </div>
                    <Divider />
                    <div className='w-fit'>
                        <p className='w-fit'><Text strong>Trọng lượng (cts): Button <InfoCircleOutlined className="text-red-500" /></Text> 0.46</p>
                        <p className='w-fit'><Text strong>Cấp màu:Button <InfoCircleOutlined className="text-red-500" /></Text> D</p>
                        <p className='w-fit'><Text strong>Kiểm định:</Text> GIA</p>
                        <p className='w-fit'><Text strong>Kích thước (mm): Button <InfoCircleOutlined className="text-red-500" /></Text> 4.4</p>
                        <p className='w-fit'><Text strong>Tim đáy:</Text> None</p>
                        <p className='w-fit'><Text strong>Độ đối xứng: Button <InfoCircleOutlined className="text-red-500" /></Text> EX</p>
                    </div>
                </Col>
            </Row>
            <Divider />
            <div className="container mx-auto">
                <Title level={4} className='w-fit'>ĐÁNH GIÁ</Title>

                <div className="my-4 flex items-start justify-start space-x-2">
                    <p>Chọn đánh giá của bạn</p>
                    <Rate />
                </div>
                <Row gutter={[16, 16]}>
                    <div className="my-4 flex items-start justify-start space-x-2">
                        <Col span={24} className="w-4" style={{ position: 'relative' }}>
                            <TextArea
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Viết đánh giá của bạn..."
                                autoSize={{ minRows: 4, maxRows: 4 }}

                            />
                            <Upload style={{ position: 'absolute', bottom: 8, left: 8 }}>
                                <Button icon={<CameraOutlined />} type="link" style={{ color: 'red' }}>Đính kèm ảnh</Button>
                            </Upload>
                        </Col>

                        <Col span={12}>
                            <Input placeholder="Họ và tên *" className='mb-4' />
                            <Input placeholder="Điện thoại *" className='mt-4' />
                        </Col>
                        <Col span={12}>
                            <Input placeholder="Email *" className='mb-4' />
                            <Button type="primary" className="w-full mt-4">GỬI ĐÁNH GIÁ</Button>
                        </Col>
                    </div>
                </Row>
                <Divider />
                <div className="container mx-auto">
                    <Title level={4} className='w-fit'>BÌNH LUẬN</Title>
                    <Divider />
                    <div className="container mx-auto">
                        <Title level={4}>SẢN PHẨM CÙNG LOẠI</Title>
                        <Row gutter={[16, 16]}>
                            {RelatedProducts.map((product) => (
                                <Col span={6} key={product.id}>
                                    <Badge.Ribbon text={product.badge} color={product.badge === 'MỚI' ? 'red' : 'volcano'}>
                                        <Card
                                            hoverable
                                            cover={<img alt={product.name} src={product.image} />}
                                        >
                                            <Card.Meta
                                                title={product.name}
                                                description={product.code}
                                            />
                                            <div className="mt-2">
                                                <Text strong style={{ color: 'red' }}>{product.price}</Text>
                                                {product.oldPrice && (
                                                    <Text delete className="ml-2">{product.oldPrice}</Text>
                                                )}
                                            </div>
                                        </Card>
                                    </Badge.Ribbon>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
}
