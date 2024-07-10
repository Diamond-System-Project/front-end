import { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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

  const [isNextProductActive, setIsNextProductActive] = useState(false);
  const [isNextDiamondActive, setIsNextDiamondActive] = useState(false);
  const [isNextCollectionActive, setIsNextCollectionActive] = useState(false);

  const nextPageProduct = () => {
    if (currentProduct + itemsPerPageProduct < products.length) {
      setCurrentProduct(currentProduct + itemsPerPageProduct);
      setIsNextProductActive(true);
      setTimeout(() => setIsNextProductActive(false), 500);
    }
  };

  const navigate = useNavigate();

  const handleNavigateToCollections = () => {
    navigate('/collection');
  };
  const handleNavigateToDiamond = () => {
    navigate('/list-product');
  };

  

  const prevPageProduct = () => {
    if (currentProduct - itemsPerPageProduct >= 0) {
      setCurrentProduct(currentProduct - itemsPerPageProduct);
    }
  };

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
      setIsNextDiamondActive(true);
      setTimeout(() => setIsNextDiamondActive(false), 300);
    }
  };

  const prevPageDiamondProducts = () => {
    if (currentDiamondProducts - itemsPerPageDiamondProducts >= 0) {
      setCurrentDiamondProducts(
        currentDiamondProducts - itemsPerPageDiamondProducts
      );
    }
  };

  const [currentCollection, setCurrentCollection] = useState(0);
  const itemsPerPageCollection = 2;

  const nextPageCollection = () => {
    if (currentCollection + itemsPerPageCollection < collections.length) {
      setCurrentCollection(currentCollection + itemsPerPageCollection);
      setIsNextCollectionActive(true);
      setTimeout(() => setIsNextCollectionActive(false), 300);
    }
  };

  const prevPageCollection = () => {
    if (currentCollection - itemsPerPageCollection >= 0) {
      setCurrentCollection(currentCollection - itemsPerPageCollection);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <section className="bg-white rounded-lg shadow-md p-6 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">TRANG SỨC CƯỚI</h2>
            <button
              onClick={handleNavigateToDiamond}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Xem tất cả &gt;
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <img
                src="https://file.hstatic.net/1000381168/file/z5534076148156_f2cbfd8394021ce05ed5b345fee70777_b0ee26082bff414680f27699e8f6d6f6.jpg"
                alt="Khuyến mãi"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-2/3 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .slice(currentProduct, currentProduct + itemsPerPageProduct)
                  .map((product) => (
                    <Link
                      key={product.id}
                      to={`/product-detail/${product.id}`}
                      className="bg-white border border-gray-200 p-4 rounded-lg transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover mb-4 rounded"
                      />
                      <h3 className="text-lg font-bold text-gray-800">
                        {product.name}
                      </h3>
                      <p className="text-red-500 font-semibold">
                        {product.price}
                      </p>
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
                  className={`absolute top-1/2 transform -translate-y-1/2 right-0 rounded-full p-2 shadow-lg transition-all duration-500 ease-in-out ${
                    isNextProductActive
                      ? "bg-black text-white scale-110"
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                >
                  <KeyboardArrowRightIcon
                    className={`transition-colors duration-500 ${
                      isNextProductActive ? "text-white" : "text-black"
                    }`}
                  />
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            SẢN PHẨM NỔI BẬT
          </h2>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  className="bg-white border border-gray-200 p-4 rounded-lg transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <h3 className="text-lg font-bold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-500">{product.code}</p>
                  <p className="text-red-500 font-semibold">{product.price}</p>
                </Link>
              ))}
            </div>
            <div className="lg:w-48 flex-shrink-0">
              <img
                src="https://file.hstatic.net/1000381168/file/z5534076148156_f2cbfd8394021ce05ed5b345fee70777_b0ee26082bff414680f27699e8f6d6f6.jpg"
                alt="Ưu Đãi"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              TRANG SỨC KIM CƯƠNG
            </h2>
            <button
              onClick={handleNavigateToDiamond}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Xem tất cả &gt;
            </button>
          </div>
          <div className="mb-8">
            <img
              src="https://file.hstatic.net/1000381168/file/km-nam-nang_5dca301f73ff458a86a55206c31d6c79.png"
              alt="Ưu Đãi"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {diamondProducts
                .slice(
                  currentDiamondProducts,
                  currentDiamondProducts + itemsPerPageDiamondProducts
                )
                .map((product) => (
                  <Link
                    key={product.id}
                    className="bg-white border border-gray-200 p-4 rounded-lg transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover mb-4 rounded"
                    />
                    <h3 className="text-lg font-bold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-500">{product.code}</p>
                    <p className="text-red-500 font-semibold">
                      {product.price}
                    </p>
                  </Link>
                ))}
            </div>




            {currentProduct + itemsPerPageProduct < products.length && (
              <button
                onClick={nextPageProduct}
                className={`absolute top-1/2 transform -translate-y-1/2 right-0 rounded-full p-2 shadow-lg transition-colors duration-300 ${
                  isNextProductActive
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                <KeyboardArrowRightIcon />
              </button>
            )}

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
                className={`absolute top-1/2 transform -translate-y-1/2 right-0 rounded-full p-2 shadow-lg transition-colors duration-500 ease-in-out ${
                  isNextDiamondActive
                    ? "bg-black text-white scale-110"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                <KeyboardArrowRightIcon className="{`transition-colors duration-500 ${
                    isNextDiamondActive ? 'text-white; : 'text-black'
                }" />
              </button>
            )}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">BỘ SƯU TẬP</h2>
            <button
              onClick={handleNavigateToCollections}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Xem tất cả &gt;
            </button>
          </div>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collections
                .slice(
                  currentCollection,
                  currentCollection + itemsPerPageCollection
                )
                .map((collection) => (
                  <div
                    key={collection.id}
                    className="border border-gray-200 p-6 rounded-lg transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                  >
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-64 object-cover mb-4 rounded"
                    />
                    <h3 className="text-xl font-bold text-gray-800">
                      {collection.name}
                    </h3>
                    <p className="text-gray-600">{collection.description}</p>
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
                className={`absolute top-1/2 transform -translate-y-1/2 right-0 rounded-full p-2 shadow-lg transition-all duration-500 ease-in-out ${
                  isNextCollectionActive
                    ? "bg-black text-white scale-110"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                <KeyboardArrowRightIcon className="{`transition-colors duration-500 ${
                     isNextCollectionActive ? 'text-white' : 'text-black'}`}" />
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
