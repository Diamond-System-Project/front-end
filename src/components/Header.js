import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/tailwind.css';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Divider } from 'antd';
export default function Header() {
    return (
        <>
            <header className="w-full bg-white border-b border-gray-200">
                <div className="flex justify-between items-center p-4 bg-orange-300 text-sm">
                    <div className="flex space-x-20 mx-10">
                        <span> <CorporateFareIcon /> VỀ TRANG SỨC SONG LONG</span>
                        <span> <LocationOnIcon /> HỆ THỐNG PHÂN PHỐI</span>
                        <span> <LocalPhoneIcon /> 18001168</span>
                    </div>
                    <div className="flex space-x-20 mx-10">
                        <Link to="/login" className="flex items-center space-x-1">
                            <AccountCircleIcon />
                            <span>TÀI KHOẢN</span>
                        </Link>
                        <Link to="/cart" className="flex items-center space-x-1">
                            <LocalMallIcon />
                            <span>GIỎ HÀNG (0)</span>
                        </Link>
                    </div>
                </div>
                <div className="text-center py-4">
                    <Link to="/"><img src="/assets/images/Song long diamond.png" alt="Song Long Diamond" className="mx-auto max-w-xs" /></Link>
                </div>
                <Divider />
                <nav className="flex justify-center items-center space-x-10 mb-6 bg-white-100 w-full">
                    <a href="/trang-suc" className="text-black">TRANG SỨC</a>
                    <a href="/trang-suc-cuoi" className="text-black">TRANG SỨC CƯỚI</a>
                    <a href="/qua-tang" className="text-black">QUÀ TẶNG</a>
                    <a href="/bo-suu-tap" className="text-black">BỘ SƯU TẬP MỚI</a>
                    <a href="/discount" className="text-red-600">KHUYẾN MÃI</a>
                    <a href="/news" className="text-black">TIN TỨC</a>
                </nav>
            </header>
        </>
    );
}
