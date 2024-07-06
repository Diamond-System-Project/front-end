import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Divider, Dropdown, Menu } from "antd";

export default function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const cartSize = useSelector((state) => state.cart.items.length);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  // const fullName = localStorage.getItem("fullName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <header className="w-full bg-white border-b">
        <div className="flex justify-between items-center p-4 text-sm bg-pink-100">
          <div className="flex space-x-20 mx-10">
            <span>
              <CorporateFareIcon /> VỀ TRANG SỨC SONG LONG
            </span>
            <span>
              <LocationOnIcon /> HỆ THỐNG PHÂN PHỐI
            </span>
            <span>
              <LocalPhoneIcon /> 18001168
            </span>
          </div>
          <div className="flex space-x-20 mx-10">
            <Link to="/order-history" className="flex items-center space-x-1">
              <LocalMallIcon />
              <span>ĐƠN HÀNG</span>
            </Link>
            {token ? (
              <Dropdown
                overlay={menu}
                visible={dropdownVisible}
                onVisibleChange={(visible) => setDropdownVisible(visible)}
              >
                <span className="flex items-center space-x-1 cursor-pointer">
                  <AccountCircleIcon />
                  <span>{userId}</span>
                  {/* <span>{fullName}</span> */}
                </span>
              </Dropdown>
            ) : (
              <Link to="/login" className="flex items-center space-x-1">
                <AccountCircleIcon />
                <span>ĐĂNG NHẬP</span>
              </Link>
            )}
            <Link to="/cart" className="flex items-center space-x-1">
              <LocalMallIcon />
              <span>GIỎ HÀNG ({cartSize})</span>
            </Link>
          </div>
        </div>
        <div className="text-center py-4">
          <Link to="/">
            <img
              src="src/assets/images/Songlong.png"
              alt="Song Long Diamond"
              className="mx-auto max-w-xs"
            />
          </Link>
        </div>
        <Divider />
        <nav className="flex justify-center items-center space-x-10 mb-6 bg-white-100 w-full">
          <Link to="/list-product" className="text-black">
            TRANG SỨC
          </Link>
          <Link to="/trang-suc-cuoi" className="text-black">
            TRANG SỨC CƯỚI
          </Link>
          <Link to="/bang-gia" className="text-black">
            BẢNG GIÁ
          </Link>
          <Link to="/bo-suu-tap" className="text-black">
            BỘ SƯU TẬP MỚI
          </Link>
          <Link to="/promotions" className="text-black">
            KHUYẾN MÃI
          </Link>
          <Link to="/knowledge" className="text-black">
            KIẾN THỨC
          </Link>
        </nav>
      </header>
    </>
  );
}
