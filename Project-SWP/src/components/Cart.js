import React, { useState } from 'react';
import { Button, Divider, InputNumber } from 'antd';
import { Typography, TextField } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../features/Cart/cartSlice';

export default function Cart() {
    const dispatch = useDispatch();

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart({ id }));
    };

    const [quantity, setQuantity] = useState(1);
    const price = 46060000;
    const discount = 4606000;

    const handleQuantityChange = (value) => {
        setQuantity(value);
    };

    const totalPrice = price * quantity;
    const finalPrice = totalPrice - discount;

    const cartItems = [
        {
            id: 1,
            name: "MẶT DÂY KIM CƯƠNG AFPB000040F2HA1",
            code: "AFPB000040F2HA1",
            image: "https://via.placeholder.com/144",
            price: 46060000,
            quantity: quantity,
        },
        {
            id: 2,
            name: "MẶT DÂY KIM CƯƠNG AFPB000040F2HA1",
            code: "AFPB000040F2HA1",
            image: "https://via.placeholder.com/144",
            price: 46060000,
            quantity: quantity,
        },
        {
            id: 3,
            name: "MẶT DÂY KIM CƯƠNG AFPB000040F2HA1",
            code: "AFPB000040F2HA1",
            image: "https://via.placeholder.com/144",
            price: 46060000,
            quantity: quantity,
        },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="cart p-4 bg-white shadow-lg rounded-lg w-3/4">
                <nav className="mb-4">
                    <ol className="list-reset flex text-gray-700 ml-2">
                        <li><a href="/" className="text-blue-500">Trang Chủ</a></li>
                        <li><span className="mx-2"><KeyboardArrowRightIcon /></span></li>
                        <li><a href="/checkout" className="text-gray-500">Giỏ Hàng</a></li>
                    </ol>
                </nav>
                <div className="flex justify-between items-center mb-4">
                    <Typography variant="h5">GIỎ HÀNG ({cartItems.length} sản phẩm)</Typography>
                    <Button type="link">TIẾP TỤC MUA HÀNG</Button>
                </div>
                {cartItems.length > 0 ? (
                    <div className='flex justify-between'>
                        <div className="cart-item flex mb-4">
                            <img src={cartItems[0].image} alt={cartItems[0].name} className="w-36 h-36" />
                            <div className="item-details ml-4">
                                <Typography variant="h6">{cartItems[0].name}</Typography>
                                <Typography variant="body2" className='w-fit'>MSP: {cartItems[0].code}</Typography>
                                <div className="quantity flex items-center my-2">
                                    <Typography variant="body2" className="mr-2">Số lượng: </Typography>
                                    <InputNumber min={1} value={quantity} onChange={handleQuantityChange} className='ml-1 w-14' />
                                </div>
                                <div className="flex mt-2">
                                    <Button onClick={() => handleRemoveFromCart(cartItems[0].id)}>Xóa</Button>
                                </div>
                            </div>
                        </div>

                        <div className="summary w-1/3">
                            <Typography variant="h6" className="mb-2 w-fit">Tổng tiền</Typography>
                            <Divider />
                            <div className="flex justify-between">
                                <Typography variant="body2">Tạm tính:</Typography>
                                <Typography variant="body2">{totalPrice.toLocaleString()}đ</Typography>
                            </div>
                            <Divider />
                            <div className="flex justify-between">
                                <Typography variant="body2">Giảm giá:</Typography>
                                <Typography variant="body2">{discount.toLocaleString()}đ</Typography>
                            </div>
                            <Divider />
                            <div className="flex justify-between">
                                <Typography variant="body2">Vận chuyển:</Typography>
                                <Typography variant="body2">Miễn phí vận chuyển</Typography>
                            </div>
                            <Divider />
                            <div className="flex justify-between">
                                <Typography variant="body2">Thành tiền:</Typography>
                                <Typography variant="body2">{finalPrice.toLocaleString()}đ</Typography>
                            </div>
                            <div className="flex justify-between items-center my-4">
                                <TextField
                                    label="Mã giảm giá/Quà tặng"
                                    variant="outlined"
                                    size="small"
                                    className="w-3/4"
                                />
                                <Button className="w-28 p-2 bg-blue-500 rounded h-10 text-white">Áp dụng</Button>
                            </div>
                            <Button type="primary" className="w-full mt-2 bg-blue-500 h-[50px]">TIẾN HÀNH ĐẶT HÀNG</Button>
                        </div>
                    </div>
                ) : (
                    <div className='h-[50vh]'>
                        <Typography variant="h6" className="my-10">Giỏ hàng không có sản phẩm</Typography>
                        <Button type="primary" className="w-fit my-10 bg-red-500 h-[50px]">Tiếp tục mua hàng</Button>
                    </div>

                )}
            </div>
        </div >
    );
}

