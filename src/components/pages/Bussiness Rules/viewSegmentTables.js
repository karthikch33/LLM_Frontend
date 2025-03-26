import React, { useEffect, useState } from 'react'
import { Button, Table } from 'antd'
import { Input, Space } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDataSegmentsSlice } from '../../features/BussinessRules/BussinessRulesSlice';
import { IoArrowBackCircleSharp } from 'react-icons/io5';

const ViewSegmentTables = () => {
    const { Search } = Input;

    const location = useLocation();
    const details = location.pathname.split('/')[3];
    const project_id = details.split('&&')[0];
    const object_id = details.split('&&')[1];
    const [staticTableData,setStaticTableData] = useState([])
    const [tableData,setTableData] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getDataSegmentsSlice({project_id,object_id}))
        .then((response)=>{
            setStaticTableData(response?.payload?.data);
            setTableData(response?.payload?.data);
        })
    },[project_id,object_id])

    

    const columns =[
        {
            key : '1',
            title : 'Segment Name',
            dataIndex : 'segement_name'
        },
        {
            key : '2',
            title : 'Table Name',
            dataIndex : 'table_name'
        }
    ]


    const handleSearch = (e)=>{
        console.log(e)
        const updatedValues = staticTableData.filter((item) => {  
            const searchTerm = e.toLowerCase();  
            return (  
                item?.table_name?.toLowerCase().includes(searchTerm) ||  
                item?.segment_name?.toLowerCase().includes(searchTerm)  
            );  
        });  
        setTableData(updatedValues)
    }

    // const 

    const handleSearchChange = (e)=>{
        if(!e.target.value){
            setTableData(staticTableData)
        }
    }

  return (
    <div className='container' style={{marginTop:"20px"}}>
        <div className='row'>
            <div className="d-flex flex-row justify-content-between" style={{ overflowX: "auto"}}>
                <IoArrowBackCircleSharp style={{fontSize:"25px",cursor:"pointer"}} onClick={()=>navigate('/bussinessrules/manage')}/>
            <div className='d-inline'>
            <Search placeholder="input search text"
            onSearch={handleSearch} 
            onChange={(e)=>handleSearchChange(e)}
            enterButton
            style={{width:"300px"}} />
          </div>
            </div>

        </div>
        <div className='row mt-4'>
            <Table columns={columns} 
            dataSource={tableData}
            className='SegmentTables'
            />
        </div>
    </div>
  )
}

export default ViewSegmentTables