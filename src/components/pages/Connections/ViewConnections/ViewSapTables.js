import React, { useState, useEffect } from 'react';
import { Table, Button, message} from 'antd';
import Search from 'antd/es/input/Search';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSapTablesSlice, singleGetConnectionSlice } from '../../../features/Connections/connectionSlice'; 
const ViewSapTables = () => {
 
  const [loading, setLoading] = useState(false);
  const [loadCount , setLoadCount] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();
  const [partialSapTablesData,setPartialSapTablesData] = useState([]);
  const [sapTablesData,setSapTablesData] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const connection_name = location?.pathname?.split('/')[4];
  const project_id = location?.pathname?.split('/')[5];

  useEffect(()=>{
    setLoading(true);
    if(connection_name && project_id)
    {
      const data = {
        project_id,
        connection_name
      }
      dispatch(singleGetConnectionSlice(data))
      .then((response)=>{
        if(response?.payload?.status === 200 && response?.payload?.data?.status ==='Active'){
          dispatch(getSapTablesSlice(loadCount))
          .then((response)=>{
            if(response?.payload?.status === 200){
              setPartialSapTablesData(response?.payload?.data);
              setSapTablesData(response?.payload?.data);
            }
          })
        }
        else{
          message?.error('Error');
          setLoading(false);
          setPartialSapTablesData([])
          setSapTablesData([]);
          setTimeout(()=>{
            navigate('/pagenotfound');
          },1000)
        }
      })
    }
    setLoading(false);
  },[connection_name,project_id])
 
  const columns = [
    {
      title: 'Table Name',
      dataIndex: 'table',
      key: 'table',
    },
    {
      title: 'Table Description',
      dataIndex: 'description',
      key: 'description',
    },
   
  ];
 
  const sapTableSearch = (e)=>{
    
    const filteredData = partialSapTablesData.filter(item => {
      return (
        item?.table_name?.toLowerCase()?.includes(e?.toLowerCase()) ||
        item?.description?.toLowerCase()?.includes(e?.toLowerCase())
      )
    })
    setSapTablesData(filteredData);
  }
 
  const blankSearch = (e)=>{
    if(e?.target?.value.length <= 0){
      setSapTablesData(partialSapTablesData);
    }
  }
 
  const loadMore = ()=>{
    setLoadCount(loadCount=>loadCount+1)   
  }
 
  useEffect(()=>{
    setLoading(true);
    dispatch(getSapTablesSlice(loadCount))
      .then((response)=>{
        console.log(loading);
        if(response?.payload?.status === 200){
          setPartialSapTablesData(response?.payload?.data);
          setSapTablesData(response?.payload?.data);
        }
      })
      .finally(()=>{
        setLoading(false);
      })
    },[loadCount])
 
  return (
   
<div style={{padding:"20px"}}>
{contextHolder}
    <div className="d-flex justify-content-end mb-2">
                    <Search className='w-25' placeholder="Search by Table Name, Description" onChange={blankSearch} onSearch={sapTableSearch} enterButton />
                </div>
                <div className="sapTable">
          <Table dataSource={sapTablesData} columns={columns} loading={loading}
          pagination={{ pageSize: 10 }}
          />
          </div>
          <Button onClick={loadMore}>Load More</Button>  
</div>
  );
};
 
export default ViewSapTables
