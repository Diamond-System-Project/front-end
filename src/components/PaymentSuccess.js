import React from 'react';
import { Button, Divider } from 'antd';
import { Card } from "antd";
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
export default function PaymentSuccess() {

    return (
        <div className="flex justify-center p-4">
            <div className="w-5/6 flex">
                <div className="w-1/2 h-3/4 p-4 bg-white shadow-lg rounded-lg mr-4">
                    <img src="/assets/images/Song long diamond.png" alt='Song long Diamond' className="w-50 m-2" />
                    <div className="w-fit mx-20">
                        <h2 className='w-fit'>Đặt hàng thành công</h2>
                        <p className='w-fit'>Mã đơn hàng #103448</p>
                        <p className='w-fit'>Cảm ơn bạn đã mua hàng!</p>
                    </div>
                    <div className="min-h-screen flex justify-center p-4">
                        <Card className="w-5/6 h-fit p-4 bg-white shadow-lg rounded-lg">
                            <div className='w-fit'>
                                <div className='w-[450px]'>
                                    <CheckCircleOutlineTwoToneIcon sx={{ fontSize: 50, color: "green" }} />
                                </div>
                                <h3 className='w-fit'>Thông tin đơn hàng</h3>
                                <p className='w-fit'><strong>Thông tin giao hàng</strong></p>
                                <p className='w-fit'>Trần Công Danh</p>
                                <p className='w-fit'>0379750637</p>
                                <p className='w-fit'>220/9 đường số Nguyễn Văn Khối Phường 9</p>
                                <p className='w-fit'>Quận Gò Vấp</p>
                                <p className='w-fit'>Hồ Chí Minh</p>
                                <p className='w-fit'>Vietnam</p>
                            </div>
                            <Divider />
                            <div className='w-fit'>
                                <p className='w-fit'><strong>Phương thức thanh toán</strong></p>
                                <p className='w-fit'>Thanh toán khi giao hàng (COD)</p>
                            </div>
                            <Divider />
                            <div className="flex justify-between items-center">
                                <a href="/help">Cần hỗ trợ? Liên hệ chúng tôi</a>
                                <Button type="primary">Tiếp tục mua hàng</Button>
                            </div>
                        </Card>

                    </div>

                </div>
                <Card className="w-1/2 h-3/4 ml-4">
                    <div className="flex justify-between items-center mb-2">
                        <img src="https://via.placeholder.com/50" alt="Product" className="w-16 h-16" />
                        <div className="flex-1 ml-4">
                            <p className="w-44">Kim cương viên LUCKY STAR 4.4ly H VS1 EX M2B47001</p>
                            <p className="text-gray-500 w-20">H / VS1 / EX</p>
                        </div>
                        <p>27,034,000₫</p>
                    </div>
                    <div className="border-b my-4"></div>
                    <div className="flex justify-between mb-2">
                        <p>Tạm tính</p>
                        <p>27,034,000₫</p>
                    </div>
                    <div className="flex justify-between mb-2">
                        <p>Phí vận chuyển</p>
                        <p>-</p>
                    </div>
                    <div className="border-b my-4"></div>
                    <div className="flex justify-between mb-2">
                        <p className='text-xl font-bold'>Tổng cộng</p>
                        <p className='text-xl font-bold'>27,034,000₫</p>
                    </div>
                </Card>
            </div >
        </div >
    );
}
