import { Button, Input, message, Radio, Table } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup'
import CustomModel from '../Connections/ViewConnections/CustomModel';
import { deleteBussinessRulesSlice, getBussinessRulesSlice } from '../../features/BussinessRules/BussinessRulesSlice';

const ManageSuccessFactors = () => {
    const {Search} = Input;

     const [selectOption,setSelectOption] = useState([]);
     const [openDeleteModal, setOpenDeleteModal] = useState(false);  
     const [alertActive,setAlertActive] = useState(true);
     const [selectedKey, setSelectedKey] = useState(null); 
     const [messageApi, contextHolder] = message.useMessage();
     const [selectedRecord,setSelectedRecord] = useState(null); 
     const [allProjects, setAllProjects] = useState([]);
     const [partialSuccessFactors,setPartialSuccessFactor] = useState([]);
     const [successFactors,setSuccessFactors] = useState([]);

     const navigate = useNavigate();
     const dispatch = useDispatch();

     const projects = useSelector(state => state?.project?.projects);

     useEffect(()=>{
        const filterProjects = projects?.filter(item => item?.project_type === 'sf');
        setAllProjects(filterProjects);
    },[projects])

     useEffect(()=>{
        loadSuccessFactors();
    },[])

   const loadSuccessFactors = ()=>{
        const data = {obj_id : 0,project_type : 'sf'};
        dispatch(getBussinessRulesSlice(data))
        .then((response)=>{
            if(response?.payload?.status === 200)
            {
                const success_factors = response?.payload?.data;
                let filteredData = []
                if(selectOption?.length !== 0){
                    const project_id = Number(selectOption?.project_id);
                    filteredData = success_factors?.filter(item => item?.project_id === project_id);
                }
                else filteredData = success_factors;
                setPartialSuccessFactor(success_factors);
                setSuccessFactors(filteredData)
            }
            else if(response?.payload?.status === 500){
                if(alertActive){
                    messageApi?.error('Internal Server Error')
                    setAlertActive(false);
                    setTimeout(()=>setAlertActive(true),3000);
                }
            }
        })
    }

      const schema = yup.object({
             connection_name : yup.string().required("Connection Name Required")
      })

      const handleBussinessRule = (record)=>{
        if(selectOption.length === 0)
            {
                if(alertActive){
                messageApi.info('Please Select a Project')
                setAlertActive(false);
                setTimeout(()=>setAlertActive(true),3000);
                }
            }
            else{
                navigate(`/bussinessrules/views/${record?.project_id}&&${selectOption?.project_name}/${record?.obj_id}&&${record?.obj_name}`)
            }        
      }

     const formik = useFormik({
             initialValues:{
                 connection_name:"",
                 project_id_select:""
             },
             validationSchema:schema,
             onSubmit:(values)=>{
             }
     })

     const handleRadioChange = (record) => {  
            setSelectedKey(record?.obj_id); 
            setSelectedRecord(record);
        };  

    const columns = [   
        {  
            title: 'Select',  
            dataIndex: 'selecteditem',  
            render: (text, record) => (  
                <div style={{display:'flex',justifyContent:'center'}}>
                <Radio  
                    checked={selectedKey === record.obj_id}  
                    onChange={() => handleRadioChange(record)}   
                />  
                </div>
            )  
        },  
        {  
            title: 'Data Object',  
            dataIndex: 'obj_name',  
            key: 'obj_name',  
            render: (text, record) => 
                (
                <>
                <button className="link-button" onClick={()=>handleBussinessRule(record)}  style={{width:"100%",background:'none',border:"none",padding:"0",textDecoration:"underline"}}>{record.obj_name}</button>
                </>               
            )
            // <Link to={'/bussinessrules/view'} className='text-center'>{record.obj_name}</Link>   
        },  
        {  
            title: 'Data Object Id',  
            dataIndex: 'obj_id',  
            key: 'obj_id',  
        },  
        {  
            title: 'Data Mapping Sheet',  
            dataIndex: 'template_name',  
            key: 'template_name',  
        }
    ];      

    const handleFileSelect = (e)=>{
        const parsedFileData = JSON?.parse(e?.target?.value)
        setSelectOption(parsedFileData);
        let filteredData = []
        if(parsedFileData?.length === 0)
        {
            filteredData = partialSuccessFactors;
        }
        else
        filteredData = partialSuccessFactors?.filter(item => item?.project_id === parsedFileData?.project_id)
        setSuccessFactors(filteredData);
    }

    const showDeleteModal = ()=>{
        if(selectedRecord === null){
            if(alertActive){
                messageApi.info('Please Select a File')
                setAlertActive(false);
                setTimeout(()=>setAlertActive(true),3000);
                }
        }
       else{
           setOpenDeleteModal(true);
       }
    }

    const handleCreateNavigation = ()=>{
        if(selectOption.length !== 0){
            const project_id = selectOption?.project_id
            navigate(`/connections/success-factor/upload/${project_id}`);
        }
        else{
            if(alertActive){
                messageApi.info('Please Select a Project')
                setAlertActive(false);
                setTimeout(()=>setAlertActive(true),3000);
            }
        }
    }

    const handleEditNavigation = ()=>{
        if(selectedRecord === null)
        {
            if(alertActive){
            messageApi?.info('Please Select a File')
            setAlertActive(false);
            setTimeout(()=>setAlertActive(true),3000);
            }
        }
        else{
            navigate(`/connections/success-factor/reupload/${selectedRecord?.obj_id}`);
        }
    }   

    const hideDeleteModal = () => {  
        setOpenDeleteModal(false);  
    }; 

    const handleDelete = ()=>{
            dispatch(deleteBussinessRulesSlice({obj_id : selectedRecord?.obj_id}))
            .then((response)=>{
                if(response?.payload?.status === 202){
                    toast?.success(`${selectedRecord?.obj_name} Deletion Successfull`)
                    loadSuccessFactors();
                    hideDeleteModal(false);
                }
                else{
                    toast?.error(`${selectedRecord?.obj_id} Deletion Failed`)
                }
            })
            setOpenDeleteModal(false);
    }

    const handleSearch = (e)=>{
        let filteredData = []
        if(selectOption?.length !== 0){
            filteredData = partialSuccessFactors?.filter((item =>(
                item?.project_id === selectOption?.project_id && (
                    item?.obj_name?.toLowerCase()?.includes(e?.toLowerCase()) || item?.obj_id?.toString()?.includes(e?.toLowerCase())
                )
            )))
        }
        else{
            filteredData = partialSuccessFactors?.filter(item => (
               item?.obj_name?.toLowerCase()?.includes(e?.toLowerCase()) || item?.obj_id?.toString()?.includes(e?.toLowerCase())
            ))
        }
        setSuccessFactors(filteredData);
    }

    const handleSearchChange = (e)=>{
        if(!e?.target?.value)
        {
            let filteredData = []
            if(selectOption?.length !== 0)
            {   
                filteredData = partialSuccessFactors?.filter(item =>(
                    item?.project_id === selectOption?.project_id
                ))
            }
            else filteredData = partialSuccessFactors;
            setSuccessFactors(filteredData);
        }
    }

  return (
    <div className='p-2 m-2'>
         <ToastContainer
            position='top-center'
            autoClose={1000}
            hideProgressBar={true}
            closeOnClick
            newestOnTop={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
            />
                {contextHolder}
                <div className="container-fluid ">  
                <div className="options_header" style={{ overflowX: "auto"}}>  
            <label style={{ color: "skyblue", fontSize: "20px",marginRight:"10px" }}>Success Factor</label>  
            <select  
                name="project_id"   
                className='form-select'
                style={{minWidth:"200px", maxWidth: "200px", padding: "3px", marginRight:"10px",maxHeight: "32px" }}   
                onChange={handleFileSelect}   
            >  
                <option key={0} value={JSON.stringify([])} style={{ textAlign: "center" }}>Select Project</option>   
                {allProjects && allProjects?.map((option) => (  
                    <option key={option?.project_id} value={JSON.stringify(option)} style={{ textAlign: "center" }}>{option?.project_name}</option>  
                ))}  
            </select>  
            <Button onClick={handleCreateNavigation} style={{ fontSize: '14px', marginRight:"10px" }}>  
                Import  
            </Button>  
            <Button  onClick={handleEditNavigation} style={{ fontSize: '14px', marginRight:"10px" }}>  
                Re Import  
            </Button>
            <Button  onClick={showDeleteModal} style={{ fontSize: '14px', marginRight:"10px" }}>  
                Delete  
            </Button>   

            <Search  
            placeholder="Search by Data Object, or Id"  
            onSearch={(e) => handleSearch(e)}  
            enterButton  
            onChange={(e) => handleSearchChange(e)}  
            style={{ minWidth: "300px", maxWidth: "300px", marginRight: "10px", marginBottom: "1px", maxHeight: "32px" }} />
                </div>  
            </div>

         <div className='managebussinessrules'style={{marginTop:"10px"}}>
           <Table  
                columns={columns} 
                dataSource={successFactors} // Use the filtered data  
                pagination={{  
                    pageSize: 10,  
                }}  
                style={{overflowX:"auto"}}
            />  
            </div>


        <CustomModel
              title={<>Delete { selectedRecord?.obj_name !== undefined ?  <span style={{ color: "red",display:"inline" }}>"{` `} {selectedRecord?.obj_name}{` `} "</span>:''} {` `}Object</>}
              hideModal={hideDeleteModal}
              open={openDeleteModal}
              performAction = {handleDelete}
              onCancel={hideDeleteModal}
              okText="Yes"
              cancelText="No"
            />

    </div>
  )
}

export default ManageSuccessFactors