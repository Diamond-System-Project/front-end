import { useEffect, useState } from "react";
import { Table, Button, Modal, Input, message, Switch } from "antd";
import VoucherTypeAPI from "../api/VoucherTypeAPI";

const ManagementVoucher = () => {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [voucherData, setVoucherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    const fetchVouchers = async () => {
      setLoading(true);
      try {
        const response = await VoucherTypeAPI.getAll();
        setVoucherData(response.data);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
        message.error("Failed to fetch vouchers");
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  const voucherColumns = [
    {
      title: "Voucher Type ID",
      dataIndex: "voucherTypeId",
      key: "voucherTypeId",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => `${discount * 100}%`,
    },
    {
      title: "Discount Length (days)",
      dataIndex: "discountLength",
      key: "discountLength",
    },
    {
      title: "Points Needed",
      dataIndex: "pointNeeded",
      key: "pointNeeded",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (active) => <Switch checked={active} disabled />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div>
          <Button type="link" onClick={() => showModal(record, false)}>
            Edit
          </Button>
          <Button
            type="danger"
            onClick={() => handleDelete(record.voucherTypeId)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const showModal = (voucher, isCreate) => {
    setSelectedVoucher(isCreate ? {} : { ...voucher });
    setIsCreate(isCreate);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    if (selectedVoucher) {
      if (isCreate) {
        try {
          const response = await VoucherTypeAPI.create(selectedVoucher);
          setVoucherData([...voucherData, response.data]);
          message.success("Voucher created successfully");
        } catch (error) {
          console.error("Error creating voucher:", error);
          message.error("Failed to create voucher");
        }
      } else {
        const updatedVoucherData = voucherData.map((voucher) =>
          voucher.voucherTypeId === selectedVoucher.voucherTypeId
            ? { ...voucher, ...selectedVoucher }
            : voucher
        );
        setVoucherData(updatedVoucherData);

        try {
          await VoucherTypeAPI.update(
            selectedVoucher.voucherTypeId,
            selectedVoucher
          );
          message.success("Voucher updated successfully");
        } catch (error) {
          console.error("Error updating voucher:", error);
          message.error("Failed to update voucher");
        }
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e, field) => {
    setSelectedVoucher({
      ...selectedVoucher,
      [field]: e.target.value,
    });
  };

  const handleSwitchChange = (checked) => {
    setSelectedVoucher((prevVoucher) => ({
      ...prevVoucher,
      active: checked,
    }));
  };

  const handleDelete = async (id) => {
    const updatedVoucherData = voucherData.filter(
      (voucher) => voucher.voucherTypeId !== id
    );
    setVoucherData(updatedVoucherData);

    try {
      await VoucherTypeAPI.delete(id);
      message.success("Voucher deleted successfully");
    } catch (error) {
      console.error("Error deleting voucher:", error);
      message.error("Failed to delete voucher");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">Voucher Types</h1>
        <button
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mr-2"
          onClick={() => showModal(null, true)}
        >
          + ADD VOUCHER TYPE
        </button>
      </div>
      <Table
        dataSource={voucherData}
        columns={voucherColumns}
        loading={loading}
        rowKey="voucherTypeId"
      />

      <Modal
        title={isCreate ? "Create Voucher" : "Edit Voucher"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedVoucher && (
          <div className="flex flex-col space-y-4">
            {!isCreate && (
              <p>
                Voucher Type ID:
                {selectedVoucher.voucherTypeId}
              </p>
            )}
            <p>
              Description:
              <Input
                value={selectedVoucher.description}
                onChange={(e) => handleInputChange(e, "description")}
              />
            </p>
            <p>
              Discount:
              <Input
                value={selectedVoucher.discount}
                type="number"
                step="0.01"
                onChange={(e) => handleInputChange(e, "discount")}
              />
            </p>
            <p>
              Discount Length (days):
              <Input
                value={selectedVoucher.discountLength}
                type="number"
                onChange={(e) => handleInputChange(e, "discountLength")}
              />
            </p>
            <p>
              Points Needed:
              <Input
                value={selectedVoucher.pointNeeded}
                type="number"
                onChange={(e) => handleInputChange(e, "pointNeeded")}
              />
            </p>
            <p>
              Active:
              <Switch
                checked={selectedVoucher.active}
                onChange={handleSwitchChange}
              />
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManagementVoucher;
