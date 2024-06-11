import React, { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Nhẫn đính hôn Kim cương",
    price: "44,520,000₫",
    image: "/path/to/product1.jpg",
  },
  {
    id: 2,
    name: "Nhẫn cưới Kim cương",
    price: "54,360,000₫",
    image: "/path/to/product2.jpg",
  },
  {
    id: 3,
    name: "Hoa tai",
    price: "66,420,000₫",
    image: "/path/to/product3.jpg",
  },
  {
    id: 4,
    name: "Nhẫn Kim cương",
    price: "41,130,000₫",
    image: "/path/to/product4.jpg",
  },
  {
    id: 5,
    name: "Nhẫn Kim cương",
    price: "37,970,000₫",
    image: "/path/to/product5.jpg",
  },
  {
    id: 6,
    name: "Hoa tai",
    price: "66,420,000₫",
    image: "/path/to/product6.jpg",
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "Nhẫn đính hôn Kim cương",
    price: "44,520,000₫",
    image: "/path/to/product1.jpg",
    code: "ENR3111W",
  },
  {
    id: 2,
    name: "Nhẫn cưới Kim cương",
    price: "54,360,000₫",
    image: "/path/to/product2.jpg",
    code: "WR163",
  },
  {
    id: 3,
    name: "Hoa tai",
    price: "66,420,000₫",
    image: "/path/to/product3.jpg",
    code: "DJE434-2",
  },
  {
    id: 4,
    name: "Nhẫn Kim cương",
    price: "41,130,000₫",
    image: "/path/to/product4.jpg",
    code: "FDR0257",
  },
  {
    id: 5,
    name: "Nhẫn Kim cương",
    price: "37,970,000₫",
    image: "/path/to/product5.jpg",
    code: "DJR397-22",
  },
  {
    id: 6,
    name: "Hoa tai",
    price: "66,420,000₫",
    image: "/path/to/product6.jpg",
    code: "DJE434-2",
  },
];

const diamondProducts = [
  {
    id: 1,
    name: "Bông tai kim cương",
    price: "42,050,000₫",
    image: "/path/to/diamond1.jpg",
    code: "AFE890208F2HM1",
  },
  {
    id: 2,
    name: "Nhẫn nữ 18K",
    price: "42,300,000₫",
    image: "/path/to/diamond2.jpg",
    code: "AFR60203603DA1",
  },
  {
    id: 3,
    name: "Hoa tai 18K",
    price: "42,820,000₫",
    image: "/path/to/diamond3.jpg",
    code: "AFEC0043802DA1",
  },
  {
    id: 4,
    name: "Mặt dây nữ 14K",
    price: "43,000,000₫",
    image: "/path/to/diamond4.jpg",
    code: "AFP001832F2HA1",
  },
  {
    id: 5,
    name: "Nhẫn nữ 14K",
    price: "43,470,000₫",
    image: "/path/to/diamond5.jpg",
    code: "AFRB000094F2HA1",
  },
];

const collections = [
  {
    id: 1,
    name: "BST TRANG SỨC KIM CƯƠNG DROP OF LIGHT",
    image: "/path/to/collection1.jpg",
    description:
      "BỘ SƯU TẬP TRANG SỨC CẮT KIM CƯƠNG SIÊU LÝ TƯỞNG 8 HEARTS & ARROWS",
  },
  {
    id: 2,
    name: "BST TRANG SỨC 14K LUCKY ME",
    image: "/path/to/collection2.jpg",
    description: "BST MỚI LUCKY ME ĐÓN VẬN MAY ĐẠI CÁT",
  },
  {
    id: 3,
    name: "BST TRANG SỨC 14K LUCKY ME",
    image: "/path/to/collection2.jpg",
    description: "BST MỚI LUCKY ME ĐÓN VẬN MAY ĐẠI CÁT",
  },
];

export default function Home() {
  const [currentProduct, setCurrentProduct] = useState(0);
  const itemsPerPageProduct = 6;

  const nextPageProduct = () => {
    if (currentProduct + itemsPerPageProduct < products.length) {
      setCurrentProduct(currentProduct + itemsPerPageProduct);
    }
  };

  const prevPageProduct = () => {
    if (currentProduct - itemsPerPageProduct >= 0) {
      setCurrentProduct(currentProduct - itemsPerPageProduct);
    }
  };
  //
  const [currentDiamondProducts, setCurrentDiamondProducts] = useState(0);
  const itemsPerPageDiamondProducts = 4;

  const nextPageDiamondProducts = () => {
    if (
      currentDiamondProducts + itemsPerPageDiamondProducts <
      diamondProducts.length
    ) {
      setCurrentDiamondProducts(
        currentDiamondProducts + itemsPerPageDiamondProducts
      );
    }
  };

  const prevPageDiamondProducts = () => {
    if (currentDiamondProducts - itemsPerPageDiamondProducts >= 0) {
      setCurrentDiamondProducts(
        currentDiamondProducts - itemsPerPageDiamondProducts
      );
    }
  };
  //
  const [currentCollection, setCurrentCollection] = useState(0);
  const itemsPerPageCollection = 2;

  const nextPageCollection = () => {
    if (currentCollection + itemsPerPageCollection < collections.length) {
      setCurrentCollection(currentCollection + itemsPerPageCollection);
    }
  };

  const prevPageCollection = () => {
    if (currentCollection - itemsPerPageCollection >= 0) {
      setCurrentCollection(currentCollection - itemsPerPageCollection);
    }
  };

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">TRANG SỨC CƯỚI</h2>
          <a href="/list-product" className="text-blue-500">
            Xem tất cả &gt;
          </a>
        </div>
        <div className="flex">
          <div className="w-1/3 pr-4">
            <img
              src="/assets/images/home-tsc.png.png"
              alt="Khuyến mãi"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-2/3 relative">
            <div className="grid grid-cols-3 gap-4">
              {products
                .slice(currentProduct, currentProduct + itemsPerPageProduct)
                .map((product) => (
                  <Link
                    to={`/product-detail/${product.id}`}
                    className="border p-4 rounded-lg transition duration-300 ease-in-out hover:scale-105"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover mb-4"
                    />
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <p className="text-red-500">{product.price}</p>
                  </Link>
                ))}
            </div>
            {currentProduct > 0 && (
              <button
                onClick={prevPageProduct}
                className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-white rounded-full p-2 shadow-lg"
              >
                <KeyboardArrowLeftIcon />
              </button>
            )}
            {currentProduct + itemsPerPageProduct < products.length && (
              <button
                onClick={nextPageProduct}
                className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-white rounded-full p-2 shadow-lg"
              >
                <KeyboardArrowRightIcon />
              </button>
            )}
          </div>
        </div>
        {/*  */}
        <div className="container mx-auto py-8">
          <h2 className="text-2xl font-bold mb-4">SẢN PHẨM NỔI BẬT</h2>
          <div className="flex justify-between">
            <div className="grid grid-cols-3 gap-4">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  className="border p-4 rounded-lg transition duration-300 ease-in-out hover:scale-105"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-500">{product.code}</p>
                  <p className="text-red-500">{product.price}</p>
                </Link>
              ))}
            </div>
            <div>
              <img
                src="/assets/images/banner-right.png.png"
                alt="Ưu Đãi"
                className="w-48 h-auto object-cover"
              />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="container mx-auto py-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">TRANG SỨC KIM CƯƠNG</h2>
            <a href="/" className="text-blue-500">
              Xem tất cả &gt;
            </a>
          </div>
          <div className="my-5">
            <img
              src="/assets/images/Link.png"
              alt="Ưu Đãi"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative">
            <div className="grid grid-cols-4 gap-4">
              {diamondProducts
                .slice(
                  currentDiamondProducts,
                  currentDiamondProducts + itemsPerPageDiamondProducts
                )
                .map((product) => (
                  <Link
                    key={product.id}
                    className="border p-4 rounded-lg transition duration-300 ease-in-out hover:scale-105"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover mb-4"
                    />
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <p className="text-gray-500">{product.code}</p>
                    <p className="text-red-500">{product.price}</p>
                  </Link>
                ))}
            </div>
            {currentDiamondProducts > 0 && (
              <button
                onClick={prevPageDiamondProducts}
                className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-white rounded-full p-2 shadow-lg"
              >
                <KeyboardArrowLeftIcon />
              </button>
            )}
            {currentDiamondProducts + itemsPerPageDiamondProducts <
              diamondProducts.length && (
              <button
                onClick={nextPageDiamondProducts}
                className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-white rounded-full p-2 shadow-lg"
              >
                <KeyboardArrowRightIcon />
              </button>
            )}
          </div>
        </div>

        {/*  */}
        <div className="container mx-auto py-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">BỘ SƯU TẬP</h2>
            <a href="/collections" className="text-blue-500">
              Xem tất cả &gt;
            </a>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {collections
                .slice(
                  currentCollection,
                  currentCollection + itemsPerPageCollection
                )
                .map((collection) => (
                  <div key={collection.id} className="border p-4 rounded-lg">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-48 object-cover mb-4"
                    />
                    <h3 className="text-lg font-bold">{collection.name}</h3>
                    <p className="text-gray-500">{collection.description}</p>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                      Chi tiết &gt;
                    </button>
                  </div>
                ))}
            </div>
            {currentCollection > 0 && (
              <button
                onClick={prevPageCollection}
                className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-white rounded-full p-2 shadow-lg"
              >
                <KeyboardArrowLeftIcon />
              </button>
            )}
            {currentCollection + itemsPerPageCollection <
              collections.length && (
              <button
                onClick={nextPageCollection}
                className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-white rounded-full p-2 shadow-lg"
              >
                <KeyboardArrowRightIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
