import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Divider, Dropdown, Menu } from "antd";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const cartSize = useSelector((state) => state.cart.items.length);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  // const userId = localStorage.getItem("userId");
  const fullName = localStorage.getItem("fullName");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
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
            <Link
              to="/"
              className="hover:text-red-500 transition-colors duration-300"
            >
              <span className="flex items-center space-x-1">
                <CorporateFareIcon className="text-yellow-500" />
                <span>VỀ TRANG SỨC SONG LONG</span>
              </span>
            </Link>
            <a
              href="https://thegioikimcuong.vn/pages/destination/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-red-500 transition-colors duration-300 cursor-pointer"
            >
              <LocationOnIcon className="text-red-500" />
              <span>HỆ THỐNG PHÂN PHỐI</span>
            </a>
            <span className="hover:text-red-500 transition-colors duration-300 cursor-pointer">
              <LocalPhoneIcon className="text-green-500" /> 0948704134
            </span>
          </div>
          <div className="flex space-x-20 mx-10">
            <Link
              to="/order-history"
              className="flex items-center space-x-1 hover:text-red-500 transition-colors duration-300"
            >
              <LocalMallIcon />
              <span>ĐƠN HÀNG</span>
            </Link>
            {token ? (
              <Dropdown
                overlay={menu}
                visible={dropdownVisible}
                onVisibleChange={(visible) => setDropdownVisible(visible)}
              >
                <span className="flex items-center space-x-1 cursor-pointer hover:text-red-500 transition-colors duration-300">
                  <AccountCircleIcon />
                  <span>{fullName}</span>
                </span>
              </Dropdown>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 hover:text-red-500 transition-colors duration-300"
              >
                <AccountCircleIcon />
                <span>ĐĂNG NHẬP</span>
              </Link>
            )}
            <Link
              to="/cart"
              className="flex items-center space-x-1 hover:text-red-500 transition-colors duration-300"
            >
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
          <NavLink
            to="/list-product"
            className={({ isActive }) =>
              `text-black hover:text-red-500 transition-colors duration-300 pb-2 border-b-2 ${
                isActive ? "border-red-500" : "border-transparent"
              }`
            }
          >
            TRANG SỨC
          </NavLink>

          <NavLink
            to="/quotation"
            className={({ isActive }) =>
              `text-black hover:text-red-500 transition-colors duration-300 pb-2 border-b-2 ${
                isActive ? "border-red-500" : "border-transparent"
              }`
            }
          >
            BẢNG GIÁ
          </NavLink>

          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `text-black hover:text-red-500 transition-colors duration-300 pb-2 border-b-2 ${
                isActive ? "border-red-500" : "border-transparent"
              }`
            }
          >
            BỘ SƯU TẬP MỚI
          </NavLink>

          <NavLink
            to="/promotions"
            className={({ isActive }) =>
              `text-black hover:text-red-500 transition-colors duration-300 pb-2 border-b-2 ${
                isActive ? "border-red-500" : "border-transparent"
              }`
            }
          >
            KHUYẾN MÃI
          </NavLink>

          <NavLink
            to="/knowledge"
            className={({ isActive }) =>
              `text-black hover:text-red-500 transition-colors duration-300 pb-2 border-b-2 ${
                isActive ? "border-red-500" : "border-transparent"
              }`
            }
          >
            KIẾN THỨC
          </NavLink>
        </nav>
      </header>
    </>
  );
}
