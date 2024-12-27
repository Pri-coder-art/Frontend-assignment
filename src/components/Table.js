import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Pagination } from "antd";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [sortedInfo, setSortedInfo] = useState({
    columnKey: null,
    order: null,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users",
          {
            params: {
              _page: currentPage,
              _limit: 10,
            },
          }
        );
        setUsers(response.data);
        setTotalUsers(100);
      } catch (error) {
        console.error("Error fetching users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    const { field, order } = sorter;

    if (field && order) {
      const sortedData = [...users].sort((a, b) => {
        if (order === "ascend") {
          return a[field] > b[field] ? 1 : -1;
        } else if (order === "descend") {
          return a[field] < b[field] ? 1 : -1;
        }
        return 0;
      });
      setUsers(sortedData);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      width: "30%",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
      sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order,
      width: "30%",
    },
    {
      title: "Username",
      dataIndex: "username",
      width: "20%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "20%",
    },
  ];

  return (
    <div>
      <h4 style={{ marginLeft: "33rem" }}>Responsive Table</h4>
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={false}
        onChange={handleTableChange}
        rowKey="id"
        scroll={{ x: "max-content" }}
      />
      <Pagination
        current={currentPage}
        total={totalUsers}
        pageSize={10}
        onChange={handlePageChange}
        showSizeChanger={false}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </div>
  );
};

export default UsersTable;
