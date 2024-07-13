import { useEffect, useState } from "react";
import { Card } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { CardBody, CardHeader, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import DashboardAPI from "../api/DashboardAPI";

const Dashboard = () => {
  const [cardData, setCardData] = useState({
    totalMembers: 0,
    activeOrders: 0,
    completedOrders: 0,
    returnOrders: 0,
    totalRevenue: 0,
  });

  const [pieChartData, setPieChartData] = useState({
    series: [0, 0, 0],
    labels: ["Active Orders", "Completed Orders", "Return Orders"],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          DashboardAPI.countMember(),
          DashboardAPI.countProcessingOrder(),
          DashboardAPI.totalRevenue(),
          DashboardAPI.countCompleteOrder(),
          DashboardAPI.countCancelOrder(),
        ]);

        setCardData({
          totalMembers: responses[0].data.data,
          activeOrders: responses[1].data.data,
          totalRevenue: responses[2].data.data,
          completedOrders: responses[3].data.data,
          returnOrders: responses[4].data.data,
        });

        setPieChartData({
          series: [
            responses[1].data.data,
            responses[3].data.data,
            responses[4].data.data,
          ],
          labels: ["Active Orders", "Completed Orders", "Return Orders"],
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const cardDetails = [
    {
      title: "Total Members",
      amount: cardData.totalMembers,
      icon: <CalendarOutlined className="text-xl text-white" />,
      bgColor: "bg-blue-500",
    },
    {
      title: "Active Orders",
      amount: cardData.activeOrders,
      icon: <CalendarOutlined className="text-xl text-white" />,
      bgColor: "bg-green-500",
    },
    {
      title: "Completed Orders",
      amount: cardData.completedOrders,
      icon: <CalendarOutlined className="text-xl text-white" />,
      bgColor: "bg-teal-500",
    },
    {
      title: "Return Orders",
      amount: cardData.returnOrders,
      icon: <CalendarOutlined className="text-xl text-white" />,
      bgColor: "bg-red-500",
    },
    {
      title: "Total Revenue",
      amount: `${cardData.totalRevenue.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })}`,
      icon: <CalendarOutlined className="text-xl text-white" />,
      bgColor: "bg-yellow-500",
    },
  ];

  const pieChartConfig = {
    type: "pie",
    width: 400,
    height: 400,
    series: pieChartData.series,
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      labels: pieChartData.labels,
      title: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#1E3A8A", "#FF8F00", "#00897B"],
      tooltip: {
        enabled: true,
        style: {
          fontSize: "14px",
        },
        y: {
          formatter: (val) => `${val}`,
        },
      },
      legend: {
        position: "bottom",
        labels: {
          colors: "#000",
        },
      },
    },
  };

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <h2 className="text-3xl font-bold ">Dashboard</h2>
      </div>
      <div className="flex justify-between mx-4 my-6">
        {cardDetails.map((card, index) => (
          <div key={index} className="w-full max-w-xs mx-2">
            <Card className="shadow-lg rounded-lg overflow-hidden w-full">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {card.title}
                  </h3>
                </div>
                <div className="flex items-center">
                  <div
                    className={`${card.bgColor} text-white p-4 rounded-lg mr-4`}
                  >
                    {card.icon}
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {card.amount}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div className="my-4 mx-6">
        <Card className="w-full shadow-lg rounded-lg overflow-hidden">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center p-4"
          >
            <Typography variant="h6" color="blue-gray">
              Orders Overview
            </Typography>
          </CardHeader>
          <CardBody className="px-4 pb-4 grid place-items-center">
            <Chart {...pieChartConfig} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
