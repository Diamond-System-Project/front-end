import { useEffect, useState } from "react";
import DiamondAPI from "../api/DiamondAPI";
import { Table } from "antd";

const Quotation = () => {
  const [diamondPrices, setDiamondPrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiamondPrices = async () => {
      try {
        const caratWeights = [3.6, 4.1, 4.5, 5, 5.4, 6, 6.8, 7.2, 8.1, 9];
        const allPrices = await Promise.all(
          caratWeights.map(async (weight) => {
            const response = await DiamondAPI.getPricesByCaratWeight(weight);
            return { weight, prices: response.data };
          })
        );
        const formattedPrices = allPrices.reduce((acc, { weight, prices }) => {
          acc[weight] = formatPrices(prices);
          return acc;
        }, {});
        setDiamondPrices(formattedPrices);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch diamond prices:", error);
        setLoading(false);
      }
    };

    fetchDiamondPrices();
  }, []);

  const formatPrices = (prices) => {
    return [
      {
        key: "1",
        grade: "D",
        if: prices[0],
        vvs1: prices[1],
        vvs2: prices[2],
        vs1: prices[3],
        vs2: prices[4],
      },
      {
        key: "2",
        grade: "E",
        if: prices[5],
        vvs1: prices[6],
        vvs2: prices[7],
        vs1: prices[8],
        vs2: prices[9],
      },
      {
        key: "3",
        grade: "F",
        if: prices[10],
        vvs1: prices[11],
        vvs2: prices[12],
        vs1: prices[13],
        vs2: prices[14],
      },
      {
        key: "4",
        grade: "J",
        if: prices[15],
        vvs1: prices[16],
        vvs2: prices[17],
        vs1: prices[18],
        vs2: prices[19],
      },
    ];
  };

  const columns = [
    {
      title: <strong>Grade</strong>,
      dataIndex: "grade",
      key: "grade",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "IF",
      dataIndex: "if",
      key: "if",
      className: "bg-gray-200",
      onHeaderCell: () => ({
        className: "bg-gray-200",
      }),
      onCell: () => ({
        className: "bg-gray-200",
      }),
    },
    {
      title: "VVS1",
      dataIndex: "vvs1",
      key: "vvs1",
      className: "bg-gray-200",
      onHeaderCell: () => ({
        className: "bg-gray-200",
      }),
      onCell: () => ({
        className: "bg-gray-200",
      }),
    },
    {
      title: "VVS2",
      dataIndex: "vvs2",
      key: "vvs2",
      className: "bg-gray-200",
      onHeaderCell: () => ({
        className: "bg-gray-200",
      }),
      onCell: () => ({
        className: "bg-gray-200",
      }),
    },
    {
      title: "VS1",
      dataIndex: "vs1",
      key: "vs1",
      className: "bg-gray-200",
      onHeaderCell: () => ({
        className: "bg-gray-200",
      }),
      onCell: () => ({
        className: "bg-gray-200",
      }),
    },
    {
      title: "VS2",
      dataIndex: "vs2",
      key: "vs2",
      className: "bg-gray-200",
      onHeaderCell: () => ({
        className: "bg-gray-200",
      }),
      onCell: () => ({
        className: "bg-gray-200",
      }),
    },
  ];

  const sortedWeights = Object.keys(diamondPrices).sort((a, b) => parseFloat(a) - parseFloat(b));

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
      <div className="text-white p-8">
        {sortedWeights.map((weight) => (
          <div className="mb-8" key={weight}>
            <h2 className="text-center text-lg font-bold mb-4 text-black">
              Giá Kim Cương {weight}ly
            </h2>
            <Table dataSource={diamondPrices[weight]} columns={columns} pagination={false} />
          </div>
        ))}
      </div>
  );
};

export default Quotation;