import React from "react";

const promotions = [
  {
    image:
      "https://file.hstatic.net/1000381168/file/z5534076148156_f2cbfd8394021ce05ed5b345fee70777_b0ee26082bff414680f27699e8f6d6f6.jpg",
  },
  {
    image:
      "https://file.hstatic.net/1000381168/file/z5534076148156_f2cbfd8394021ce05ed5b345fee70777_b0ee26082bff414680f27699e8f6d6f6.jpg",
  },
  {
    image:
      "https://file.hstatic.net/1000381168/file/z5534076148156_f2cbfd8394021ce05ed5b345fee70777_b0ee26082bff414680f27699e8f6d6f6.jpg",
  },
  {
    image:
      "https://file.hstatic.net/1000381168/file/z5534076148156_f2cbfd8394021ce05ed5b345fee70777_b0ee26082bff414680f27699e8f6d6f6.jpg",
  },
];

export default function Promotions() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-4">
        KHUYẾN MÃI TRONG THÁNG
      </h2>
      <div className="text-center mb-4">
        <button className="bg-black text-white px-4 py-2 rounded-full">
          TOÀN HỆ THỐNG CỬA HÀNG
        </button>
      </div>
      <div className="mb-8">
        <img
          src="https://file.hstatic.net/1000381168/file/km-nam-nang_5dca301f73ff458a86a55206c31d6c79.png"
          alt="Main Promotion"
          className="w-full mb-4"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {promotions.map((promotion, index) => (
          <div key={index} className="relative overflow-hidden group">
            <img
              src={promotion.image}
              alt={`Promotion ${index + 1}`}
              className="w-full mb-4 transition-transform duration-300 ease-in-out transform group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
