import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Popconfirm, Input, message } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { CodeSandboxCircleFilled, DeleteOutlined, EditOutlined, FaRegEdit } from '@ant-design/icons';
import axios from 'axios';
 
const ViewHanaTables = (field) => {
 
 
  console.log("hiiiii")
  console.log("ddd",field);
  const location = useLocation()
  const getProjectId = location.pathname.split('/')[3] || null;
  const getConnectionName = location.pathname.split('/')[4] || null;
  console.log(getProjectId,getConnectionName);
 
    const [searchText, setSearchText] = useState('');  
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
//   const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
//   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
 
 
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/hanatables/${getProjectId}/${getConnectionName}/`);
          setTables(response.data);
        } catch (error) {
          message.error('Failed to fetch tables');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);
 
  const filteredData = tables?.filter(item => {  
    return (    
        item.table?.toLowerCase().includes(searchText.toLowerCase()) ||  
        item.desc?.toLowerCase().includes(searchText.toLowerCase())
    );  
});
 
  // Handle delete confirmation
//   const handleDelete = async (table) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/saptables/${connection.connection_name}/${table.table_name}`);
//       setTables(tables.filter((t) => t.table_name !== table.table_name));
//       message.success('Table deleted successfully');
//     } catch (error) {
//       message.error('Failed to delete table');
//     } finally {
//       setIsDeleteModalVisible(false);
//     }
//   };
 
  // Handle edit confirmation (placeholder for future implementation)
//   const handleEdit = (table) => {
//     setSelectedTable(table);
//     setIsEditModalVisible(true);
//   };
 
  // Close modals
//   const handleDeleteModalCancel = () => setIsDeleteModalVisible(false);
//   const handleEditModalCancel = () => setIsEditModalVisible(false);
 
  const columns = [
    {
      title: 'Table Name',
      dataIndex: 'table',
      key: 'table',
    },
    // {
    //   title: 'Table Description',
    //   dataIndex: 'desc',
    //   key: 'desc',
    // },
   
  ];
 
  return (
   
<div>
    <div className="d-flex justify-content-end mb-2">
                    <Input  
                        placeholder="Search by Table Name, Description"  
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}  
                        style={{ maxWidth: 300 }} // Optional: Adjust the width as needed  
                    />  
                </div>
<Table dataSource={filteredData} columns={columns} loading={loading} rowKey="table"
pagination={{ pageSize: 10 }} />
   
</div>
  );
};
 
export default ViewHanaTables;