import React from 'react';
import '../styles/tailwind.css';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import ZaloIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Input } from 'antd';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-orange-100 border-t border-gray-200 mt-auto w-full">
            <div className="container mx-auto py-8 w-full">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 self-end">
                        <LocalPhoneIcon className="text-red-500" />
                        <span className="font-bold">HOTLINE: 18001168</span>
                    </div>
                    <div className="flex justify-center">
                        <img src="/assets/images/Song long diamond.png" alt="Song Long Diamond" className="mx-auto max-w-xs" />
                    </div>
                    <div className="flex items-center space-x-2 self-end">
                        <LocationOnIcon className="text-red-500" />
                        <span>HỆ THỐNG PHÂN PHỐI</span>
                    </div>
                </div>

                <div className="border-t border-gray-300 my-8 w-full"></div>

                <div className="grid grid-cols-5 gap-4 w-full">
                    <div className="text-left">
                        <h3 className="font-bold flex items-center mb-8">
                            LIÊN HỆ
                        </h3>
                        <p>Địa chỉ: NVHSV TPHCM</p>
                        <p>Điện thoại: 1800 1168</p>
                        <p>Email: fptuni@fpt.edu.vn</p>
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold flex items-center mb-8">
                            VỀ CHÚNG TÔI
                        </h3>
                        <p>Dịch vụ khách hàng</p>
                        <p>Kinh doanh bán sỉ</p>
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold flex items-center mb-8">
                            DỊCH VỤ KHÁCH HÀNG
                        </h3>
                        <p>Hướng dẫn đặt hàng</p>
                        <p>Phương thức thanh toán</p>
                        <p>Chính sách & bảo hành</p>
                        <p>Cam kết chất lượng</p>
                        <p>Điều khoản mua bán</p>
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold flex items-center mb-8">
                            TIN TỨC
                        </h3>
                        <p>Tin khuyến mãi</p>
                        <p>Tin trang sức</p>
                        <p>Video</p>
                        <p>Blog</p>
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold flex items-center">
                            ĐĂNG KÝ NHẬN BẢN TIN
                        </h3>
                        <div className="flex items-center p-2 w-full">
                            <Input type="email" placeholder="Nhập email..." className="flex-grow outline-none" />
                            <PlayCircleIcon className="text-red-500 ml-2 cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div className="- my-8 w-full"></div>

                <div className="flex flex-col items-center">
                    <button className="bg-red-500 text-white py-2 px-4 rounded-full mb-4">
                        KẾT NỐI VỚI CHÚNG TÔI
                    </button>
                    <div className="flex justify-between space-x-4 w-full">
                        <a href="facebook" className="flex items-center space-x-1">
                            <FacebookIcon />
                            <span>Song Long</span>
                        </a>
                        <a href="youtube" className="flex items-center space-x-1">
                            <YouTubeIcon />
                            <span>Youtube</span>
                        </a>
                        <a href="instagram" className="flex items-center space-x-1">
                            <InstagramIcon />
                            <span>Instagram</span>
                        </a>
                        <a href="zalo" className="flex items-center space-x-1">
                            <ZaloIcon />
                            <span>Zalo</span>
                        </a>
                    </div>

                </div>
                <div className="border-t border-gray-300 my-8 w-full"></div>

                <div className="flex justify-between items-center">
                    <p className="text-gray-600">Copyright 2024 © FPT Gold & Gems Group</p>
                    <button onClick={scrollToTop} className="text-red-500 flex items-center">
                        <ArrowCircleUpIcon className="text-3xl" /> Về Đầu Trang
                    </button>
                </div>

            </div>
        </footer>
    );
}
